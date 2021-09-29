import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'pokemons1',
    initialState: {
        isLoading: false,
        data: {},
        data2: {},
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
            data2: {},
            error: action.payload,
        }),
        getPokemons2: state => ({
            ...state,
            isLoading: true,
        }),
        getPokemons2Resolve: (state, action) => ({
            ...state,
            isLoading: false,
            data2: action.payload,
        }),
        getPokemons2Reject: (state, action) => ({
            ...state,
            isLoading: false,
            data2: {},
            error: action.payload,
        }),
    }

});

export const { getPokemons, getPokemonsResolve, getPokemonsReject, getPokemons2, getPokemons2Resolve, getPokemons2Reject } = slice.actions;

export const getData = state => state.pokemons1.data;

export const get2Data = state => state.pokemons1.data2;




export default slice.reducer;