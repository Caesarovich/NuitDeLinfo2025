import { CardEnemie, CardUser } from "./card";
import "./card_game.css";

export interface CardType {
	image: string;
	value: number;
}
interface Props {
	cards: CardType[];
	face_sens: string;
	z: number;
	setZ: Dispatch<SetStateAction<number>>;
}

function CardDeck({ cards, face_sens, z, setZ }: Props) {
	return (
		<div
			className={`card-deck${face_sens === "card-face-down" ? "-enemy" : ""}`}
		>
			{face_sens === "card-face-up"
				? cards.map((card: CardType, index: number) => (
						<CardUser key={index} image={card.image} z={z} setZ={setZ} />
					))
				: cards.map((card: CardType, index: number) => (
						<CardEnemie key={index} image={card.image} z={z} setZ={setZ} />
					))}
		</div>
	);
}

export default CardDeck;
