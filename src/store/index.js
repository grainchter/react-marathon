import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user';
import pokemonsReducer from './pokemon';
import pokemons1Reducer from './pokemons1';

export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        pokemons1: pokemons1Reducer,
    }
});