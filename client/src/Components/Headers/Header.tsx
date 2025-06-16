import { useLocation } from "react-router-dom";
import { MyNavLink } from "../Nav/Nav";
import { games } from "../../Utils/Models/data";

const Header = () => {
  const location = useLocation();
  return (
    <header className="flex justify-between items-center px-2 min-h-20 bg-zinc-900">
      <h1 className="text-4xl font-bold text-purple-600">Finder!</h1>
      {location.pathname.includes("games") && (
        <div className="flex  gap-2 justify-between items-center">
          <p className="text-2xl underline">Find: </p>
          <div className="flex justify-evenly items-center gap-2">
            <img
              src={games[0].characters[0].logoURL}
              alt="waldo"
              className="dropdown_img"
            />
            <img
              src={games[0].characters[1].logoURL}
              alt="waldo"
              className="dropdown_img"
            />
            <img
              src={games[0].characters[2].logoURL}
              alt="waldo"
              className="dropdown_img"
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
