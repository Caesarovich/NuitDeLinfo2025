import type { VillageContextType } from "@/contexts/village-context";

export type DialogOption = {
	label: string;
	nextNode?: DialogNode;
	action?: (villageContext: VillageContextType) => void;
	condition?: () => boolean;
};

export type DialogNode = {
	text: string;
	self?: boolean;
	nextNode?: DialogNode;
	options?: DialogOption[];
};

export function dialogChainBuilder(...dialogs: DialogNode[]): DialogNode {
	for (let i = 0; i < dialogs.length; i++) {
		const node = dialogs[i];
		if (node) node.nextNode = dialogs[i + 1];
	}
	if (!dialogs[0]) throw "No Dialog wtf bro";

	return dialogs[0];
}

// Dialogues pour le Chef du bourg (introduction)

const chefIntroDialogSuite = dialogChainBuilder(
	{
		text: "Trois règles guident notre combat : rendre le numérique accessible, le rendre responsable, et le rendre durable.",
	},
	{
		text: "Va chez l'Artisan, la Druidesse et la Tisseuse : chacun t'apprendra une chose utile.",
	},
	{
		text: "Remporte des emblèmes en réussissant leurs épreuves.",
	},
	{
		text: "Rassemble-les tous et reviens : la grande épreuve t'attend, et la bannière NIRD sera à toi.",
	},
	{
		text: "Allez, va — et reviens fier·e.",
		options: [
			{
				label: "(Arrêter de lui parler)",

				action: (ctx) => {
					ctx.addReadDialog("intro");
				},
			},
		],
	},
);

export const chefIntroDialogNode: DialogNode = {
	text: "Hé ! Voyageur·se, Chef du bourg ici. Les grands marchands veulent tout contrôler. On va leur tenir tête.",
	options: [
		{
			label: "Euh... Salut ?",
			nextNode: chefIntroDialogSuite,
		},
		{
			label: "De quoi ?",
			nextNode: chefIntroDialogSuite,
		},
	],
};
