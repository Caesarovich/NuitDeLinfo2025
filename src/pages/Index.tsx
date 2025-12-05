import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import { Armory } from "./Armory";
import trolley from "../assets/trolley.png";
import { Chatbot } from "./Chatbot";
import { Home } from "./Home";

export function Index() {
	const { page, setPage } = useVillage();
	return (
		<>
			{page === "home" && <Home />}
			{page === "armory" && <Armory />}
			{page === "chatbot" && <Chatbot />}

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
