const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlQuery = `SELECT * FROM genres ORDER BY name ASC`;
  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    })
});

// Get genres from db by id
router.get("/:id", (req, res) => {
  const sqlQuery = `SELECT  g.name AS genre FROM genres g
  JOIN movies_genres mg ON g.id = mg.genre_id
  JOIN movies m ON m.id = mg.movie_id
  WHERE m.id = $1;
  `;
  const sqlParams = [req.params.id];
  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((error) => {
      console.log(`Error on genre router GET from db: ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;