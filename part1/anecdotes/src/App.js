import React, { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const len = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [arr, setArr] = useState(new Uint8Array(len));

  const handleVote = () => {
    const copy = [...arr];
    copy[selected] += 1;
    setArr(copy);
  };

  const maxVote = () => {
    let max = 0;
    let index = 0;
    for (let i = 0; i < len; i++) {
      if(arr[i] > max){
        max = arr[i];
        index = i;
      }
    }
    return index;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {arr[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(getRandomInt(len))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVote()]}
    </div>
  );
};

export default App;
