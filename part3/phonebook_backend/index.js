require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
const Person = require("./models/person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person.deleteOne({ id: `${id}` }).then(() => {
    res.status(204).end();
  });
});

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

morgan.format(
  "json",
  ":method :url :status :res[content-length] - :response-time ms :data"
);
app.use(morgan("json"));

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!(body.name && body.number)) {
    return res.status(404).json({
      error: "name or number missing",
    });
  }
  // Person.find({ name: `${body.name}` }).then(() => {
  //   res.status(404).json({ error: "name must be unique" });
  // });

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  console.log(body.number)
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
