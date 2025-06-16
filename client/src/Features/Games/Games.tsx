import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { games, waldoPolygon } from "../../Utils/Models/data";
import pointInPolygon from "point-in-polygon";
import type { SelectPosType } from "./Utils/types";
import Dropdown from "./Dropdown/Dropdown";

const Games = () => {
  const [gameObj, setGameObj] = useState<
    undefined | Record<string, string | number | unknown[]>
  >(undefined);
  const params = useParams();
  const [selectPos, setSelectPos] = useState<null | SelectPosType>(null);

  useEffect(() => {
    const newGame = games.find((game) => game.gameId === Number(params.gameId));
    setGameObj(newGame);
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
    <div className="relative">
      {gameObj === undefined ? (
        <p>Loading...</p>
      ) : (
        <img
          className="bg-zinc-900 cursor-crosshair"
          onClick={handleClick}
          src={gameObj.imgURL as string}
          alt={gameObj.imgName as string}
          key={gameObj.gameId as number}
        />
      )}
      {selectPos && <Dropdown selectPos={selectPos} />}
    </div>
  );
};

export default Games;
