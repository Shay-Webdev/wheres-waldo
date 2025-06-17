import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Headers/Header";
import "./App.css";
import { useState } from "react";
import type { CharactersFound } from "../Types/types";
import { AppContext } from "../Utils/contex";

function App() {
  const [charactersFound, setCharacterFound] = useState<CharactersFound>([
    false,
    false,
    false,
  ]);
  const [wrongClick, setWrongClick] = useState(false);
  return (
    <div className="min-h-screen flex flex-col justify-between text-purple-600 ">
      <main className="flex flex-col min-h-screen bg-zinc-900 ">
        <AppContext.Provider
          value={{
            charactersFound,
            setCharacterFound,
            wrongClick,
            setWrongClick,
          }}
        >
          <Header />
          <section className="grow">
            <Outlet />
          </section>
          <Footer />
        </AppContext.Provider>
      </main>
    </div>
  );
}

export default App;
