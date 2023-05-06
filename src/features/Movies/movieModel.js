const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    Title: String,
    Year: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    BoxOffice: String,
    Response: String,
  },
  {
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
