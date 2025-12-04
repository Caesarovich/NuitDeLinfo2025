import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";

type VillagePages = "home" | "snake";

export type VillageState = {
	page: VillagePages;
};

export type VillageActions = {
	setPage: (p: VillagePages) => void;
};

export type VillageContextType = VillageState & VillageActions;

export const villageDefaultContext: VillageContextType = {
	page: "home",
	setPage: () => {},
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

	const value = useMemo(() => ({ page, setPage }), [page]);

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
