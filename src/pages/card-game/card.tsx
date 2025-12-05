import { useState } from "react";
import card_back from "../../assets/card/card_back.png";
import "./card_game.css";

interface Props {
	image: string;
	z: number;
	setZ: Dispatch<SetStateAction<number>>;
}

export function CardUser({ image, z, setZ }: Props) {
	const [active, setActive] = useState<boolean>(false);
	const [cardZ, setCardZ] = useState<number>(z); // local z for this card

	return (
		<div
			className={`card user ${active ? "active" : ""}`}
			style={{ zIndex: cardZ }}
			onClick={() => {
				setActive(true);
				setCardZ(z); // bring this card on top
				setZ(z + 1); // increment global z for next click
			}}
		>
			<img src={image} alt="image" className="card-img" />
		</div>
	);
}

export function CardEnemie({ image, z, setZ }: Props) {
	const [active, setActive] = useState<boolean>(false);
	const [cardFace, setCardFace] = useState<string>(card_back);
	return (
		<div
			className={`card enemie ${active ? "active" : ""}`}
			style={{ zIndex: z }}
			onClick={() => {
				console.log(z);
				setCardFace(image);
				setActive(true);
				setZ(z + 1);
			}}
		>
			<img className="card-img enemie" src={cardFace} alt={"image"} />
		</div>
	);
}
