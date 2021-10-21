import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchPokemons } from "./pokemonAPI"


const initialState = {
    poks : [],
    games : [],
    status : 'idle',
    error : null
}

export const fetchPoks = createAsyncThunk(
    'pokemon/fetchPoks',
    async (url) => {
        const response = await fetchPokemons(url);
        return response;
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,

    reducers : {
        setChangedStatus : (state) => {
            state.status = 'changed'
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(fetchPoks.pending,(state,action)=>{
                state.status = 'loading';
            })
            .addCase(fetchPoks.fulfilled, (state,action)=>{
                state.poks = action.payload.pokemons;
                state.games = action.payload.games;
                state.status = 'succeeded';
            })
            .addCase(fetchPoks.rejected, (state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectPoks = (state) => state.pokemon.poks;
export const selectGames = (state) => state.pokemon.games;
export const selectStatus = (state) => state.pokemon.status;
export const selectError = (state) => state.pokemon.error;

export const {setChangedStatus} = pokemonSlice.actions;

export default pokemonSlice.reducer;