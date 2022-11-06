import { styled } from "..";
export const Main = styled("main", {
  maxWidth: "1024px",
  maxHeight: "100vh",
  margin: "0 auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  header: {
    display: "flex",
    margin: "1rem 0",
  },
});
export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  gap: "2rem",
  "@sm": {
    flexDirection: "row",
    height: "calc(100vh - 150px)",
    alignItems: "unset",
    flex: "none",
  },
});
export const TabButton = styled("button", {
  padding: "0.5rem 1rem",
  border: "none",
  background: "$gray800",
  cursor: "pointer",

  color: "$gray300",

  "&:focus": {
    outline: "none",
  },
  variants: {
    selected: {
      true: {
        color: "$gray100",
        borderBottom: "2px solid $gray100",
      },
    },
  },
});
export const TabContainer = styled("div", {
  display: "flex",
  overflow: "hidden",
  justifyContent: "center",
  gap: "1rem",
});
export const MenuContainer = styled("div", {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignSelf: "baseline",
});
