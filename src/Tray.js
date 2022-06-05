export default function Tray({ cards }) {
  return (
    <ul>
      {cards.map(({ id, tier, farbe }) => (
        <li key={id}>
          Tier: {tier}, Farbe: {farbe}
        </li>
      ))}
    </ul>
  );
}
