import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <div className="info">
      <br></br>
      <h5>The Rules</h5>
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
        <br></br>
    </div>
  );
};

export default Rules;
