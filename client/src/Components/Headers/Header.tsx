import { useLocation, useParams } from "react-router-dom";
import { MyNavLink } from "../Nav/Nav";
import { useContext, useEffect, useState } from "react";
import { getServerURL } from "../../Utils/fetch/fetchURL";
import {
  getApi,
  type Characters,
  type GameData,
} from "../../Utils/fetch/fetchWrapper";
import { AppContext } from "../../Utils/contex";
import Timer from "./Timer/Timer";

const Header = () => {
  const location = useLocation();
  const params = useParams();
  const [characters, setCharacter] = useState<undefined | Characters[]>(
    undefined,
  );
  const [logoURL, setlogoURL] = useState<string | string[] | undefined>(
    undefined,
  );
  const { charactersFound } = useContext(AppContext);
  useEffect(() => {
    try {
      async function fetchHandler() {
        const { gameDetail } = getServerURL(Number(params.gameId));
        const gameDataResponse = await getApi({ url: gameDetail });
        const gameData = gameDataResponse.data as GameData;
        const characters = gameData.Character as Characters[];
        const characterIds = characters.map((character) => character.id);
        const characterLogoURLs = characterIds.map((characterId) => {
          const { characterLogo } = getServerURL(params.gameId, characterId);
          return characterLogo;
        });
        console.log(`game detail url in games component: `, {
          gameData,
          characters,
          characterIds,
          characterLogoURLs,
        });

        // setGameObj(gameData);
        setlogoURL(characterLogoURLs);
        setCharacter(characters);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);
  return (
    <header className="flex justify-between items-center px-2 min-h-20 bg-zinc-900">
      <h1 className="text-4xl font-bold text-purple-600">Finder!</h1>
      <Timer />
      {location.pathname.includes("games") && (
        <div className="flex  gap-2 justify-between items-center">
          <p className="text-2xl underline">Find: </p>
          <div className="flex justify-evenly items-center gap-2">
            <img
              src={logoURL && logoURL[0]}
              alt={characters && characters[0].name}
              className={
                charactersFound[0] === true
                  ? "dropdown_img   border-4 border-green-500"
                  : "dropdown_img"
              }
            />
            <img
              src={logoURL && logoURL[1]}
              alt={characters && characters[1].name}
              className={
                charactersFound[1] === true
                  ? "dropdown_img   border-4 border-green-500"
                  : "dropdown_img"
              }
            />
            <img
              src={logoURL && logoURL[2]}
              alt={characters && characters[2].name}
              className={
                charactersFound[2] === true
                  ? "dropdown_img   border-4 border-green-500"
                  : "dropdown_img"
              }
            />
          </div>
        </div>
      )}
      <nav className="flex justify-evenly items-center w-[min(10em,20%)] ">
        <MyNavLink to="/">Home</MyNavLink>
        <MyNavLink to="dashboard">Dashboard</MyNavLink>
      </nav>
    </header>
  );
};

export default Header;
