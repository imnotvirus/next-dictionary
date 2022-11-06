import { styled } from "..";
export const Word = styled("button", {
  padding: "1rem",
  backgroundColor: "white",
  border: "1px solid black",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  color: "$gray800",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },

  variants: {
    selected: {
      true: {
        backgroundColor: "$gray300",
      },
    },
  },
});
export const WordListContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  overflowY: "auto",
  justifyContent: "center",
  maxHeight: "calc(100vh - 240px)",
  position: "relative",
});
