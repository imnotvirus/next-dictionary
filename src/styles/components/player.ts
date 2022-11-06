import { keyframes, styled } from "..";

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(50vh)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const Main = styled("div", {
  position: "absolute",
  zIndex: 99,
  background: "$gray800",
  bottom: 0,
  left: 0,
  right: 0,
  height: "100vh",
  gap: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: 15,
  animation: `${fadeIn} 0.2s ease-in-out`,
  "@md": {
    animation: "none",
    padding: 0,
    position: "relative",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxWidth: "300px",
    gap: "1rem",
    flex: 1,
    justifyContent: "center",
  },
});

export const ButtonClose = styled("button", {
  position: "absolute",
  top: 0,
  left: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "$gray100",
  padding: 10,
  "&:focus": {
    outline: "none",
  },
  "@md": {
    display: "none",
  },
});

export const ButtonFavorite = styled("button", {
  position: "absolute",
  top: 0,
  right: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "$gray100",
  padding: 10,
  "&:focus": {
    outline: "none",
  },
});

export const Display = styled("div", {
  position: "relative",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  width: "100%",
  aspectRatio: 1,
  background: "linear-gradient(141deg, #a33af5 0%, #5868df 100%)",
  strong: {
    fontSize: "$xl",
    letterSpacing: "0.25rem",
  },
  span: {
    fontSize: "$lg",
  },
});

export const AudioPlayer = styled("div", {
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

export const Description = styled("div", {
  display: "flex",
  flexDirection: "column",
  h2: {
    fontSize: "$xl",
    fontWeight: 600,
    textAlign: "center",
  },
  span: {
    fontSize: "$md",
    textAlign: "center",
  },
  div: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
    button: {
      width: "100%",
      height: 30,
      border: "none",
      borderRadius: 3,
      cursor: "pointer",
      background: "#5b67e0",
      color: "$grey100",
      transition: "all 0.2s",
      "&:hover": {
        filter: "brightness(1.1)",
      },
      "&:disabled": {
        cursor: "not-allowed",
        filter: "brightness(0.8)",
      },
    },
  },
});

export const WrapperDescriptions = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100px",
  overflow: "auto",
});
