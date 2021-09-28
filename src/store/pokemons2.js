import { createSlice } from "@reduxjs/toolkit";
// import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'pokemons2',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        
        getPokemons2: state => ({
            ...state,
            isLoading: true,
        }),
        getPokemons2Data: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,    
        }),
        getPokemons2Reject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
    
});

export const { getPokemons2, getPokemons2Data, getPokemons2Reject } = slice.actions;

export const get2Data = state => state.pokemons2.data;


export default slice.reducer;