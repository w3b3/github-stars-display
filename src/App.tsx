import React, { useEffect, useState } from "react";
import { Box, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardRoot: {
    flex: 1,
    border: "1px solid #333",
    // boxShadow: "0 0 5px 0px hsl(0deg 0% 50% / 50%);",
    borderRadius: 6,
    margin: 2,
  },
  link: {
    display: "inline-block",
  },
  noOverflow: {
    minWidth: "min(20%, 100px)",
    "@media(max-width: 480px)": {
      minWidth: "30vw",
    },
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#222",
    padding: 2,
    // height: "100%",
    // width: "100%",
  },
  image: {
    borderRadius: "50%",
    // boxShadow: "0 0 1px rgb(255 255 255 / 15%)",
  },
  title: {
    position: "relative",
    top: "-50%",
    // maxWidth: "15ch",
    width: "15ch",
    // position: "absolute",
    // display: "inline-block",
    cursor: "pointer",
    color: "white",
    padding: "5px 10px",
    // fontSize: "large",
    transform: "rotate(0)",
    textAlign: "center",
    fontWeight: "bold",
    // borderRadius: "8px",
    // border: "1px solid rgb(200 200 200 / 95%)",
    opacity: "0.35",
    // backgroundColor: "rgb(200 200 200 / 10%)",
    textTransform: "capitalize",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textShadow: "1px 1px 1px #000000",
    transition: "300ms all",
    // transition: "max-width 300ms, transform 300ms, border-radius 300ms",
    // boxShadow: "0 0 4px 0px rgb(200 200 200 / 95%)",
    "&:hover": {
      // maxWidth: "17ch",
      // fontSize: "small",
      // height: "100%",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      borderColor: "transparent",
      color: "#ff6d6d",
      opacity: "1",
      // transform: "scale(2)",
      backgroundColor: "transparent",
      // border: "none",
      // borderRadius: "0",
      boxShadow: "none",
    },
  },
});
/**/

// const GITHUB = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = "https://api.github.com/users/w-b-dev/starred";
const Cards = ({ cards }: { cards: {}[] }) => {
  const classes = useStyles();
  const _cards = cards.map((card: any) => {
    const { id, html_url, name, owner } = card;
    return (
      <Box key={id} className={classes.cardRoot}>
        <Box className={classes.noOverflow}>
          <Link href={html_url} className={classes.link}>
            <img
              loading="lazy"
              className={classes.image}
              src={owner.avatar_url}
              alt={owner.login}
              height={"100px"}
              width={"100px"}
            />
          </Link>
          <Box className={classes.title}>{name}</Box>
        </Box>
      </Box>
    );
  });
  /*<pre>{JSON.stringify(card, null, 2)}</pre>*/
  return (
    <Grid container justify={"space-between"}>
      {_cards}
    </Grid>
  );
};

function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const ignoreResponse = { status: false };
    const fetchStars = async () => {
      const payload = await fetch(GITHUB_URL);
      const json = await payload.json();
      if (!ignoreResponse.status) setCards(json);
    };
    fetchStars();
    return () => {
      ignoreResponse.status = true;
    };
  }, []);
  return (
    <Grid container className="App">
      <Cards cards={cards} />
    </Grid>
  );
}

export default App;
