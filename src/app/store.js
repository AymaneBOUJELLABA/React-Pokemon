import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import generationReducer from '../features/pokemon/generationSlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    generation: generationReducer,
    pokemon : pokemonReducer
  },
});
