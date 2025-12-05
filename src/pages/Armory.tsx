import { Activity } from "react";
import armoristImg from "@/assets/character-armorist.png";
import { DialogPlayer } from "@/components/dialog-player";
import { useVillage } from "@/contexts/village-context";
import { armurierDialogAfter, armurierDialogNode } from "@/lib/dialog";

export function Armory() {
	const { dialogsRead } = useVillage();

	return (
		<>
			<Activity
				mode={!dialogsRead.has("armurier_success") ? "hidden" : "visible"}
			>
				<AlreadyTalked />
			</Activity>
			<Activity
				mode={dialogsRead.has("armurier_success") ? "hidden" : "visible"}
			>
				<ArmoryDialog />
			</Activity>
		</>
	);
}

function ArmoryDialog() {
	return (
		<div className="flex gap-16 items-end">
			<DialogPlayer dialog={armurierDialogNode} />
			<img className="w-96 h-96" alt="Chief" src={armoristImg}></img>
		</div>
	);
}

function AlreadyTalked() {
	return (
		<div className="flex gap-16 items-end">
			<DialogPlayer dialog={armurierDialogAfter} />
			<img className="w-96 h-96" alt="Chief" src={armoristImg}></img>
		</div>
	);
}
