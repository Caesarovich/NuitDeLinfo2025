import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import { Armory } from "./Armory";
import { Chatbot } from "./Chatbot";
import CardGame from "./card-game/card_game";
import { Home } from "./Home";
import trolley from "@/assets/trolley.png";

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
			<button
				type="button"
				onClick={() => setPage("chatbot")}
				className="fixed bottom-0 p-0 m-0 border-none bg-transparent"
			>
				<img src={trolley} alt="Retourner au bourg du village" />
			</button>
			<div className="app-chabot-background"></div>
		</>
	);
}

export default Index;
