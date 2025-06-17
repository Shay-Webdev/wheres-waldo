import React, {
  useContext,
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
  putApi,
  type Characters,
  type fetchWrapperParam,
  type GameData,
} from "../../../Utils/fetch/fetchWrapper";
import type { CharactersFound } from "../../../Types/types";
import { AppContext } from "../../../Utils/contex";

type DropdownProps = {
  selectPos: SelectPosType;
  gameObj?: GameData;
  setIsCoordClicked: Dispatch<SetStateAction<boolean | null>>;
  selectOriginalPos: SelectPosType | null;
  setCharacterFound: Dispatch<SetStateAction<CharactersFound>>;
  charactersFound: CharactersFound;
};

const Dropdown = (props: DropdownProps) => {
  const { selectPos, setIsCoordClicked, selectOriginalPos } = props;
  //const [gameObj, setGameObj] = useState<
  //  undefined | GameData | Record<string, string | number | unknown[] | unknown>
  //>(undefined);
  const [characters, setCharacter] = useState<undefined | Characters[]>(
    undefined,
  );
  const [logoURL, setlogoURL] = useState<string | string[] | undefined>(
    undefined,
  );
  const { charactersFound, setCharacterFound } = useContext(AppContext);
  const [wrongClick, setWrongClick] = useState(false);
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

        // setGameObj(gameData);
        setlogoURL(characterLogoURLs);
        setCharacter(characters);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    const clickedBtnId = e.currentTarget.id;
    const { checkCoordinates } = getServerURL(
      Number(params.gameId),
      clickedBtnId,
    );
    console.log(`check coordnates url in dropown: `, checkCoordinates);
    console.log(`current target id in dropdown button click: `, clickedBtnId);
    const checkCoordinatesProps: fetchWrapperParam = {
      url: checkCoordinates,
      opts: {
        body: {
          coordinates: selectOriginalPos,
        },
      },
    };

    const checkCoordResponse = await putApi(checkCoordinatesProps);
    const isCoord = checkCoordResponse.data;
    if (isCoord && characters) {
      const characterIndex = characters?.findIndex(
        (character) => character.id === Number(clickedBtnId),
      );
      if (characterIndex !== -1) {
        setCharacterFound((prevCharacters: CharactersFound) => {
          const newCharacters: CharactersFound = [...prevCharacters];
          newCharacters[characterIndex] = true;
          return newCharacters as CharactersFound;
        });
      } else {
        setWrongClick(true);
      }
    }
    setIsCoordClicked(isCoord as boolean);
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
        className={
          charactersFound[0] === true
            ? "dropdown_button hover:dropdown_hover  bg-green-400"
            : "dropdown_button hover:dropdown_hover"
        }
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
        className={
          charactersFound[1] === true
            ? "dropdown_button hover:dropdown_hover  bg-green-400"
            : "dropdown_button hover:dropdown_hover"
        }
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
        className={
          charactersFound[2] === true
            ? "dropdown_button hover:dropdown_hover  bg-green-400"
            : "dropdown_button hover:dropdown_hover"
        }
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
