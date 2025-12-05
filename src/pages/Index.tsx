import { Activity } from "react";
import { useVillage } from "@/contexts/village-context";
import trolley from "../assets/trolley.png";
import { Chatbot } from "./Chatbot";
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

			<Activity mode={page === "chatbot" ? "visible" : "hidden"}>
				<Chatbot />
			</Activity>

			<button
				type="button"
				className="btn btn-link"
				onClick={() => setPage("home")}
			>
				Retourner au bourg du vilage
			</button>
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
