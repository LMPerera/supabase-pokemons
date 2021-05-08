import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer"


const initialState = {
    user: null,
    pokemon: null,
    pokemons: [],
    isLoggedIn: false,
}

const AppContex = createContext(initialState)


export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const login = (data) => { dispatch({ type: 'LOGIN', payload: data }) }
    const logout = (data) => { dispatch({ type: 'LOGOUT', payload: data }) }
    const getPokemons = (data) => { dispatch({ type: 'GET_POKEMONS', payload: data }) }
    const createPokemon = (data) => { dispatch({ type: 'CREATE_POKEMON', payload: data }) }
    const updatePokemon = (data) => { dispatch({ type: 'UPDATE_POKEMON', payload: data }) }
    const deletePokemon = (data) => { dispatch({ type: 'DELETE_POKEMON', payload: data }) }

    return (
        <AppContex.Provider value={{ ...state, login, logout, getPokemons, createPokemon, updatePokemon, deletePokemon }}>
            {children}
        </AppContex.Provider >
    )
}

export default AppContex;