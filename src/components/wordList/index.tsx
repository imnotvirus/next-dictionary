import axios from "axios";
import React, { useCallback, useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { useWordContext } from "../../context";
import { Word, WordListContainer } from "../../styles/components/wordlist";
interface WordListProps {
  mode: "Word List" | "Favorites" | "History";
}

interface item {
  id: string;
  word: string;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const PAGE_SIZE = 151;
const WordList: React.FC<WordListProps> = ({ mode }) => {
  const { selectWord, selectedWord, history } = useWordContext();

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/supabase?page=${index + 1}`,
    fetcher
  );

  const WordList: item[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  const observerRef = useRef<HTMLButtonElement>(null);

  const getMore = useCallback(() => {
    if (isLoadingMore || isReachingEnd) return;
    setSize(size + 1);
  }, [size, isLoadingMore, isReachingEnd, setSize]);

  useEffect(() => {
    if (observerRef.current && mode == "Word List" && WordList.length >= 1) {
      const intersectionObserver = new IntersectionObserver(async (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          getMore();
        }
      });

      intersectionObserver.observe(observerRef.current);

      return () => intersectionObserver.disconnect();
    }
  }, [
    WordList.length,
    getMore,
    isLoadingMore,
    isReachingEnd,
    mode,
    observerRef,
    setSize,
    size,
  ]);

  return (
    <WordListContainer>
      {mode === "Word List" ? (
        <>
          {WordList.map((item) => (
            <Word
              key={item.id}
              onClick={() => {
                selectWord(item.word);
              }}
              selected={selectedWord === item.word}
            >
              {item.word}
            </Word>
          ))}
          <Word ref={observerRef} style={{ background: "transparent" }} />
        </>
      ) : mode === "History" ? (
        <>
          {history.map((item) => (
            <Word
              key={item}
              onClick={() => {
                selectWord(item);
              }}
              selected={selectedWord === item}
            >
              {item}
            </Word>
          ))}
        </>
      ) : null}
    </WordListContainer>
  );
};

export default WordList;
