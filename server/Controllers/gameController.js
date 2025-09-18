import { sql } from "../config/db.js";

// Getting All games from DB
export const getGames = async (req, res) => {
  try {
    const game = await sql`
      SELECT * FROM games
      ORDER BY created_at ASC 
      `;
    console.log(`fetched Games: ${game}`);
    res.status(200).json({ success: true, data: game });
  } catch (error) {
    console.log(`Error while Getting games ${error}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Posting a Game to the DB
export const createGames = async (req, res) => {
  const { title, price, image } = req.body;

  if (!title || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const newGames = await sql`
      INSERT INTO games (title, price, image)
      VALUES (${title}, ${price}, ${image})
      RETURNING *
      `;
    console.log(`New Games Added: ${newGames}`);
    res.status(200).json({ success: true, data: newGames[0] });
  } catch (error) {
    console.log(`Failed while Adding a Game in CreateGame Function: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

//Getting single Game
export const getGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await sql`
      SELECT * FROM games WHERE id = ${id}
    `;
    res.status(200).json({ success: true, data: game[0] });
  } catch (error) {
    console.log(`Error in getGame function: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

//Updating single Game Data
export const updateGames = async (req, res) => {
  const { id } = req.params;
  const { title, price, image } = req.body;

  try {
    const updatedGame = await sql`
    UPDATE games
    SET title=${title}, price=${price}, image=${image}
    WHERE id=${id}
    RETURNING *
    `;
    if (updateGames.length === 0) {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }
    res.status(200).json({ success: true, data: updateGames[0] });
  } catch (error) {
    console.log(`Error in update game function: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Deleting product
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGame = await sql`
    DELETE FROM games WHERE id=${id}
    RETURNING *
    `;
    if (deleteGame.length === 0) {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }
    res.status(200).json({ success: true, data: deleteGame[0] });
  } catch (error) {
    console.log(`Error in delete game function: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
