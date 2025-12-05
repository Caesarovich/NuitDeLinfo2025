import type {
	CharacterState,
	VillageContextType,
} from "@/contexts/village-context";

export type DialogOption = {
	label: string;
	nextNode?: DialogNode;
	action?: (
		villageContext: VillageContextType,
		characterContext: CharacterState,
	) => void;
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

// Dialogues pour l'Armurier (reconditionnement / lutte contre l'obsolescence)
const arm_q1_opt0: DialogOption = {
	label: "Vérifier l'état du disque (SMART / test disque)",
	action: (ctx) => ctx.addReadDialog("armurier_q1_correct"),
};
const arm_q1_opt1: DialogOption = { label: "Réinstaller tout de suite l'OS" };
const arm_q1_opt2: DialogOption = { label: "Remplacer la batterie" };
const arm_q1_opts: DialogOption[] = [arm_q1_opt0, arm_q1_opt1, arm_q1_opt2];

const arm_q2_opt0: DialogOption = {
	label: "Ajouter de la RAM",
	action: (ctx) => ctx.addReadDialog("armurier_q2_ram"),
};
const arm_q2_opt1: DialogOption = {
	label: "Installer un antivirus plus lourd",
};
const arm_q2_opt2: DialogOption = {
	label: "Acheter de nouveaux ordinateurs pour tout le monde",
};
const arm_q2_opts: DialogOption[] = [arm_q2_opt0, arm_q2_opt1, arm_q2_opt2];

const arm_q3_opt0: DialogOption = {
	label: "Reconditionner : SSD + RAM + installer un OS libre léger",
	action: (ctx) => ctx.addReadDialog("armurier_q3_recondition"),
};
const arm_q3_opt1: DialogOption = { label: "Recycler et acheter du neuf" };
const arm_q3_opt2: DialogOption = { label: "Ne rien changer, attendre" };
const arm_q3_opts: DialogOption[] = [arm_q3_opt0, arm_q3_opt1, arm_q3_opt2];

const arm_q1_explain: DialogNode = {
	text: "Réinstaller l'OS ou remplacer la batterie n'est pas la première étape : si le disque est dégradé ou saturé, réinstaller ne règlera pas la cause et tu perdras du temps.",
	nextNode: undefined as unknown as DialogNode,
};

const arm_q2_explain: DialogNode = {
	text: "Un antivirus trop lourd ou l'achat massif sont des réponses coûteuses : commencer par augmenter la RAM et migrer vers un disque SSD ou un OS léger est souvent plus efficace et durable.",
	nextNode: undefined as unknown as DialogNode,
};

const arm_q3_explain: DialogNode = {
	text: "Recycler et acheter du neuf peut sembler propre, mais c'est souvent coûteux et génère de l'obsolescence. Reconditionner prolonge la vie des machines et forme les élèves.",
	nextNode: undefined as unknown as DialogNode,
};

const arm_q1: DialogNode = {
	text: "La machine est lente et met longtemps à démarrer. Quelle est la première action de diagnostic que tu ferais ?",
	options: arm_q1_opts,
};

const arm_q2: DialogNode = {
	text: "Le diagnostic montre un disque mécanique ancien et peu de RAM. Quelle action prioritaire choisis-tu pour améliorer la performance de l'école ?",
	options: arm_q2_opts,
};

const arm_q3: DialogNode = {
	text: "Pour rendre le parc scolaire durable, que proposes-tu ?",
	options: arm_q3_opts,
};

const arm_success: DialogNode = {
	text: "Excellent ! Avec SSD, RAM et OS libre, les machines seront rapides, durables et faciles à maintenir. Tu as mérité l'emblème de durabilité.",
	options: [
		{
			label: "Merci",
			action: (ctx, char) => {
				ctx.addReadDialog("armurier_success");
				char.addCompletedChallenge("repair");
			},
		},
	],
};

arm_q1_opt0.nextNode = arm_q2; // check disk -> next question
arm_q1_opt1.nextNode = arm_q1_explain; // reinstall -> explain -> back to q1
arm_q1_opt2.nextNode = arm_q1_explain; // battery -> explain

arm_q2_opt0.nextNode = arm_q3; // add RAM -> next
arm_q2_opt1.nextNode = arm_q2_explain;
arm_q2_opt2.nextNode = arm_q2_explain;

arm_q3_opt0.nextNode = arm_success;
arm_q3_opt1.nextNode = arm_q3_explain;
arm_q3_opt2.nextNode = arm_q3_explain;

arm_q1_explain.nextNode = arm_q1;
arm_q2_explain.nextNode = arm_q2;
arm_q3_explain.nextNode = arm_q3;

export const armurierDialogNode: DialogNode = {
	text: "Ho ho ! Bienvenue à la forge. Une école m'a apporté un vieil ordinateur. Veux-tu m'aider à décider quoi faire ?",
	options: [
		{ label: "Oui, on y va", nextNode: arm_q1 },
		{
			label: "Non, pas maintenant",
			nextNode: {
				text: "... Reviens me voir quand tu seras moins borné !",
			},
		},
	],
};

export const armurierDialogAfter: DialogNode = {
	text: "Merci, mais je n'ai plus de travail à te donner.",
};
