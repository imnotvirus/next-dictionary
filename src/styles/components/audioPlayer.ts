import { styled } from "..";
export const Main = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  "&>div": {
    width: "100%",
    height: 5,
    background: "gray",
    borderRadius: 5,
    div: {
      height: "100%",
      width: "0%",
      backgroundColor: "green",
      borderRadius: 50,
    },
  },
  button: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    width: 40,
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});
