import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  selectedWord: string;
  selectWord: (word: string) => void;
  history: string[];
  handleFavorite: (item: string) => void;
  favorites: string[];
}

const WordContext = createContext({} as ContextProps);
interface WordContextProviderProps {
  children: React.ReactNode;
}

export const WordContextProvider: React.FC<WordContextProviderProps> = ({
  children,
}) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [historyWords, setHistoryWords] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavorite = (item: string) => {
    if (favorites.includes(selectedWord)) {
      const temp = favorites.filter((word) => word !== item);
      localStorage.setItem("@Dictionary:favorites", JSON.stringify(temp));
      setFavorites(temp);
    } else {
      const temp = [...favorites, item];
      localStorage.setItem("@Dictionary:favorites", JSON.stringify(temp));
      setFavorites(temp);
    }
  };

  useEffect(() => {
    const history = sessionStorage.getItem("@Dictionary:history");
    const storageFavorites = localStorage.getItem("@Dictionary:favorites");
    if (storageFavorites) {
      setFavorites(JSON.parse(storageFavorites));
    }
    if (history) {
      setHistoryWords(JSON.parse(history));
    }
  }, []);

  const router = useRouter();

  const selectWord = useCallback(
    (word: string) => {
      if (!historyWords.some((item) => item === word)) {
        setHistoryWords([...historyWords, word]);
        sessionStorage.setItem(
          "@Dictionary:history",
          JSON.stringify([...historyWords, word])
        );
      }
      if (word !== "") {
        router.query.word = word;
        router.push(router);
      } else {
        router.push("/");
      }

      setSelectedWord(word);
    },
    [historyWords, router]
  );

  return (
    <WordContext.Provider
      value={{
        selectedWord,
        selectWord,
        history: historyWords,
        favorites,
        handleFavorite,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const useWordContext = () => {
  return useContext(WordContext);
};
