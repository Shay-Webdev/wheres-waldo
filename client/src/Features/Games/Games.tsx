import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { waldoPolygon } from "../../Utils/Models/data";
import pointInPolygon from "point-in-polygon";
import type { SelectPosType } from "./Utils/types";
import Dropdown from "./Dropdown/Dropdown";
import { getServerURL } from "../../Utils/fetch/fetchURL";
import { getApi } from "../../Utils/fetch/fetchWrapper";

const Games = () => {
  const [gameObj, setGameObj] = useState<
    undefined | Record<string, string | number | unknown[] | unknown>
  >(undefined);
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const params = useParams();
  const [selectPos, setSelectPos] = useState<null | SelectPosType>(null);

  useEffect(() => {
    try {
      async function fetchHandler() {
        // const newGame = games.find(
        //  (game) => game.gameId === Number(params.gameId),
        //  );
        const { gameImage, gameDetail } = getServerURL(Number(params.gameId));
        const gameData = await getApi({ url: gameDetail });

        console.log(`game detail url in games component: `, gameData);
        setGameObj(gameData.data as Record<string, unknown>);
        setImgURL(gameImage);
      }

      fetchHandler();
    } catch (error) {
      console.error(`Error in game : `, error);
    }
  }, [params]);

  const handleClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
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

    setSelectPos({ x: imgX, y: imgY });

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
    <div className="flex">
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
      {selectPos && <Dropdown selectPos={selectPos} />}
    </div>
  );
};

export default Games;
