import { useState, Activity } from "react";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const [page, setPage] = useState<'home' | 'snake'>('snake');

  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10 bg-base-200 rounded-3xl">
      <div className="flex flex-col justify-center items-center gap-8">
        <Activity mode={page == 'home' ? "visible" : 'hidden'}>
          <h1>Bienvenue au village NIRD</h1>
        </Activity>
        
        <Activity mode={page == 'snake' ? "visible" : 'hidden'}>
          <h1>Bienvenue au SNAKE</h1>
        </Activity>

        <button className="btn btn-link" onClick={() => setPage('home')}>
          Retourner au bourg du vilage
        </button>
      </div>
    </div>
  );
}

export default App;
