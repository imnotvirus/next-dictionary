import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  selectedWord: string;
  selectWord: (word: string) => void;
  history: string[];
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

  useEffect(() => {
    const history = sessionStorage.getItem("@Dictionary:history");
    if (history) {
      setHistoryWords(JSON.parse(history));
    }
  }, []);

  const selectWord = (word: string) => {
    if (!historyWords.some((item) => item === word)) {
      setHistoryWords([...historyWords, word]);
      sessionStorage.setItem(
        "@Dictionary:history",
        JSON.stringify([...historyWords, word])
      );
    }
    setSelectedWord(word);
  };

  return (
    <WordContext.Provider
      value={{ selectedWord, selectWord, history: historyWords }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const useWordContext = () => {
  return useContext(WordContext);
};
