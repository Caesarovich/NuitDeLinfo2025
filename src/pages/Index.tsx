import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import { Armory } from "./Armory";
import { Home } from "./Home";

export function Index() {
	const { page, setPage } = useVillage();

	return (
		<>
			{page === "home" && <Home />}
			{page === "armory" && <Armory />}

			<Activity mode={page === "home" ? "hidden" : "visible"}>
				<button
					type="button"
					className="btn btn-link"
					onClick={() => setPage("home")}
				>
					Retourner au bourg du vilage
				</button>
			</Activity>
		</>
	);
}

export default Index;
