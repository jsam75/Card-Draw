export default function CardView ({ card }) {
    if (!card) {
        return <p>No card drawn yet!</p>;
    }
    return (
        <div>
            <img src={card.image} alt={`{card.value} of {card.suit}`} />
            <p>{card.value} of {card.suit}</p>
        </div>
    );
}