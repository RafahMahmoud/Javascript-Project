import {
  retrieveData,
  addData,
  database,
  reference,
  query,
} from "../../../Firebase-config/firebase-config.js";

function makeReview(review, movie) {
  let movieRef = reference(database, "Movies/" + movie.id);

  movie.reviews.push(review);

  addData(movieRef, movie);
}


export {makeReview};