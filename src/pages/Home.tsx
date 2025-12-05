import { Activity } from "react";
import chiefImg from "@/assets/character-chef.png";
import { DialogPlayer } from "@/components/dialog-player";
import { useVillage } from "@/contexts/village-context";
import { chefIntroDialogNode } from "@/lib/dialog";

export function Home() {
	const { setPage, dialogsRead } = useVillage();

	return (
		<>
			<Activity mode={!dialogsRead.has("intro") ? "hidden" : "visible"}>
				<div className="flex flex-col text-xl">
					<h1 className="text-5xl font-bold mb-4 font-retro">
						Bienvenue au bourg du village NIRD
					</h1>
					<p className="mb-8">
						C'est un village d'iréductibles passionnés d'informatiques qui
						résistent à l'invasion des GAFAMS
					</p>

					<div>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setPage("armory")}
						>
							Aller à la forge
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setPage("card")}
						>
							Jeux de carte (pas fini)
						</button>
					</div>
				</div>
			</Activity>
			<Activity mode={dialogsRead.has("intro") ? "hidden" : "visible"}>
				<IntroductionDialog />
			</Activity>
		</>
	);
}

function IntroductionDialog() {
	return (
		<div className="flex gap-16 items-end">
			<DialogPlayer dialog={chefIntroDialogNode} />
			<img className="w-96 h-96" alt="Chief" src={chiefImg}></img>
		</div>
	);
}
