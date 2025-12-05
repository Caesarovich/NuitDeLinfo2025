import { useState } from "react";
import mad_john from "../assets/mad_john.png";

export function Chatbot() {
	//const { setPage } = useVillage();

	async function sendMessage(message: string) {
		const res = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message }),
		});
		const data = await res.json();
		return data.reply;
	}
	const [count, setCount] = useState<number>(0);
	const [john_answer, setJohnAnswer] = useState<string>(
		"L’open source permet la liberté et la transparence, mais est-il vraiment sûr pour les entreprises si tout le code est accessible à tous ?",
	);

	function handlesubmit(e: SubmitEvent) {
		e.preventDefault();
		const userText = e.target[0].value;
		const message = userText + count.toString();
		console.log(message);
		const tmp = count + 1;
		setCount(tmp);
		sendMessage(message).then((reply) => {
			setJohnAnswer(reply);
		});
	}
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-3xl font-bold mb-4">Pourquoi avoir cliquer ici !</h1>

			<p className="mb-8">
				Le vieux fou <strong>John l’Arnaque</strong> est apparu. Ancien
				développeur de la Silicon Valley, accro aux GAFAM, il erre dans la rue,
				perdu et obsédé par la Big Tech. Personne ne l’écoute… sauf toi.
			</p>
			<span className="font-semibold">
				Ta mission : réussir à lui faire changer d’avis et le guider sur le
				droit chemin de l'<strong>open source</strong>, des alternatives libres
				et indépendantes.
			</span>
			<img src={mad_john} alt="pnj" className="fixed left-0 w-150 " />

			<div className="flex flex-col space-y-4 bg-red-50 rounded-xl p-4">
				<div className="flex bg-sky-500/50 p-3 rounded-xl items-start space-x-2">
					<span className="text-orange-600 font-semibold whitespace-nowrap">
						John l’Arnaque :
					</span>
					<p className="text-blue-600 leading-relaxed">{john_answer}</p>
				</div>

				<form onSubmit={handlesubmit}>
					<label className="flex flex-col bg-red-50 p-2 rounded-md">
						<span className="font-semibold mb-1 text-gray-700">
							Qu'allez-vous répondre pour le faire changer d'avis ? :
						</span>
						<textarea
							name="myInput"
							className="border border-gray-300 text-gray-700 rounded-md p-2 h-40 w-full resize-none"
							placeholder="Tapez votre réponse ici..."
						/>

						<button
							type="submit"
							className="text-white bg-green-500 hover:bg-green-600  px-4 py-2.5 mt-2"
						>
							Envoyez votre réponse
						</button>
					</label>
				</form>
			</div>

			{/* <div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => setPage("snake")}
				>
					Aller à la forge
				</button>
			</div> */}
		</div>
	);
}
