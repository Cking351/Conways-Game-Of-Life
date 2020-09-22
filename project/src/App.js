import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";
import SidePanel from './components/SidePanel';
import Rules from './components/Rules';
import { Dropdown } from "reactstrap";

// global var for cb function
let generation = 0;

function App() {
  const numRows = 25;
  const numColumns = 25;

  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(createGrid());

  const [speed, setSpeed] = useState(250)
  const speedRef = useRef(speed)
  speedRef.current = speed

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  // This represents our eight neighbors
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ]

  


  const playGame = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // Grid Algo
    setGrid((g) => {
      generation += 1 / 2
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numColumns; k++) {
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numColumns) {
                neighbors += g[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })
    setTimeout(playGame, speedRef.current);
  }, [operations])

  const random = () => {
    setGrid(() => {
      const rows = []
      for (let i = 0; i < numRows; i++) {
        generation = 0
        rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.8 ? 1 : 0)))
      }
      return rows;
    })
  }

  const reset = () => {
    setGrid(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        generation = 0;
        rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
    })
}

  return (
    <div className="App">
      <h1 className="App-header">Conway's Game of Life</h1>
      <div>
        <div className="grid"
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
                  backgroundColor: grid[i][k] ? "#39FF14" : "black",
                  border: "solid 2px #689d6a",
                }}
              />
            ))
          )}
        </div>
        <p className="generation">Generation: {generation}</p>
        <SidePanel running={running} setRunning={setRunning} 
        runningRef={runningRef} runSim={playGame} reset={reset}
        setGrid={setGrid} createGrid={createGrid} random={random} />
        <div>
          <h3>Change Speed</h3>
            <button disabled={speedRef.current === 1000 && running ? true : false} onClick={() => {setSpeed(1000)}}>1000ms</button>
            <button disabled={speedRef.current === 500 && running ? true : false} onClick={() => {setSpeed(500)}}>500ms</button>
            <button disabled={speedRef.current === 100 && running ? true : false} onClick={() => {setSpeed(100)}}>100ms</button>

        </div>
      </div>
      <Rules />
    </div>
  );
}

export default App;
