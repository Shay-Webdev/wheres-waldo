import Card from "../../../../Components/Card/Card";

const GameContainer = () => {
  const games = [
    {
      imgURL: "/src/assets/wheres-waldo.jpg",
      imgName: "Where's Waldo",
      gameId: 1,
    },
    {
      imgURL: "",
      imgName: "game2",
      gameId: 2,
    },
    {
      imgURL: "",
      imgName: "game3",
      gameId: 3,
    },
  ];
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
