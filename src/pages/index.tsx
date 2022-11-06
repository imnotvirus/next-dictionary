import { GetStaticProps } from "next";
import React, { useState } from "react";
import Player from "../components/player";
import WordList, { item } from "../components/wordList";
import { useWordContext } from "../context";
import { supabase } from "../libs/supabase";
import {
  Container,
  Main,
  MenuContainer,
  TabButton,
  TabContainer,
} from "../styles/pages/home";

interface HomeProps {
  initialData: item[];
}

const Home: React.FC<HomeProps> = ({ initialData }) => {
  const [selectedTab, setSelectedTab] = useState<
    "Word List" | "Favorites" | "History"
  >("Word List");
  const { selectedWord } = useWordContext();
  const onSelectWordList = () => setSelectedTab("Word List");
  const onSelectFavorites = () => setSelectedTab("Favorites");
  const onSelectHistory = () => setSelectedTab("History");

  return (
    <Main>
      <header>
        <h1>Dictionary</h1>
      </header>
      <Container>
        {selectedWord !== "" ? <Player /> : null}
        <MenuContainer>
          <TabContainer>
            <TabButton
              onClick={onSelectWordList}
              selected={selectedTab === "Word List"}
            >
              Word List
            </TabButton>
            <TabButton
              onClick={onSelectFavorites}
              selected={selectedTab === "Favorites"}
            >
              Favorites
            </TabButton>
            <TabButton
              onClick={onSelectHistory}
              selected={selectedTab === "History"}
            >
              History
            </TabButton>
          </TabContainer>
          <WordList initialList={initialData} mode={selectedTab} />
        </MenuContainer>
      </Container>
    </Main>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("wordlist")
    .select("*")
    .range(0, 150);

  return {
    props: {
      initialData: data,
    },
  };
};
