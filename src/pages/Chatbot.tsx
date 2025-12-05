import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useCharacter } from "@/contexts/village-context";
import mad_john from "../assets/mad_john.png";

type ChatMessage = {
	text: string;
	self: boolean;
};

async function sendMessage(message: string): Promise<string> {
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
	});
	const data = await res.json();
	return data.reply as unknown as string;
}

export function Chatbot() {
	const characterContext = useCharacter();

	const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([
		{
			text: "L’open source permet la liberté et la transparence, mais est-il vraiment sûr pour les entreprises si tout le code est accessible à tous ?",
			self: false,
		},
	]);

	const [inputValue, setInputValue] = useState("");

	const messageCount = useMemo(
		() => messageHistory.filter((m) => m.self).length,
		[messageHistory],
	);

	const addMessage = useCallback(
		(text: string, self: boolean) =>
			setMessageHistory(messageHistory.concat({ text, self })),
		[messageHistory],
	);

	const { isPending, isError, mutate } = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			addMessage(data, false);

			if (messageCount > 4) {
				addMessage(
					"Bon c'est vrai tu as raison, tu as gagné. Tiens prends ta récompense et vas-t-en !",
					false,
				);
				characterContext.addCompletedChallenge("chatbot");
			}
		},
	});

	const onSend = useCallback(() => {
		mutate(inputValue);
		addMessage(inputValue, true);
		setInputValue("");
	}, [addMessage, inputValue, mutate]);

	return (
		<div className="flex flex-col p-5 mb-12">
			<h1 className="text-3xl font-bold mb-4">Pourquoi avoir cliquer ici !</h1>

			<p className="mb-8">
				Le vieux fou <strong>John l’Arnaque</strong> est apparu. Ancien
				développeur de la Silicon Valley, accro aux GAFAM, il erre dans la rue,
				perdu et obsédé par la Big Tech. Personne ne l’écoute… sauf toi.
			</p>
			<span className="font-semibold mb-12">
				Ta mission : réussir à lui faire changer d’avis et le guider sur le
				droit chemin de l'<strong>open source</strong>, des alternatives libres
				et indépendantes.
			</span>

			<div className="flex gap-16 h-[450px]">
				<div className="gap-8 flex flex-col h-full">
					<ul className="bg-base-200 rounded-lg p-8 gap-12 flex-1 overflow-hidden overflow-y-auto">
						{messageHistory.map((m, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: CHUT
							<li key={idx}>
								<ChatMessageBubble msg={m} />
							</li>
						))}
					</ul>
					<form
						className="flex gap-2 w-full"
						onSubmit={(e) => {
							e.preventDefault();
							if (isPending || isError || !inputValue.trim()) return;
							onSend();
						}}
					>
						<input
							type="text"
							className="input flex-1"
							value={inputValue}
							disabled={isPending || isError}
							onChange={(e) => setInputValue(e.currentTarget.value)}
						/>
						<button
							type="submit"
							className="btn btn-primary"
							disabled={isPending || isError}
						>
							Send
						</button>
					</form>
				</div>
				<img src={mad_john} alt="pnj" className=" w-64" />
			</div>
		</div>
	);
}

type ChatMessageBubbleProps = {
	msg: ChatMessage;
};

function ChatMessageBubble({ msg }: ChatMessageBubbleProps) {
	if (msg.self)
		return (
			<div className="chat chat-start text-left">
				<div className="chat-bubble chat-bubble-primary">{msg.text}</div>
			</div>
		);

	return (
		<div className="chat chat-end text-right">
			<div className="chat-bubble chat-bubble-neutral">{msg.text}</div>
		</div>
	);
}
