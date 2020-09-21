import React from "react";

export const SidePanel = (props) => {
  const clear = () => {
    props.setGrid(props.createGrid())
  };
  const run = () => {
    props.setRunning(!props.running);
    if (!props.running) {
      props.runningRef.current = true;
      props.runSim();
    }
  }
  return (
    <div>
      <button onClick={() => clear()}>Clear Board</button>
      <button onClick={() => run()}>
        {props.running ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default SidePanel;
