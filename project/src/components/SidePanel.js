import React, { useState } from "react";
import { Button } from 'reactstrap'
import "./SidePanel.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const SidePanel = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [speedDrop, setSpeedDrop] = useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const speedToggle = () => setSpeedDrop((prevState) => !prevState);


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
      <Button className="btn-1" color="secondary"
       disabled={props.running} onClick={() => clear()}>
        Clear Board
      </Button>
      <Button className="btn-2" color="secondary"
      onClick={() => run()}>{props.running ? "Pause" : "Start"}
      </Button>
      <Button className="btn-3" color="secondary" onClick={() => props.random()}>
        Random Selection
      </Button>
      {/* Dropdown for cell color */}
      <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            // disabled={props.running ? true : false}
          >
            <DropdownToggle caret>Cell Color</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => props.setColor("red")}>Red</DropdownItem>
              <DropdownItem onClick={() => props.setColor("pink")}>Pink</DropdownItem>
              <DropdownItem onClick={() => props.setColor("white")}>
                White
              </DropdownItem>
              <DropdownItem onClick={() => props.setColor("orange")}>
                Orange
              </DropdownItem>
              <DropdownItem onClick={() => props.setColor("#39ff14")}>
                Neon Green
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* Dropdown for game speed */}
          <Dropdown isOpen={speedDrop} toggle={speedToggle}>
          <DropdownToggle caret>Game Speed</DropdownToggle>
          <DropdownMenu>
          <DropdownItem
            disabled={props.current === 1000 && props.running ? true : false}
            onClick={() => {
              props.setSpeed(1000);
            }}
          >
            1000ms
          </DropdownItem>
          <DropdownItem
            disabled={props.current === 500 && props.running ? true : false}
            onClick={() => {
              props.setSpeed(500);
            }}
          >
            500ms
          </DropdownItem>
          <DropdownItem
            disabled={props.current === 100 && props.running ? true : false}
            onClick={() => {
              props.setSpeed(100);
            }}
          >
            100ms
          </DropdownItem>
          </DropdownMenu>
          </Dropdown>
          <br></br>
        </div>
  );
};

export default SidePanel;
