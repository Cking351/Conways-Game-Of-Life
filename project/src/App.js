import React, { useState } from "react";
import "./App.css";
import produce from 'immer';

function App() {
  const numRows = 50;
  const numColumns = 50;
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
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numColumns}, 20px)`
    }}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
            key={`${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
              })
              setGrid(newGrid)
            }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
