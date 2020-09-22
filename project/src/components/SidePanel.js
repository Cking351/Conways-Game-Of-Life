import React from "react";
import { Button } from 'reactstrap'
import "./SidePanel.css";

export const SidePanel = (props) => {
  const clear = () => {
      props.reset()
  };
  const run = () => {
    props.setRunning(!props.running);
    if (!props.running) {
      props.runningRef.current = true;
      props.runSim();
    }
  };
  return (
    <div className="sidePanel">
      <Button className="btn-1" color="primary"
       disabled={props.running} onClick={() => clear()}>
        Clear Board
      </Button>
      <Button className="btn-2" color="primary"
      onClick={() => run()}>{props.running ? "Pause" : "Start"}
      </Button>
      <Button className="btn-3" color="primary" onClick={() => props.random()}>
        Random Selection
      </Button>
    </div>
  );
};

export default SidePanel;
