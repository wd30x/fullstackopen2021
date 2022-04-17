import React from "react";

const Person = (props) => {
  const label = "delete";
  return (
    <li>
      {props.name} {props.number} <button onClick={props.deleteName}>{label}</button>
    </li>
  );
};

export default Person;
