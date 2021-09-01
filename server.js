const express = require("express");
const connectDB = require("./DB/connectDB");
const Person = require("./models/person");
const app = express();

// run server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  err
    ? console.log("error :", err)
    : console.log(`The server is running on port ${port}`);
});

// connect DB
connectDB();

//1-Create and Save a Record of a Model:

let Person1 = new Person({
  name: "meryem",
  age: 26,
  favoriteFoods: ["seafood", "frites"],
});

// save
Person1.save((err, data) => {
  err ? console.log("error :", err) : console.log(data);
});

//2-Create Many Records with model.create()
//-a-ArrayOfPeople
const ArrayOfPeople = [
  {
    name: "bella",
    age: 18,
    favoriteFoods: ["Panini", "Pizza"],
  },
  {
    name: "mayar",
    age: 24,
    favoriteFoods: ["Couscous", "Ojja Merguez"],
  },
  {
    name: "youssef",
    age: 30,
    favoriteFoods: ["fruites", "omlette"],
  },
];

//-b-Create several people with Model.create(), using the function argument arrayOfPeople.
Promise.all(
  ArrayOfPeople.map((el) => {
    return Person.create(el).catch((error) => ({ error }));
  })
).then((ArrayOfPeople) => {
  ArrayOfPeople.forEach((el) => {
    if (el.error) {
      console.log("error :", el.error);
    } else {
      console.log(" successfully created");
    }
  });
});
//3-Use model.find() to Search Your Database
//a-Find all the people having a given name, using Model.find() -> [Person] for example: "meryem"

Person.find({ name: "meryem" })
  .then((doc) => {
    console.log("Find all the people named meryem");
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

//4-Use model.findOne() to Return a Single Matching Document from Your Database
//a-Use the function argument food as a search key.
Person.findOne({ favoriteFoods: /seafood/ })
  .then((doc) => {
    console.log("Find a person like eating sea food ");
    console.log(doc);
  })
  .catch((err) => {
    console.error("opps! error no one like it", err);
  });

//5-Use model.findById() to Search Your Database By _id

Person.findById(
  { _id: "6258755qqkjhjgs5q5474dknqh" },

  (err, doc) => {
    err ? console.log("404 not", err) : console.log(" successfully found", doc);
  }
);

//6-Perform Classic Updates by Running Find, Edit, then Save
//Find a person by _id  with the parameter personId as a search key.
//Add "hamburger" to the list of the person's favoriteFoods
//(use Array.push()). Then - inside the find callback - save() the updated Person.
Person.findByIdAndUpdate(
  {
    _id: "6258755qqkjhjgs5q5474dknqh",
  },
  {
    $push: { favoriteFoods: "hamburger" },
  },
  {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    safe: true,
    upsert: false,
  },

  (err) => {
    err ? console.log("update failed with error:", err) : save();
  }
);
//7-Perform New Updates on a Document Using model.findOneAndUpdate()
//Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.

Person.findOneAndUpdate(
  { name: "mayar" },
  { age: 20 },
  {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    overwrite: true,
    safe: true,
    upsert: false,
  },

  (err, doc) => {
    if (err) {
      console.log("error", err);
    }
    {
      console.log("updated congratulations! ", doc);
    }
  }
);
//8 Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove(
  {
    _id: "6258755qqkjhjgs5q5474dknqh",
  },

  (err) => {
    if (err) {
      console.log("errror", err);
    }
    {
      console.log("removed");
      save();
    }
  }
);
//9 MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({ name: "youssef" }, function (err, personFound) {
  if (err) return console.log(err);
  {
    console.log(" remove all persons named youssef ");
    done(null, personFound);
  }
});

//10-Chain Search Query: Find people who like burrito.
//Sort them by name
//limit the results to two documents, and hide their age

var foodToSearch = "fruites";
Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: "meryem" })
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    err ? console.log(err) : console.log("Chain Search Query", data);
  });
