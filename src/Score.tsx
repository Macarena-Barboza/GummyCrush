interface Score {
    score: number;
}

function Score({ score }: Score) {
    return (
        <div className="score">
            <h2>{score}</h2>
        </div>
    );
}

export default Score;
