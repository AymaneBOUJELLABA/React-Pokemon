import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchGenerations from './pokemonAPI';


export const fetchGens = createAsyncThunk(
    'pokemon/fetchGenerations',
    async() => {
        const response = await fetchGenerations();
        return response;
    })

const initialState = {
    gens : [],
    currentGen : '',
    url : 1,
    status : 'idle',
    error : null
}
    
export const generationSlice = createSlice({

    name : 'generation',
    initialState,
    reducers :
    {
        changeGen : (state,action) =>
        {
            state.currentGen = action.payload;
        },

        changeUrl : (state,action) =>
        {
            state.url = action.payload;
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(fetchGens.pending, (state,action) => {
                state.status = 'loading';
            })
            .addCase(fetchGens.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.gens = action.payload;
            })
            .addCase(fetchGens.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});


export const selectCurrentGen = (state) => state.generation.currentGen;
export const selectGens = (state) => state.generation.gens;
export const selectStatus = (state) => state.generation.status;
export const selectError = (state) => state.generation.error;
export const selectUrl = (state) => state.generation.url;
export const {changeGen , changeUrl} = generationSlice.actions;

export default generationSlice.reducer;