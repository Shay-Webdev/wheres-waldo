import Footer from "../Components/Footer/Footer";
import Header from "../Components/Headers/Header";
import GameContainer from "../Features/HomePage/Components/GameCardContainer/GameContainer";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between text-purple-600 ">
      <main className="flex flex-col min-h-screen bg-zinc-900 ">
        <Header />
        <section className="grow">
          <GameContainer />
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
