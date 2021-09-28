import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from './pokemon';
import pokemons1Reducer from './pokemons1';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemons1: pokemons1Reducer,
    }
});