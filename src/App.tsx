import React, { useEffect, useState } from "react";

// const GITHUB = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = "https://api.github.com/users/w-b-dev/starred";
const Cards = ({ cards }: { cards: {}[] }) => {
  const _cards = cards.map((card: any) => {
    const { id, html_url, name, owner } = card;
    return (
      <section key={id}>
        <a href={html_url}>{owner.login}</a>
        <p>{name}</p>
        <img
          src={owner.avatar_url}
          alt={owner.login}
          height={"100px"}
          width={"100px"}
        />
        {/*<pre>{JSON.stringify(card, null, 2)}</pre>*/}
      </section>
    );
  });
  return <>{_cards}</>;
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
    <main className="App">
      <article>
        <Cards cards={cards} />
      </article>
    </main>
  );
}

export default App;
