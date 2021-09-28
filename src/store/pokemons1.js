import { createSlice } from "@reduxjs/toolkit";
// import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'pokemons1',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        
        getPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        getPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,    
        }),
        getPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
    
});

export const { getPokemons, getPokemonsResolve, getPokemonsReject } = slice.actions;

export const getData = state => state.pokemons1.data;




export default slice.reducer;