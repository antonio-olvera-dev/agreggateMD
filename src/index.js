import mongoose from "mongoose";
const { Schema } = mongoose;

const Person = new Schema({
  name: String,
  age: Number,
  height: Number,
});
const person = mongoose.model("Person", Person);

const Pet = new Schema({
  name: String,
  weight: Number
});
const pet = mongoose.model("Pet", Pet);

async function create(name, num) {
  await mongoose.connect("mongodb://localhost:27017/humanos", {
    useNewUrlParser: true,
  });
  const newPerson = await person.create({
    name: `${name}`,
    age: num,
    height: 1.83 * num,
  });

  const newPet = await pet.create({
    name: `Gato ${name}`,
    weight: num*1.12
  });
  newPet.save();
}
// for (let i = 0; i < 300; i++) {
//     create(`Ant${i}`,i);
// }

//---Find all values that are greater than 100 and less than 150 in the "age" field---
async function get1() {
  try {
    await mongoose.connect("mongodb://localhost:27017/humanos", {
      useNewUrlParser: true,
    });
    const data = await person.aggregate([
      {
        $match: { age: { $gt: 100 } },
      },
      {
        $match: { age: { $lt: 150 } },
      },
    ]);
    console.log(data);
    console.log(data.length);
  } catch (error) {
    console.log(error);
  }
}
// get1();

//---Finds all values that are greater than 100 and less than 150 in the "age" field and returns only the names---
async function get2() {
  try {
    await mongoose.connect("mongodb://localhost:27017/humanos", {
      useNewUrlParser: true,
    });
    const data = await person.aggregate([
      {
        $match: { age: { $gt: 100 } },
      },
      {
        $match: { age: { $lt: 150 } },
      },
      {
        $group: { _id: "$name" },
      },
    ]);
    console.log(data);
    console.log(data.length);
  } catch (error) {
    console.log(error);
  }
}
// get2();

//---Find all the values that are greater than 100 and less than 150 in the "age" field and returns only the names and ages---
async function get3() {
  try {
    await mongoose.connect("mongodb://localhost:27017/humanos", {
      useNewUrlParser: true,
    });
    const data = await person.aggregate([
      {
        $match: { age: { $gt: 100 } },
      },
      {
        $match: { age: { $lt: 150 } },
      },
      {
        $group: { _id: { name: "$name", age: "$age" } },
      },
    ]);
    console.log(data);
    console.log(data.length);
  } catch (error) {
    console.log(error);
  }
}
// get3();


