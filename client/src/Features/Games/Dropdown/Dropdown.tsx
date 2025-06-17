import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
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
  gameObj?: GameData;
  setSelectCharId: Dispatch<SetStateAction<string | number | null>>;
};

const Dropdown = (props: DropdownProps) => {
  const { selectPos, setSelectCharId } = props;
  const [gameObj, setGameObj] = useState<
    undefined | GameData | Record<string, string | number | unknown[] | unknown>
  >(undefined);
  const [characters, setCharacter] = useState<undefined | Characters[]>(
    undefined,
  );
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

        setGameObj(gameData);
        setlogoURL(characterLogoURLs);
        setCharacter(characters);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectCharId(e.currentTarget.id);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: selectPos && selectPos[0],
        top: selectPos && selectPos[1],
        zIndex: 10,
      }}
      className="absolute bg-zinc-800  rounded shadow-md z-10  flex flex-col opacity-90"
      id="characters"
    >
      <button
        value={characters && characters[0].name}
        className="dropdown_button hover:dropdown_hover"
        onClick={clickHandler}
        id={characters && characters[0].id.toString()}
      >
        <img
          src={logoURL && logoURL[0]}
          alt={characters && characters[0].name}
          className="dropdown_img"
        />
        {characters && characters[0].name}
      </button>
      <button
        value={characters && characters[1].name}
        className="dropdown_button hover:dropdown_hover"
        onClick={clickHandler}
        id={characters && characters[1].id.toString()}
      >
        <img
          src={logoURL && logoURL[1]}
          alt={characters && characters[1].name}
          className="dropdown_img"
        />
        {characters && characters[1].name}
      </button>
      <button
        value={characters && characters[2].name}
        className="dropdown_button hover:dropdown_hover"
        onClick={clickHandler}
        id={characters && characters[2].id.toString()}
      >
        <img
          src={logoURL && logoURL[2]}
          alt={characters && characters[2].name}
          className="dropdown_img"
        />
        {characters && characters[2].name}
      </button>
    </div>
  );
};

export default Dropdown;
