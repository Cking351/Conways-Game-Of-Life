import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";
import SidePanel from './components/SidePanel'

function App() {
  const numRows = 25;
  const numColumns = 25;

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


  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return createGrid();
  });

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // Grid Algo
    setGrid((g) => {
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
    setTimeout(runSim, 1000);
  }, [])



  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
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
                  backgroundColor: grid[i][k] ? "black" : undefined,
                  border: "solid 1px black",
                }}
              />
            ))
          )}
        </div>
        <SidePanel running={running} setRunning={setRunning} runningRef={runningRef} runSim={runSim} setGrid={setGrid} createGrid={createGrid}/>
      </div>
    </div>
  );
}

export default App;
