import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <div className="info">
      <h2>About Conway's Game of Life:</h2>
      <p>
        The Game of Life was created by John Conway in 1970. It is an example of
        a Turing Complete simulation of life.
      </p>
      <h3>The Rules:</h3>
      <ol>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </li>
      </ol>
    </div>
  );
};

export default Rules;
