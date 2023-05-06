const Movie = require("./movieModel");
const express = require("express");
const app = express.Router();

//fetch all movies
app.get("/", async (req, res) => {
  try {
    let { keyword, sort, orderBy, limit, page } = req.query;

    const query = {};

    if (keyword) {
      query.Title = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (!orderBy) {
      orderBy = "asc";
    }

    if (!limit) {
      limit = 10;
    }

    if (!page) {
      page = 1;
    }

    const movies = await Movie.find(query)
      .sort({ [sort]: orderBy === "asc" ? 1 : orderBy === "desc" ? -1 : 0 })
      .limit(+limit)
      .skip((+page - 1) * limit);

    return res.status(200).send({ movies });
  } catch (error) {
    return res.status(404).send({ message: error });
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

//get single movie
app.get("/single", async (req, res) => {
  try {
    const id = req.query.id;
    const movieItem = await Movie.findById(id);
    if (movieItem) {
      return res.status(200).send({ message: `success`, movieItem });
    } else {
      return res.send({ message: "error" });
    }
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

//update movies
app.put("/update", async (req, res) => {
  let { id, data } = req.body;
  try {
    await Movie.findByIdAndUpdate(id, data);
    let movie = await Movie.findById(id);
    return res
      .status(200)
      .send({ message: "Movie updated successfully", movie });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

module.exports = app;
