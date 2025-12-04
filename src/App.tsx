import "./index.css";
import { VillageProvider } from "./contexts/village-context";
import Index from "./pages/Index";

export function App() {
	return (
		<VillageProvider>
			<div className="max-w-7xl mx-auto p-8 text-center relative z-10 bg-base-200 rounded-3xl">
				<div className="flex flex-col justify-center items-center gap-8">
					<Index />
				</div>
			</div>
		</VillageProvider>
	);
}

export default App;
