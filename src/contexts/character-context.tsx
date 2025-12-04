import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";

export type Challenges = "card" | "repair";

export type CharacterState = {
	name: string;
	setName: (newName: string) => void;
	completedChallenges: Set<Challenges>;
	setCompletedChallenges: (newSet: Set<Challenges>) => void;
	challengeCount: number;
};

export const characterDefaultContext: CharacterState = {
	name: "Dave",
	setName: () => {},
	completedChallenges: new Set(),
	setCompletedChallenges: () => {},
	challengeCount: 2,
};

export const CharacterContext = createContext<CharacterState>(
	characterDefaultContext,
);

export function CharacterProvider({ children }: { children: ReactNode }) {
	const [name, setName] = useState<string>(characterDefaultContext.name);
	const [completedChallenges, setCompletedChallenges] = useState<
		Set<Challenges>
	>(characterDefaultContext.completedChallenges);

	const value = useMemo(
		() => ({
			name,
			completedChallenges,
			setName,
			setCompletedChallenges,
			challengeCount: characterDefaultContext.challengeCount,
		}),
		[name, completedChallenges],
	);

	return (
		<CharacterContext.Provider value={value}>
			{children}
		</CharacterContext.Provider>
	);
}

export function useCharacter() {
	const ctx = useContext(CharacterContext);
	if (!ctx) {
		throw new Error("useCharacter must be used within a CharacterProvider");
	}
	return ctx;
}

export default CharacterContext;
