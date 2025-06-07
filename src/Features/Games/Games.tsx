import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { games } from "../../Utils/Models/data";
import pointInPolygon from "point-in-polygon";

const Games = () => {
  const [gameObj, setGameObj] = useState<
    undefined | Record<string, string | number>
  >(undefined);
  const params = useParams();
  useEffect(() => {
    const newGame = games.find((game) => game.gameId === Number(params.gameId));
    setGameObj(newGame);
  }, [params]);
  const handleClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const viewportX = e.clientX;
    const viewportY = e.clientY;
    const docX = e.pageX;
    const docY = e.pageY;
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const divX = viewportX - left;
    const divY = viewportY - top;
    const polygon = [
      [939, 499],
      [974, 550],
      [1015, 589],
      [982, 613],
      [956, 641],
      [922, 619],
      [891, 603],
      [907, 553],
    ];
    const isPointInPolygon = pointInPolygon([divX, divY], polygon);

    console.log(`clicked position in viewport: `, {
      viewport: `(${viewportX},${viewportY})`,
      document: `(${docX},${docY})`,
      div: `(${divX},${divY})`,
      isPointInPolygon,
    });
  };
  return (
    <div>
      {gameObj === undefined ? (
        <p>Loading...</p>
      ) : (
        <img
          onClick={handleClick}
          src={gameObj.imgURL as string}
          alt={gameObj.imgName as string}
          key={gameObj.gameId}
        />
      )}
    </div>
  );
};

export default Games;
