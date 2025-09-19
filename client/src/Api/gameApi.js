import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5001/api";

//Function to get list of all Games
export async function getGame() {
  try {
    const res = await fetch(`${BASE_URL}/games`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Game data");
    }
    const data = await res.json();
    return data;
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
