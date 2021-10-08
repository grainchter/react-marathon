import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import FirebaseClass from "../service/firebase";

export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true,
        }),
        updateUser: (state, action) => ({
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        })
    }
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLokalID = state => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        };

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCe-Doqgd0OJ3sCSO6HoxzLr7jA9kZ3_4s', requestOptions).then(res => res.json());
        console.log(response);
        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(removeUser());
        } else {
            dispatch(updateUser(response.users[0]));
            console.log(response.users[0]);
        }

    } else {
        dispatch(removeUser());
    }
}

export const getUserAsync = () => (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());

}

export const addPokemonUser = (pokemon) => () => {
    const localId = useSelector(selectLokalID);
    // console.log('kjkfvf', localId);
    // console.log('fkdlfkldf', pokemon);
    FirebaseClass.getNewPokemon(pokemon, localId);
}

export default slice.reducer;