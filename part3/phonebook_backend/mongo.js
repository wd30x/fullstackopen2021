const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name =process.argv[3];
const number =process.argv[4];
const url = `mongodb+srv://wd30x:${password}@cluster0.bdude.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(result);
    console.log(
      `added ${name} number ${number} to phonebook`
    );
    mongoose.connection.close();
  });
} else if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else {
  mongoose.connection.close();
}
