import { createContext, type Dispatch, type SetStateAction } from "react";
import type { CharactersFound } from "../Types/types";
interface AppContextType {
  charactersFound: CharactersFound;
  setCharacterFound: Dispatch<SetStateAction<CharactersFound>>;
}
const AppContext = createContext<AppContextType>({
  charactersFound: [false, false, false],
  setCharacterFound: () => {},
});

export { AppContext };
