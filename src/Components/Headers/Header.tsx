import { MyNavLink } from "../Nav/Nav";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-2 min-h-20 bg-zinc-900">
      <h1 className="text-4xl font-bold text-purple-600">Finder!</h1>
      <nav className="flex justify-evenly items-center w-[min(10em,20%)] ">
        <MyNavLink to="/">Home</MyNavLink>
        <MyNavLink to="dashboard">Dashboard</MyNavLink>
      </nav>
    </header>
  );
};

export default Header;
