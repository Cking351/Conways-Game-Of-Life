import React from "react";

export const SidePanel = (props) => {
  const clear = () => {
      props.setGrid(props.createGrid());
  };
  const run = () => {
    props.setRunning(!props.running);
    if (!props.running) {
      props.runningRef.current = true;
      props.runSim();
    }
  };
  return (
    <div>
      <button disabled={props.running} onClick={() => clear()}>
        Clear Board
      </button>
      <button 
      onClick={() => run()}>{props.running ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default SidePanel;
