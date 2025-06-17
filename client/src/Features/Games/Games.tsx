import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { waldoPolygon } from "../../Utils/Models/data";
import pointInPolygon from "point-in-polygon";
import type { SelectPosType } from "./Utils/types";
import Dropdown from "./Dropdown/Dropdown";
import { getServerURL } from "../../Utils/fetch/fetchURL";
import { getApi } from "../../Utils/fetch/fetchWrapper";
import { AppContext } from "../../Utils/contex";

const Games = () => {
  const [gameObj, setGameObj] = useState<
    undefined | Record<string, string | number | unknown[] | unknown>
  >(undefined);
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const params = useParams();
  const [selectPos, setSelectPos] = useState<null | SelectPosType>(null);
  const [selectOriginalPos, setSelectOriginalPos] =
    useState<null | SelectPosType>(null);
  const [isCoordClicked, setIsCoordClicked] = useState<null | boolean>(null);

  const { wrongClick, charactersFound, setCharacterFound } =
    useContext(AppContext);

  useEffect(() => {
    try {
      async function fetchHandler() {
        const { gameImage, gameDetail } = getServerURL(Number(params.gameId));
        console.log(`urls in games component: `, {
          gameImage,
          gameDetail,
        });
        const gameData = await getApi({ url: gameDetail });

        setGameObj(gameData.data as Record<string, unknown>);
        setImgURL(gameImage);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);

  useEffect(() => {
    if (selectPos)
      console.log(
        `selected position and character id & is characters found in games: `,
        {
          selectPos,
          isCoordClicked,
          charactersFound,
        },
      );
    if (isCoordClicked) {
      console.log(`Character selcted is true: `, isCoordClicked);
    }
  }, [selectPos, isCoordClicked, charactersFound]);

  const handleClick: React.MouseEventHandler<HTMLImageElement> = async (e) => {
    const viewportX = e.clientX;
    const viewportY = e.clientY;
    const docX = e.pageX;
    const docY = e.pageY;
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.naturalWidth / width;
    const scaleY = e.currentTarget.naturalHeight / height;

    const imgX = viewportX - left;
    const imgY = viewportY - top;
    const imgOrginalX = Math.round(imgX * scaleX);
    const imgOrginalY = Math.round(imgY * scaleY);
    const isPointInPolygon = pointInPolygon(
      [imgOrginalX, imgOrginalY],
      waldoPolygon,
    );

    setSelectPos([imgX, imgY]);
    setSelectOriginalPos([imgOrginalX, imgOrginalY]);

    console.log(`is coordinates clicked a character: `, isCoordClicked);

    console.log(`clicked position in viewport: `, {
      viewport: `(${viewportX},${viewportY})`,
      document: `(${docX},${docY})`,
      div: `(${imgX},${imgY})`,
      scale: `(${scaleX},${scaleY})`,
      imgOriginal: `(${imgOrginalX},${imgOrginalY})`,
      isPointInPolygon,
      select: selectPos,
    });
  };
  return (
    <div className="realtive">
      {wrongClick && selectPos && (
        <div
          style={{
            position: "absolute",
            left: selectPos && selectPos[0],
            top: selectPos && selectPos[1],
            zIndex: 10,
            backgroundColor: "red",
            borderWidth: "4px",
            minWidth: "1em",
            minHeight: "1em",
          }}
        ></div>
      )}
      {gameObj === undefined ? (
        <p className="justify-self-center self-center font-extrabold text-2xl">
          Loading...
        </p>
      ) : (
        <img
          className="bg-zinc-900 cursor-crosshair"
          onClick={handleClick}
          src={imgURL as string}
          alt={gameObj.name as string}
          key={gameObj.id as number}
        />
      )}
      {selectPos && (
        <Dropdown
          selectPos={selectPos}
          setIsCoordClicked={setIsCoordClicked}
          selectOriginalPos={selectOriginalPos}
          setCharacterFound={setCharacterFound}
          charactersFound={charactersFound}
        />
      )}
    </div>
  );
};

export default Games;
