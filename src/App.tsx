import "./index.css";
import Navbar from "./components/navbar";
import { CharacterProvider } from "./contexts/village-context";
import Index from "./pages/Index";

export function App() {
	return (
		<CharacterProvider>
			<Navbar />
			<div className="min-h-screen flex flex-col justify-center items-center">
				<div className="max-w-7xl p-8 text-center relative z-10 bg-base-100 rounded-3xl">
					<Index />
				</div>
			</div>
		</CharacterProvider>
	);
}

export default App;
