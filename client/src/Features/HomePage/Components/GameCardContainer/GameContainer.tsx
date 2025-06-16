import { useEffect, useState } from "react";
import Card from "../../../../Components/Card/Card";
import {
  getServerURL,
  serverURL,
  serverURLOrigin,
} from "../../../../Utils/fetch/fetchURL";
import {
  getApi,
  type fetchWrapperParam,
} from "../../../../Utils/fetch/fetchWrapper";
const GameContainer = () => {
  console.log(
    `server url origin in game container: `,
    serverURLOrigin,
    serverURL,
  );
  const [games, setGames] = useState<Record<string, unknown>[] | undefined>(
    undefined,
  );

  useEffect(() => {
    try {
      const fetchHandler = async () => {
        const gameDataProps: fetchWrapperParam = {
          url: serverURLOrigin,
        };
        const allGameData = await getApi(gameDataProps);
        const gamesArray = allGameData.data as Record<string, unknown>[];
        console.log(`game data in game container: `, {
          allGameData,
          gamesArray,
        });
        setGames(gamesArray);
      };
      fetchHandler();
    } catch (error) {
      console.error(`Error in game data`, error);
    }
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 min-w-full p-4 justify-center">
      {games &&
        games.map((game) => {
          const { gameImage } = getServerURL(game.id as number);
          return (
            <Card
              imgName={game.name as string}
              imgURL={gameImage}
              gameId={game.id as number}
            />
          );
        })}
    </div>
  );
};

export default GameContainer;
