// Pure JavaScript API functions - no imports needed

const BASE_URL = "https://sharika-unchipped-allonymously.ngrok-free.dev/api";

// Common headers for all requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true' // This is crucial for ngrok!
});

//Function to get list of all Games
async function getGame() {
  try {
    const res = await fetch(`${BASE_URL}/games`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!res.ok) {
      throw new Error(`Failed to Fetch Game data: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Games fetched:', data);
    return data.data;
  } catch (error) {
    console.error(`Error While Fetching Game:`, error);
    throw error; // Re-throw so components can handle it
  }
}

//Function to get detail data of the game
async function getGameDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!res.ok) {
      throw new Error(`Failed to Fetch Game details: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Game details:', data.data);
    return data.data;
  } catch (error) {
    console.error(`Error While Fetching Game detail:`, error);
    throw error;
  }
}

//Function to delete particular game
async function deleteGame(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    
    if (!res.ok) {
      throw new Error(`Failed to delete game: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error While Deleting the game:`, error);
    throw error;
  }
}

// Function To get toprated games
async function topRated() {
  try {
    const res = await fetch(`${BASE_URL}/games/top-rated`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!res.ok) {
      throw new Error(`Failed to Fetch Top rated Games: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Top rated games:', data.data);
    return data.data;
  } catch (error) {
    console.error(`Error while Getting top rated game:`, error);
    throw error;
  }
}

// Function to create a new game
async function createGame(gameData) {
  try {
    const res = await fetch(`${BASE_URL}/games`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(gameData)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create game: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Game created:', data);
    return data.data;
  } catch (error) {
    console.error(`Error while creating game:`, error);
    throw error;
  }
}

// Function to update a game
async function updateGame(id, gameData) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(gameData)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update game: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Game updated:', data);
    return data.data;
  } catch (error) {
    console.error(`Error while updating game:`, error);
    throw error;
  }
}

// Enhanced error handling wrapper
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Test function to check API connectivity
async function testConnection() {
  try {
    console.log('Testing API connection...');
    const res = await fetch(`${BASE_URL.replace('/api', '')}/api/health`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ API Connection successful:', data);
      return true;
    } else {
      console.log('❌ API Connection failed:', res.status, res.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ API Connection error:', error);
    return false;
  }
}