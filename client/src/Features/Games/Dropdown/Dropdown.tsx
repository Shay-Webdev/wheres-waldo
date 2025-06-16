import { useEffect, useState } from "react";
import type { SelectPosType } from "../Utils/types";
import { useParams } from "react-router-dom";
import { getServerURL } from "../../../Utils/fetch/fetchURL";
import {
  getApi,
  type Characters,
  type GameData,
} from "../../../Utils/fetch/fetchWrapper";

type DropdownProps = {
  selectPos: SelectPosType;
};

const Dropdown = (props: DropdownProps) => {
  const { selectPos } = props;
  const [logoURL, setlogoURL] = useState<string | string[] | undefined>(
    undefined,
  );
  const params = useParams();
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

        setlogoURL(characterLogoURLs);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);
  return (
    <div
      style={{
        position: "absolute",
        left: selectPos.x,
        top: selectPos.y,
        zIndex: 10,
      }}
      className="absolute bg-zinc-800  rounded shadow-md z-10  flex flex-col opacity-90"
      id="characters"
    >
      <button value="waldo" className="dropdown_button hover:dropdown_hover">
        <img src={logoURL && logoURL[0]} alt="waldo" className="dropdown_img" />
        Waldo
      </button>
      <button value="begger" className="dropdown_button hover:dropdown_hover">
        <img src={logoURL && logoURL[1]} alt="waldo" className="dropdown_img" />
        Begger
      </button>
      <button
        value="random-guy"
        className="dropdown_button hover:dropdown_hover"
      >
        <img src={logoURL && logoURL[2]} alt="waldo" className="dropdown_img" />
        Random Guy
      </button>
    </div>
  );
};

export default Dropdown;
