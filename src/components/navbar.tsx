import logo from "../assets/LogoNIRD.svg";
import PlayerCard from "./player-card";

export default function Navbar() {
	return (
		<nav className="navbar h-24 bg-base-100 shadow-sm px-4">
			<div className="flex-none">
				<div className="tooltip tooltip-right" data-tip="NIRD Logo">
					<img alt="NIRD Logo" className="size-18" src={logo} />
				</div>
			</div>
			<div className="flex-1"></div>
			<div className="flex-none">
				<PlayerCard />
			</div>
		</nav>
	);
}
