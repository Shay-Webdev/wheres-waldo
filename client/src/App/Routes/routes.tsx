import type { RouteObject } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../../Components/Error/Error";
import GameContainer from "../../Features/HomePage/Components/GameCardContainer/GameContainer";
import Games from "../../Features/Games/Games";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <GameContainer />,
      },
      {
        path: "games/:gameId",
        element: <Games />,
      },
    ],
  },
];

export default routes;
