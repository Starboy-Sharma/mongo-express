const express   = require("express");
const app       = express();
const mongoose  = require("mongoose");
const cors      = require("cors");


const DB = require("./Database/connection");
const Todos = require("./models/Todos_model");

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => console.log(`Server is jumping on ${PORT}`));



// Middlewaares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
mongoose.set('useFindAndModify', false);

app.get("/", (req, res) => {
  Todos.find()
    .then((todos) => res.json(todos))
    .catch((error) => {
      res.status(400);
      res.json({
        message: error,
      });
    });
});

// Save todo
app.post("/save", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;

  const newTodo = new Todos({
    username,
    title,
  });

  //save data in mongo
  newTodo
    .save()
    .then((todo) => {
      res.status(200);
      res.json({ message: "Todo add successfully!", todo: todo });
    })
    .catch((err) => {
      console.error(err);
      res.status(400);
      res.json({ message: "Error in save todo.", error: err });
    });
});

// Find todo by id
app.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    Todos.findById(id)
      .then((users) => res.json(users))
      .catch((error) => {
        res.status(400);

        // Simplify error message
        let errMsg = "Error";
        if (error.name === "CastError") {
          errMsg = "Todo id is not valid";
        }

        res.json({ message: errMsg, error: error });
        console.error(error);
      });
  } catch (error) {
    res.status(400);
    res.json({ message: "Unable to find todo", error: error });
    console.error(error);
  }
});

// Update todo and set completed to true
app.post("/complete", (req, res) => {
  try {
    const id = req.body.id;
    const todoComplete = { completed: req.body.completed };

    // Update query
    
    Todos.findOneAndUpdate(todoComplete, {completed: true}, {upsert: true}, function (err, doc) {

      if (err) return res.send(400, {error: err});
        res.send('Succesfully saved.').end();
    });

  } catch (error) {
    throw error;
  }
});

// Delete todo by id
app.post("/delete", (req, res) => {
  try {
    const id = req.body.id;

    Todos.findByIdAndDelete(id)
      .then(() =>
        res.json({ status: true, message: "Todo delete successfully!" })
      )
      .catch((error) => {
        // Simplify error message
        let errMsg = "Error";
        if (error.name === "CastError") {
          errMsg = "Todo id is not valid";
        }

        res.json({ message: errMsg, error: error });
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
});
