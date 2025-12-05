import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type VillagePages = "home" | "snake" | "armory";

export type VillageState = {
	page: VillagePages;
	dialogsRead: Set<string>;
};

export type VillageActions = {
	setPage: (p: VillagePages) => void;
	addReadDialog: (d: string) => void;
};

export type VillageContextType = VillageState & VillageActions;

export type Challenges = "card" | "repair";

export type CharacterState = {
	name: string;
	setName: (newName: string) => void;
	completedChallenges: Set<Challenges>;
	addCompletedChallenge: (chal: Challenges) => void;
	challengeCount: number;
};

export type GameContextType = VillageState & VillageActions & CharacterState;

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

export function GameProvider({
	children,
	initialPage,
}: {
	children: ReactNode;
	initialPage?: VillagePages;
}) {
	const [page, setPage] = useState<VillagePages>(initialPage ?? "home");
	const [dialogsRead, setDialogsRead] = useState<Set<string>>(new Set());

	const [name, setName] = useState<string>("Dave");
	const [completedChallenges, setCompletedChallenges] = useState<
		Set<Challenges>
	>(new Set());

	const addReadDialog = useCallback((d: string) => {
		setDialogsRead((old) => {
			const next = new Set(old);
			next.add(d);
			return next;
		});
	}, []);

	const addCompletedChallenge = useCallback((d: Challenges) => {
		setCompletedChallenges((old) => {
			const next = new Set(old);
			next.add(d);
			return next;
		});
	}, []);

	const value = useMemo(
		() => ({
			page,
			dialogsRead,
			setPage,
			addReadDialog,
			name,
			setName,
			completedChallenges,
			addCompletedChallenge,
			challengeCount: completedChallenges.size,
		}),
		[
			page,
			dialogsRead,
			name,
			completedChallenges,
			addReadDialog,
			addCompletedChallenge,
		],
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useVillage() {
	const ctx = useContext(GameContext);
	if (!ctx) throw new Error("useVillage must be used within a GameProvider");
	const { page, dialogsRead, setPage, addReadDialog } = ctx;
	return { page, dialogsRead, setPage, addReadDialog };
}

export function useCharacter() {
	const ctx = useContext(GameContext);
	if (!ctx) throw new Error("useCharacter must be used within a GameProvider");
	const {
		name,
		setName,
		completedChallenges,
		addCompletedChallenge,
		challengeCount,
	} = ctx;
	return {
		name,
		setName,
		completedChallenges,
		addCompletedChallenge,
		challengeCount,
	};
}

export const VillageProvider = GameProvider;
export const CharacterProvider = GameProvider;

export default GameContext;
