import { DragEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { COLORS, WIDTH } from "./constants";

function App() {
    const [candies, setCandies] = useState<string[]>([]);
    const [dragging, setDragging] = useState<number>(-1);
    const [dropping, setDropping] = useState<number>(-1);

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
                currentCandies[i] === currentCandies[i + WIDTH * 2] &&
                currentCandies[i] === currentCandies[i + WIDTH * 3]
            ) {
                currentCandies[i] = "";
                currentCandies[i + WIDTH] = "";
                currentCandies[i + WIDTH * 2] = "";
                currentCandies[i + WIDTH * 3] = "";
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
                currentCandies.every((candis, i) => candis === nextCandies[i])
            ) {
                return nextCandies;
            }
            currentCandies = [...nextCandies];
        }
    }, []);

    const preventDefaultBehavior = (e: DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const dragStart = (e: DragEvent<HTMLDivElement>) => {
        setDragging(Number(e.currentTarget.getAttribute("data-id")));
    };
    const dragdrop = (e: DragEvent<HTMLDivElement>) => {
        setDropping(Number(e.currentTarget.getAttribute("data-id")));
    };
    const dragEnd = () => {
        const isNextCell =
            dropping === dragging - 1 ||
            dropping === dragging + 1 ||
            dropping === dragging - WIDTH ||
            dropping === dragging + WIDTH;

        const invalidRightEdge =
            dragging % WIDTH === WIDTH - 1 && dropping === dragging + 1;
        const invalidLeftEdge =
            dragging % WIDTH === 0 && dropping === dragging - 1;
        const valid = isNextCell && !invalidLeftEdge && !invalidRightEdge;

        if (valid) {
            let newCandies = [...candies];
            [newCandies[dragging], newCandies[dropping]] = [
                newCandies[dropping],
                newCandies[dragging],
            ];
            newCandies = checkColum(newCandies);
            newCandies = checkRow(newCandies);

            if (newCandies.filter((x) => !x).length === 0) {
                return;
            } else {
                setCandies(newCandies);
            }
        }
    };

    useEffect(() => {
        let newCandies = createGrid();

        newCandies = removeChains(newCandies);

        setCandies(newCandies);
    }, [removeChains]);

    useEffect(() => {
        setTimeout(() => {
            let newCandies = [...candies];
            newCandies = checkColum(newCandies);
            newCandies = checkRow(newCandies);
            newCandies = moveDown(newCandies);
            if (newCandies.every((candy, index) => candy === candies[index])) {
                return;
            } else {
                setCandies(newCandies);
            }
        }, 100);
    }, [candies]);

    return (
        <div className="app">
            <h1>Gummy Crush</h1>

            <div className="board">
                {candies.map((candy, index) => (
                    <div
                        key={index}
                        className={candy}
                        data-id={index}
                        draggable
                        onDragStart={dragStart}
                        onDragOver={preventDefaultBehavior}
                        onDragEnter={preventDefaultBehavior}
                        onDragLeave={preventDefaultBehavior}
                        onDrop={dragdrop}
                        onDragEnd={dragEnd}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default App;
