const Movie = require("./movieModel");
const express = require("express");
const app = express.Router();

//fetch all movies
app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).send({ movies });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

//add movies
app.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).send({ message: `Movie Added Successfully`, movie });
  } catch (error) {
    return res.send({ message: "Something went wrong" });
  }
});

//delete movies
app.delete("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const movieItem = await Movie.findById(id);
    if (movieItem) {
      await Movie.findByIdAndDelete(id);
      return res.status(200).send({ message: `Movie deleted successfully` });
    } else {
      return res.send({ message: "Movie does not exist in movie library" });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

//update movies
app.put("/update", async (req, res) => {
  let { id, data } = req.body;
  try {
    let movie = await Movie.findByIdAndUpdate(id, data);
    return res
      .status(200)
      .send({ message: "Movie updated successfully", movie });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

module.exports = app;
