import React from "react";

const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    );
  };
  
  const Header = (props) => {
    return (
      <>
        <h2>{props.course.name}</h2>
      </>
    );
  };
  
  const Content = (props) => {
    return (
      <>
        {props.course.parts.map((parts) => (
          <Part key={parts.id} part={parts.name} exercises={parts.exercises} />
        ))}
      </>
    );
  };
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    );
  };
  
  const Total = ({ course }) => {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const exercises = course.parts.map((parts) => parts.exercises);
    return (
      <>
        <p>Total of {exercises.reduce(reducer)} exercises</p>
      </>
    );
  };

  export default Course;