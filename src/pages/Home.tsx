import { useVillage } from "@/contexts/village-context";

export function Home() {
	const { setPage } = useVillage();

	return (
		<div className="flex flex-col">
			<h1 className="text-3xl font-bold mb-4">
				Bienvenue au bourg du village NIRD
			</h1>
			<p className="mb-8">
				C'est un village d'iréductibles passionnés d'informatiques qui résistent
				à l'invasion des GAFAMS
			</p>

			<div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => setPage("snake")}
				>
					Aller à la forge
				</button>
			</div>
		</div>
	);
}
