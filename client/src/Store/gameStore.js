import { create } from "zustand";
import { getGame, getGameDetails } from "../Api/gameApi.js";

//Creating gamestore state
const useGameStore = create((set, get) => ({
  games: [],
  gameDetails: {},
  loading: {},
  gameDetails: {},

  fetchedGames: async () => {
    if (get().games.length > 0) return;
    set((s) => ({ loading: { ...s.loading, games: true } }));

    try {
      const data = await getGame();
      set((s) => ({ games: data, loading: { ...s.loading, games: false } }));
    } catch (error) {
      console.log(`Error in zustand useGameStore: ${error}`);
      set((s) => ({ loading: { ...s.loading, games: false } }));
    }
  },
  fetchGameDetail: async (id) => {
    const store = get();
    if (store.gameDetails[id]) return store.gameDetails[id];
    set((s) => ({ loading: { ...s.loading, [id]: true } }));

    try {
      const data = await getGameDetails(id);
      set((s) => ({
        gameDetails: { ...s.gameDetails, [id]: data },
        loading: { ...s.loading, [id]: false },
      }));
      return data;
    } catch (err) {
      set((s) => ({ loading: { ...s.loading, [id]: false } }));
      console.error(err);
    }
  },
}));

export default useGameStore;
