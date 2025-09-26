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
  const {
    title,
    price,
    image,
    categories,
    description,
    stock,
    visible,
    platforms,
    tags,
    release_date,
    developer,
    publisher,
    rating,
  } = req.body;

  if (
    !title ||
    !price ||
    !image ||
    !categories ||
    !description ||
    !platforms ||
    !tags ||
    !release_date ||
    !developer ||
    !publisher ||
    !rating
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const newGames = await sql`
      INSERT INTO games (title, price, image, categories, description, stock, visible, platforms, tags, release_date, developer, publisher, rating)
      VALUES (${title}, ${price}, ${image}, ${categories}, ${description}, ${stock}, ${visible}, ${platforms}, ${tags}, ${release_date}, ${developer}, ${publisher}, ${rating})
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
  const updates = req.body;

  try {
    const existingGame = await sql`
      SELECT * FROM games WHERE id=${id}
    `;

    if (existingGame.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    const currentGame = existingGame[0];
    const updatedData = {
      title: updates.title ?? currentGame.title,
      price: updates.price ?? currentGame.price,
      image: updates.image ?? currentGame.image,
      categories: updates.categories ?? currentGame.categories,
      description: updates.description ?? currentGame.description,
      stock: updates.stock ?? currentGame.stock,
      visible: updates.visible ?? currentGame.visible,
      platforms: updates.platforms ?? currentGame.platforms,
      tags: updates.tags ?? currentGame.tags,
      release_date: updates.release_date ?? currentGame.release_date,
      developer: updates.developer ?? currentGame.developer,
      publisher: updates.publisher ?? currentGame.publisher,
      rating: updates.rating ?? currentGame.rating,
    };

    const updateGame = await sql`
      UPDATE games
      SET title=${updatedData.title}, 
          price=${updatedData.price}, 
          image=${updatedData.image}, 
          categories=${updatedData.categories}, 
          description=${updatedData.description}, 
          stock=${updatedData.stock}, 
          visible=${updatedData.visible}, 
          platforms=${updatedData.platforms}, 
          tags=${updatedData.tags}, 
          release_date=${updatedData.release_date}, 
          developer=${updatedData.developer}, 
          publisher=${updatedData.publisher}, 
          rating=${updatedData.rating}
      WHERE id=${id}
      RETURNING *
    `;

    res.status(200).json({ success: true, data: updateGame[0] });
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


//Get Top rated Games
export const topRated =async (req, res) => {
  try {
    const game = await sql`SELECT title, rating FROM games 
    ORDER BY rating DESC LIMIT 20;`
    
    console.log(`fetched Games: ${game}`);
    res.status(200).json({ success: true, data: game });
  } catch (error) {
    console.log(`Error while getting top rated game: ${error}`)
    res.status(500).json({success: false, message: "Internal server Error"})
  }
}