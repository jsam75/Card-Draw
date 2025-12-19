export default function Controls({
    onDraw,
    onShuffle,
    drawDisabled,
    shuffleDisabled,
}) {
    return (
        <div>
            <button onClick={onDraw} disabled={drawDisabled}>
            Draw </button>

            <button onClick={onShuffle} disabled={shuffleDisabled}>
            Shuffle </button>
        </div>
    );
}