import { useNavigate } from "react-router-dom";
import { z } from "zod";

const cardSchema = z.object({
  imgURL: z.union([z.string().url(), z.string()]),
  imgName: z.string(),
  gameId: z.number(),
});

type CardProps = z.infer<typeof cardSchema>;
const Card = (props: CardProps) => {
  const { imgName, imgURL, gameId } = props;
  const navigate = useNavigate();
  const clickHander = () => {
    const gameURL = `games/${gameId}`;
    navigate(gameURL);
  };
  return (
    <div
      onClick={clickHander}
      key={gameId}
      className=" flex flex-col justify-between items-center min-h-80  gap-1 cursor-pointer border-4  border-violet-500 rounded-xl  p-2 "
    >
      <img src={imgURL} alt={imgName} className="rounded-2xl" />
      <h2 className="text-4xl font-bold">{imgName}</h2>
    </div>
  );
};

export default Card;
