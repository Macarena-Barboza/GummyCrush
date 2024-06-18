import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { COLORS, WIDTH } from "./constants";

function App() {
    const [candies, setCandies] = useState<string[]>([]);

    const createGrid = () => {
        const colors: string[] = new Array(WIDTH * WIDTH)
            .fill("")
            .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);

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

        for (let i = 0; i <= WIDTH * (WIDTH - 3) - 1; i++) {
            if (!currentCandies[i]) continue;

            if (
                currentCandies[i] === currentCandies[i + WIDTH] &&
                currentCandies[i] === currentCandies[i + WIDTH * 2]
            ) {
                currentCandies[i] = "";
                currentCandies[i + WIDTH] = "";
                currentCandies[i + WIDTH * 2] = "";
            }
        }
        return currentCandies;
    };

    const checkRow = (currentCandies: string[]) => {
        for (let i = 0; i <= WIDTH * WIDTH - 5; i++) {
            if ((i % WIDTH) + 5 > WIDTH) continue;

            if (
                currentCandies[i] === currentCandies[i + 1] &&
                currentCandies[i] === currentCandies[i + 2] &&
                currentCandies[i] === currentCandies[i + 3] &&
                currentCandies[i] === currentCandies[i + 4]
            ) {
                currentCandies[i] = "";
                currentCandies[i + 1] = "";
                currentCandies[i + 2] = "";
                currentCandies[i + 3] = "";
                currentCandies[i + 4] = "";
            }
        }

        for (let i = 0; i <= WIDTH * WIDTH - 4; i++) {
            if ((i % WIDTH) + 5 > WIDTH) continue;

            if (
                currentCandies[i] === currentCandies[i + 1] &&
                currentCandies[i] === currentCandies[i + 2] &&
                currentCandies[i] === currentCandies[i + 3]
            ) {
                currentCandies[i] = "";
                currentCandies[i + 1] = "";
                currentCandies[i + 2] = "";
                currentCandies[i + 3] = "";
            }
        }

        for (let i = 0; i <= WIDTH * WIDTH - 3; i++) {
            if ((i % WIDTH) + 5 > WIDTH) continue;

            if (
                currentCandies[i] === currentCandies[i + 1] &&
                currentCandies[i] === currentCandies[i + 2]
            ) {
                currentCandies[i] = "";
                currentCandies[i + 1] = "";
                currentCandies[i + 2] = "";
            }
        }
        return currentCandies;
    };

    const moveDown = (currentCandies: string[]) => {
        for (let i = 0; i <= WIDTH * WIDTH; i++) {
            const isFirtRow = i < WIDTH;
            if (isFirtRow && currentCandies[i] === "") {
                currentCandies[i] =
                    COLORS[Math.floor(Math.random() * COLORS.length)];
            }

            if (currentCandies[i + WIDTH] === "") {
                currentCandies[i + WIDTH] = currentCandies[i];
                currentCandies[i] = "";
            }
        }
        return currentCandies;
    };

    const removeChains = useCallback((currentCandies: string[]) => {
        while (true) {
            let nextCandies = [...currentCandies];

            nextCandies = checkColum(nextCandies);

            nextCandies = checkRow(nextCandies);

            nextCandies = moveDown(nextCandies);

            if (
                currentCandies.every((candies, i) => candies === nextCandies[i])
            ) {
                return nextCandies;
            }
            currentCandies = [...nextCandies];
        }
    }, []);

    useEffect(() => {
        let newCandies = createGrid();

        newCandies = removeChains(newCandies);

        setCandies(newCandies);
    }, [removeChains]);

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
