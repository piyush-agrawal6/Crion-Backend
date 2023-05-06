const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    Title: String,
    Year: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Cast: String,
    Synopsis: String,
    Language: String,
    Poster: String,
    imdbRating: String,
  },
  {
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
