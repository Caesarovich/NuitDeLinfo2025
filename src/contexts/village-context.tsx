import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type VillagePages = "home" | "snake";

export type VillageState = {
	page: VillagePages;
	dialogsRead: Set<string>;
};

export type VillageActions = {
	setPage: (p: VillagePages) => void;
	addReadDialog: (d: string) => void;
};

export type VillageContextType = VillageState & VillageActions;

export const villageDefaultContext: VillageContextType = {
	page: "home",
	setPage: () => {},
	dialogsRead: new Set(),
	addReadDialog: () => {},
};

export const VillageContext = createContext<VillageContextType>(
	villageDefaultContext,
);

export function VillageProvider({
	children,
	initialPage,
}: {
	children: ReactNode;
	initialPage?: VillagePages;
}) {
	const [page, setPage] = useState<VillagePages>(initialPage ?? "home");
	const [dialogsRead, setDialogsRead] = useState<Set<string>>(new Set());

	const addReadDialog = useCallback(
		(d: string) => setDialogsRead(new Set([...dialogsRead.values(), d])),
		[dialogsRead],
	);

	const value = useMemo(
		() => ({ page, setPage, dialogsRead, addReadDialog }),
		[page, dialogsRead, addReadDialog],
	);

	return (
		<VillageContext.Provider value={value}>{children}</VillageContext.Provider>
	);
}

export function useVillage() {
	const ctx = useContext(VillageContext);
	if (!ctx) {
		throw new Error("useVillage must be used within a VillageProvider");
	}
	return ctx;
}

export default VillageContext;
