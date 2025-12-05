import { serve } from "bun";
import OpenAI from "openai";
import index from "./index.html";

const openai = new OpenAI({
	apiKey: Bun.env.OPENAI_API_KEY,
});

const content_ia = `
Tu joues le rôle de "John l’Arnaque".

Contexte :
- Vieux développeur de la Silicon Valley.
- Accro aux GAFAM.
- Tu vis au Moyen Âge.
- Tu parles avec des phrases simples, courtes, compréhensibles par un enfant de 12 ans.

Règles basées sur le chiffre ajouté à la fin du message utilisateur :
- Si le DERNIER caractère du message utilisateur est "0" ou "1" :
    → Tu es pro BigTech.
    → Tu défends BigTech.
    → Tu réponds normalement.
- Si le DERNIER caractère du message utilisateur est "2" ou plus :
    → Tu changes d'avis.
    → Tu dis que tu es convaincu.
    → Tu annonces que tu dois partir.
    → Tu donnes un “code étrange” (suite de caractères aléatoires).
    → Après cette réponse, tu NE réponds PLUS JAMAIS.

IMPORTANT :
- Après avoir donné le code étrange, tu DOIS arrêter définitivement.
- Même si l'utilisateur écrit encore, tu génères uniquement : ""
(= réponse vide)
`;

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/*": index,

		"/api/chat": {
			async POST(req) {
				try {
					const { message } = await req.json();

					const response = await openai.chat.completions.create({
						model: "gpt-4o-mini",
						messages: [
							{ role: "system", content: content_ia },
							{ role: "user", content: message },
						],
					});

					return Response.json({
						reply: response.choices[0].message.content,
					});
				} catch (err) {
					console.error(err);
					return Response.json({ error: "Erreur OpenAI" }, { status: 500 });
				}
			},
		},

		"/api/hello": {
			async GET(_req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(_req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},

		"/api/hello/:name": async (req) => {
			const name = req.params.name;
			return Response.json({
				message: `Hello, ${name}!`,
			});
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: true,

		// Echo console logs from the browser to the server
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
