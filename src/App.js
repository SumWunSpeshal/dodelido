import { useEffect, useState } from "react";
import "./App.css";
import Tray from "./Tray";

let id = 0;
const ANIMALS = ["Schildkroete", "Flamingo", "Zebra", "Kamel", "Pinguin"];
const COLORS = ["Pink", "Blau", "Weiss", "Gruen", "Gelb"];
const COMBINATIONS = ANIMALS.map((a) => COLORS.map((c) => ({ tier: a, farbe: c })));
const DECK = COMBINATIONS.map((c) => Array(4).fill(c))
  .flat(2)
  .map((e) => ({ ...e, id: id++ }))
  .sort(() => 0.5 - Math.random());

function App() {
  const [playedCards, setPlayedCards] = useState([]);
  const [call, setCall] = useState("");

  function handleNextCard() {
    setPlayedCards((c) => [...c, DECK[c.length]]);
  }

  useEffect(() => {
    const lastThreeCards = playedCards.slice(-3);
    let hmmCount = lastThreeCards.filter(({ tier }) => tier === "Schildkroete").length;
    const hmms = Array(hmmCount).fill("hmm").join(", ");

    const counts = [...ANIMALS, ...COLORS].reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
    const matches = lastThreeCards.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.tier]: prev[curr.tier] + 1,
        [curr.farbe]: prev[curr.farbe] + 1,
      }),
      counts
    );

    const numberOfHighestOccurence = Math.max(...Object.values(matches));
    const highestMatches = Object.entries(matches).filter(([_, value]) => value === numberOfHighestOccurence);
    const _call = numberOfHighestOccurence <= 1 ? "Nix!" : highestMatches.length === 1 ? highestMatches[0][0] : "Dodelido!";

    setCall([hmms, _call].filter(Boolean).join(". "));
  }, [playedCards]);

  return (
    <div className="App">
      <button type="button" onClick={handleNextCard}>
        Nächste Karte
      </button>
      <br />
      <h1>{call}</h1>
      <br />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {[0, 1, 2].map((inx) => (
          <Tray cards={playedCards.filter((_, i) => i % 3 === inx)} key={inx}></Tray>
        ))}
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
