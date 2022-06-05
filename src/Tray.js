export default function Tray({ cards }) {
  return (
    <ul>
      {cards.map(({ id, tier, farbe }) => (
        <li key={id}>
          {tier} {farbe}
        </li>
      ))}
    </ul>
  );
}
