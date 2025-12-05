import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { useCharacter } from "@/contexts/character-context";
import { useVillage } from "@/contexts/village-context";
import type { DialogNode, DialogOption } from "@/lib/dialog";

export type DialogPlayerProps = {
	dialog: DialogNode;
};

export function DialogPlayer({ dialog }: DialogPlayerProps) {
	const villageContext = useVillage();
	const characterContext = useCharacter();

	const [playedDialogs, setPlayedDialogs] = useState<DialogNode[]>([dialog]);

	const currentDialog = useMemo<DialogNode | undefined>(
		() => playedDialogs.at(-1),
		[playedDialogs],
	);

	const messageListRef = createRef<HTMLUListElement>();

	const playNextDialog = useCallback(() => {
		const current = playedDialogs.at(-1);
		if (current?.nextNode)
			setPlayedDialogs(playedDialogs.concat(current.nextNode));
		setTimeout(() => {
			messageListRef.current?.scrollTo({
				top: messageListRef.current?.scrollHeight ?? 0,
				behavior: "smooth",
			});
		}, 0);
	}, [playedDialogs, messageListRef.current]);

	const chooseDialogOption = (option: DialogOption) => {
		if (option.action) option.action(villageContext, characterContext);
		if (option.nextNode) {
			setPlayedDialogs((prev) =>
				prev.concat({
					text: option.label,
					self: true,
					nextNode: option.nextNode,
				}),
			);
			setTimeout(() => {
				messageListRef.current?.scrollTo({
					top: messageListRef.current?.scrollHeight ?? 0,
					behavior: "smooth",
				});
			}, 0);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			playNextDialog();
		}, 1000);

		return () => clearInterval(interval);
	}, [playNextDialog]);

	return (
		<div className="flex flex-col bg-base-200 p-6 rounded-lg gap-16 max-h-[800px]">
			<ul
				ref={messageListRef}
				className="flex flex-col flex-1  overflow-clip overflow-y-auto"
			>
				{playedDialogs.map((dialog, idx) => (
					// biome-ignore lint/suspicious/noArrayIndexKey:OK BRO
					<li key={idx}>
						<DialogMessage dialog={dialog} />
					</li>
				))}
			</ul>
			<div className="flex gap-4 flex-wrap">
				{currentDialog?.options?.map((op, idx) => (
					<button
						// biome-ignore lint/suspicious/noArrayIndexKey:OK BRO
						key={idx}
						type="button"
						className="btn btn-primary"
						onClick={() => chooseDialogOption(op)}
					>
						{op.label}
					</button>
				))}
			</div>
		</div>
	);
}

function DialogMessage({ dialog }: DialogPlayerProps) {
	if (dialog.self)
		return (
			<div className="chat chat-start text-left">
				<div className="chat-bubble chat-bubble-primary">{dialog.text}</div>
			</div>
		);

	return (
		<div className="chat chat-end text-right">
			<div className="chat-bubble chat-bubble-neutral">{dialog.text}</div>
		</div>
	);
}
