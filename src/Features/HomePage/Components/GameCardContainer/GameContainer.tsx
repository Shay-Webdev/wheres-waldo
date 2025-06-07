import Card from "../../../../Components/Card/Card";
import { games } from "../../../../Utils/Models/data";
const GameContainer = () => {
  return (
    <div className="grid grid-cols-3 gap-4 min-w-full p-4 justify-center">
      {games.map((game) => (
        <Card
          imgName={game.imgName}
          imgURL={game.imgURL}
          gameId={game.gameId}
        />
      ))}
    </div>
  );
};

export default GameContainer;
