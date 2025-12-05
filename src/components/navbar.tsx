import logo from "../assets/LogoNIRD.svg";
import PlayerCard from "./player-card";

export type NavbarProps = {
	laserMode: boolean;
	setLaserMode: (mode: boolean) => void;
};

export default function Navbar(props: NavbarProps) {
	return (
		<nav className="navbar h-24 bg-base-100 shadow-sm px-4">
			<div className="navbar-start">
				<div className="tooltip tooltip-right" data-tip="NIRD Logo">
					<img alt="NIRD Logo" className="size-18" src={logo} />
				</div>
			</div>
			<div className="navbar-center">
				<button
					type="button"
					disabled={props.laserMode}
					className="btn btn-error"
					onClick={() => {
						if (
							confirm("Voulez-vous activer le mode Lazer et tout détruire ?")
						) {
							props.setLaserMode(true);
						}
					}}
				>
					LAZERGUEME
				</button>
			</div>
			<div className="navbar-end">
				<PlayerCard />
			</div>
		</nav>
	);
}
