import { useEffect, useState } from "react";
import "./App.css";
import { COLORS, WIDTH } from "./constants";

function App() {
    const [candies, setCandies] = useState<string[]>([]);

    const createGrid = () => {
        const colors: string[] = new Array(WIDTH * WIDTH)
            .fill("")
            .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
        colors[0] = "green";
        colors[8] = "green";
        colors[16] = "green";
        colors[24] = "green";
        colors[32] = "green";

        return colors;
    };

    const checkColum = (currentCandies: string[]) => {
        for (let i = 0; i <= WIDTH * (WIDTH - 4) - 1; i++) {
            if (!currentCandies[i]) continue;

            if (
                currentCandies[i] === currentCandies[i + WIDTH] &&
                currentCandies[i] === currentCandies[i + WIDTH * 2] &&
                currentCandies[i] === currentCandies[i + WIDTH * 3] &&
                currentCandies[i] === currentCandies[i + WIDTH * 4]
            ) {
                currentCandies[i] = "";
                currentCandies[i + WIDTH] = "";
                currentCandies[i + WIDTH * 2] = "";
                currentCandies[i + WIDTH * 3] = "";
                currentCandies[i + WIDTH * 4] = "";
            }
        }
        return currentCandies;
    };

    const removeChains = (currentCandies: string[]) => {
        let nextCandies = [...currentCandies];

        nextCandies = checkColum(nextCandies);

        return nextCandies;
    };

    useEffect(() => {
        let newCandies = createGrid();

        newCandies = removeChains(newCandies);

        setCandies(newCandies);
    }, []);

    return (
        <div className="app">
            <h1>Gummy Crush</h1>

            <div className="board">
                {candies.map((candy, index) => (
                    <div className={candy} key={index}>
                        {index}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
