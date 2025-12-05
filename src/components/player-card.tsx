import { useMemo } from "react";
import characterFace from "../assets/main-character-face.png";
import { useCharacter } from "../contexts/character-context";

function cappedDivision(a: number, b: number) {
	const result = a / b;

	if (!Number.isFinite(result)) return 0;

	return result;
}

export default function PlayerCard() {
	const { name, completedChallenges, challengeCount } = useCharacter();

	const percent = useMemo(
		() => cappedDivision(completedChallenges.size, challengeCount) * 100,
		[completedChallenges.size, challengeCount],
	);

	return (
		<div className="bg-base-200 rounded-xl p-2 w-96 h-18 flex gap-4">
			<div className="avatar">
				<div className="h-16 rounded">
					<img alt="Character face" src={characterFace} />
				</div>
			</div>
			<div className="flex flex-col flex-1 justify-between">
				<p className="font-retro text-3xl">{name}</p>
				<progress
					className="progress w-full"
					value={Math.ceil(percent)}
					max="100"
				></progress>
			</div>
		</div>
	);
}
