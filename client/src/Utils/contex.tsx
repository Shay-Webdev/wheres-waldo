import { createContext, type Dispatch, type SetStateAction } from "react";
import type { CharactersFound } from "../Types/types";
interface AppContextType {
  charactersFound: CharactersFound;
  setCharacterFound: Dispatch<SetStateAction<CharactersFound>>;
  wrongClick: boolean;
  setWrongClick: Dispatch<SetStateAction<boolean>>;
}
const AppContext = createContext<AppContextType>({
  charactersFound: [false, false, false],
  setCharacterFound: () => {},
  wrongClick: false,
  setWrongClick: () => {},
});

export { AppContext };
