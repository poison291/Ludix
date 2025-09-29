import { Baseline } from "lucide-react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE + "/api";

//Function to get list of all Games
export async function getGame() {
  console.log(BASE_URL)
  try {
    const res = await fetch(`${BASE_URL}/games`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Game data");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(`Error While Fetching Game: ${error}`);
  }
}



//Function to get detail data of the game

export async function getGameDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`);
    if (!res.ok) {
      throw new Error("Faile to Fetch Game details");
    }
    const data = await res.json();
    console.log(data.data);
    return data.data;

  } catch (error) {
    console.log(`Error While Fetching Game detail: ${error}`);
  }
}


//Function to delete particular game

export async function deleteGame(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete game");
  return res.json();

  } catch (error) {
    console.log(`Error While Deleteing the game: ${error}`)
  }
}

// Function To get toprated games
export async function topRated() {
  try {
    const res = await fetch(`${BASE_URL}/games/top-rated`)
    if (!res.ok) {
      throw new Error("Faile to Fetch Top rated Games");
    }
    const data = await res.json();
    console.log(data.data);
    return data.data;

  } catch (error) {
    console.log(`Erorr while Getting top rated game: ${error}`)
  }
}



