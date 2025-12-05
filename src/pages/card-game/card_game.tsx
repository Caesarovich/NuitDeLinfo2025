import { useState } from "react";
import apple from "../../assets/card/apple.png";
import google_drive from "../../assets/card/google_drive.png";
import google_map from "../../assets/card/google_map.png";
import google_search from "../../assets/card/google_search.png";
import linux from "../../assets/card/linux.png";
import linux_gnu from "../../assets/card/linux_gnu.png";
import nextcloud from "../../assets/card/nextcloud.png";
import openstreatmap from "../../assets/card/openstretmap.png";
import searx from "../../assets/card/searx.png";
import windows from "../../assets/card/windows.png";
import table from "../../assets/table.png";
import type { CardType } from "./card_deck";
import CardDeck from "./card_deck";

function CardGame() {
	const [z, setZ] = useState(2);
	const [deckUser, _setDeckUser] = useState<CardType[]>([
		{ image: apple, value: 1 },
		{ image: google_search, value: 1 },
		{ image: linux, value: 1 },
		{ image: linux_gnu, value: 1 },
		{ image: nextcloud, value: 1 },
		{ image: openstreatmap, value: 1 },
		{ image: searx, value: 1 },
	]);

	const [deckEnemie, _setDeckEnemie] = useState<CardType[]>([
		{ image: google_drive, value: 1 },
		{ image: google_map, value: 1 },
		{ image: google_search, value: 1 },
		{ image: linux_gnu, value: 1 },
		{ image: nextcloud, value: 1 },
		{ image: openstreatmap, value: 1 },
		{ image: windows, value: 1 },
	]);

	return (
		<div className="card-game">
			<img className="card-game-background" src={table} alt="table" />
			<CardDeck cards={deckUser} face_sens={"card-face-up"} z={z} setZ={setZ} />
			<CardDeck
				cards={deckEnemie}
				face_sens={"card-face-down"}
				z={z}
				setZ={setZ}
			/>
		</div>
	);
}

export default CardGame;
