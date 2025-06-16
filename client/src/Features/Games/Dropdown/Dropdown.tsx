import { games, type Games } from "../../../Utils/Models/data";
import type { SelectPosType } from "../Utils/types";

type DropdownProps = {
  selectPos: SelectPosType;
  gameObj?: Games;
};

const Dropdown = (props: DropdownProps) => {
  const { selectPos } = props;
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
        <img
          src={games[0].characters[0].logoURL}
          alt="waldo"
          className="dropdown_img"
        />
        Waldo
      </button>
      <button value="begger" className="dropdown_button hover:dropdown_hover">
        <img
          src={games[0].characters[1].logoURL}
          alt="waldo"
          className="dropdown_img"
        />
        Begger
      </button>
      <button
        value="random-guy"
        className="dropdown_button hover:dropdown_hover"
      >
        <img
          src={games[0].characters[2].logoURL}
          alt="waldo"
          className="dropdown_img"
        />
        Random Guy
      </button>
    </div>
  );
};

export default Dropdown;
