import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";
import SidePanel from "./components/SidePanel";
import Rules from "./components/Rules";


// global var for cb function
let generation = 0;

function App() {
  const numRows = 25;
  const numColumns = 25;

  const createGrid = () => {
    // Create our 2D array and fill with zeros
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(createGrid());

  const [color, setColor] = useState("#39ff14");

  const [speed, setSpeed] = useState(100);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  // This represents our eight neighbors, with all possible scenarios
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  // useCallback + produce from immer provides memoization for double buffering.
  const playGame = useCallback(() => {
    if (!runningRef.current) {
      return;
    } else {
      // On every gamerun, our generation count increases by 1
      generation += 1
    }
    // Grid Algo
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        // Loop over rows and columns
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numColumns; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < numRows &&
                newK >= 0 &&
                newK < numColumns
              ) {
                neighbors += g[newI][newK];
              }
            });
            // if our neighbors are out of bounds, they "die"
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
              // If they satisfy the rules of life, they "live"
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(playGame, speedRef.current);
  }, [operations]);

  // Creates our random cell status for game
  const random = () => {
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < numRows; i++) {
        generation = 0;
        rows.push(
          Array.from(Array(numColumns), () => (Math.random() > 0.8 ? 1 : 0))
        );
      }
      return rows;
    });
  };

  // Reset grid to all zeros
  const reset = () => {
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < numRows; i++) {
        generation = 0;
        rows.push(Array.from(Array(numColumns), () => 0));
      }
      return rows;
    });
  };


  return (
    <div className="App">
      <h1 className="App-header">Conway's Game of Life</h1>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numColumns}, 20px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    // If the sim is not running, the board can be clicked. Otherwise it is locked.
                    if (!running) {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    }
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? `${color}` : "black",
                  border: "solid 1px darkslategrey",
                }}
              />
            ))
          )}
        </div>
        <p className="generation">Generation: {generation}</p>
        <SidePanel
          running={running}
          setRunning={setRunning}
          runningRef={runningRef}
          runSim={playGame}
          reset={reset}
          setGrid={setGrid}
          createGrid={createGrid}
          random={random}
          setColor={setColor}
          setSpeed={setSpeed}
          speedRef={speedRef}
        />
      <Rules />
    </div>
  );
}

export default App;
