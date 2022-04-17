import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Notification from "./components/Notification.js";
import Person from "./components/Person.js";
import PersonForm from "./components/PersonForm.js";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [newPara, setNewPara] = useState(null);
  const hook = () => {
    personService.getAll().then((receivedPerson) => setPersons(receivedPerson));
  };
  useEffect(hook, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (event.target.value === "") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };

  const operate = (para, message) => {
    setNewPara(para);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObj(id)
        .then((receivedPerson) => {
          setPersons(persons.filter((p) => p.id !== id));
          const str = `Deleted ${name}`;
          operate(1, str);
        })
        .catch((error) => {
          const str = `Infomation of ${name} has already been removed from server`;
          operate(0, str);
        });
    }
  };
  const newPersons = showAll
    ? persons
    : persons.filter((person) => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase());
      });

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let flag = true;
    let id = 0;
    persons.forEach((e) => {
      if (e.name === newName) {
        flag = false;
        id = e.id;
      }
    });
    if (flag) {
      personService.create(personObject).then((receivedPerson) => {
        setPersons(persons.concat(receivedPerson));
        setNewName("");
        setNewNumber("");
        const str = `Added ${newName}`;
        operate(1, str);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, personObject)
          .then((receivedPerson) => {
            setPersons(persons.map((p) => (p.id !== id ? p : receivedPerson)));
            const str = `Replaced ${newName}`;
            operate(1, str);
          })
          .catch((error) => {
            const str = `Infomation of ${newName} has already been removed from server`;
            operate(0, str);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} par={newPara} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {newPersons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            deleteName={() => deleteName(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
