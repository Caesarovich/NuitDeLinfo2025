import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import { Armory } from "./Armory";
import { Chatbot } from "./Chatbot";
import { Home } from "./Home";
import CardGame from "./card-game/card_game";

export function Index() {
	const { page, setPage } = useVillage();
	return (
		<>
			{page === "home" && <Home />}
			{page === "armory" && <Armory />}
			{page === "chatbot" && <Chatbot />}
			{page === "card" && <CardGame />}

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
