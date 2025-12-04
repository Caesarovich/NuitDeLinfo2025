import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import { Home } from "./Home";

export function Index() {
	const { page, setPage } = useVillage();

	return (
		<>
			<Activity mode={page === "home" ? "visible" : "hidden"}>
				<Home />
			</Activity>

			<Activity mode={page === "snake" ? "visible" : "hidden"}>
				<h1>Bienvenue au SNAKE</h1>
			</Activity>

			<button
				type="button"
				className="btn btn-link"
				onClick={() => setPage("home")}
			>
				Retourner au bourg du vilage
			</button>
		</>
	);
}

export default Index;
