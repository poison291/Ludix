import {create} from "zustand"
import {getGame, gameDetails} from "../Api/gameApi.js"

//Creating gamestore state
const useGameStore = ((set, get) => ({
    games: [],
    gameDetails: {},
    loading: {},
    fetchedGames: async () => {
        if(get().games.length> 0 ) return;
        set((s) => ({loading: {...s.loading, games:true}}))
    }
}))

