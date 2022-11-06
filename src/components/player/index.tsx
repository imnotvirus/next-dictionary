import { Star, X } from "phosphor-react";
import React, { useEffect, useMemo, useState } from "react";
import { useWordContext } from "../../context";
import { useApi } from "../../libs/api";
import {
  ButtonClose,
  ButtonFavorite,
  Description,
  Display,
  Main,
  WrapperDescriptions,
} from "../../styles/components/player";
import AudioPlayer from "../AudioPlayer";
interface Response {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: any[];
  antonyms: string[];
}

interface Definition {
  definition: string;
  synonyms: any[];
  antonyms: string[][];
  example?: string;
}

interface Phonetic {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: License;
}

interface License {
  name: string;
  url: string;
}
const Player: React.FC = () => {
  const { selectedWord, selectWord, favorites, handleFavorite } =
    useWordContext();
  const [index, setIndex] = useState(0);

  const { data, error, loading } = useApi<Response>(selectedWord);

  const phonetic = useMemo(() => {
    const response =
      (data && data.phonetics.find((item: any) => item.audio && item.text)) ??
      null;
    return response;
  }, [data]);

  const audio = useMemo(() => {
    if (!phonetic) return null;
    return phonetic.audio;
  }, [phonetic]);

  const definitions = useMemo(() => {
    if (!data) return null;
    return data.meanings[0].definitions.map((item) => item.definition);
  }, [data]);

  useEffect(() => {
    if (data) {
      setIndex(0);
    }
  }, [data]);

  const isFavorite = data && favorites.some((item) => item === data.word);

  return (
    <Main>
      <Display>
        <ButtonClose onClick={() => selectWord("")}>
          <X size={30} />
        </ButtonClose>
        <ButtonFavorite onClick={() => handleFavorite(data.word)}>
          <Star
            size={30}
            color={isFavorite ? "#f2ff0c" : "white"}
            weight={isFavorite ? "fill" : "regular"}
          />
        </ButtonFavorite>
        <strong>
          {loading ? "Carregando" : error ? "word not found" : data.word}
        </strong>
        <span>{phonetic?.text}</span>
      </Display>
      {!error && (
        <>
          {audio ? <AudioPlayer src={audio} /> : null}
          <Description>
            <h2>Meanings</h2>
            <WrapperDescriptions>
              {definitions && definitions[index] && (
                <>
                  {definitions[index].split(";").map((item, index) => (
                    <span key={String(index)}>{item}</span>
                  ))}
                </>
              )}
            </WrapperDescriptions>
            <div>
              <button
                onClick={() => setIndex(index - 1)}
                disabled={index === 0}
              >
                Previous meaning
              </button>
              <button
                onClick={() => setIndex(index + 1)}
                disabled={Boolean(
                  definitions && index === definitions.length - 1
                )}
              >
                Next meaning
              </button>
            </div>
          </Description>
        </>
      )}
    </Main>
  );
};

export default Player;
