import "./index.css";
import { useEffect, useState } from "react";
import laserSound from "@/assets/laser.mp3";
import Navbar from "./components/navbar";
import { CharacterProvider } from "./contexts/village-context";
import Index from "./pages/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
	const [laserMode, setLaserMode] = useState(false);
	const [laserScore, setLaserScore] = useState(0);

	// LAZERGUEME

	useEffect(() => {
		const pointerSprite = document.getElementById("pointerSprite");

		const onMouseMove = (event: MouseEvent) => {
			if (!pointerSprite) return;
			pointerSprite.style.left = `${event.pageX - 20}px`;
			pointerSprite.style.top = `${event.pageY - 20}px`;
		};

		if (pointerSprite) {
			if (laserMode) {
				pointerSprite.style.display = "block";

				document.addEventListener("mousemove", onMouseMove);
			} else {
				pointerSprite.style.display = "hidden";
			}
		}

		const audio = new Audio(laserSound);

		const onClick = (event: PointerEvent) => {
			event.preventDefault();
			const node = event.target as HTMLElement | null;
			if (!(node instanceof HTMLElement)) return;

			const randomElement =
				node.classList[Math.floor(Math.random() * node.classList.length)];

			if (!randomElement) return;
			node.classList.remove(randomElement);

			setLaserScore(laserScore + randomElement.length * 10);

			audio.play().catch((error) => {
				console.error("Error playing audio:", error);
			});
		};
		if (laserMode) document.addEventListener("click", onClick);

		return () => {
			document.removeEventListener("click", onClick);
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, [laserMode, laserScore]);

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CharacterProvider>
				<Navbar
					setLaserMode={setLaserMode}
					laserMode={laserMode}
					laserScore={laserScore}
				/>
				<div className="min-h-screen flex flex-col justify-center items-center">
					<div className=" p-8 text-center relative z-10 bg-base-100 rounded-3xl">
						<Index />
					</div>
				</div>
			</CharacterProvider>
		</QueryClientProvider>
	);
}

export default App;
