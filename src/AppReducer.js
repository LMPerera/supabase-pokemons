const deleteItem = (pokemons, { id }) => {
    return pokemons.filter((pokemon) => pokemon.id !== id)
}

const updateItem = (pokemons, data) => {
    let pokemon = pokemons.find((pokemon) => pokemon.id === data.id);
    let updatedPokemon = { ...pokemon, ...data };
    let pokemonIndex = pokemons.findIndex((pokemon) => pokemon.id === data.id)
    return [
        ...pokemons.slice(0, pokemonIndex),
        updatedPokemon,
        ...pokemons.slice(++pokemonIndex),
    ];
}

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: [action.payload, ...state.pokemons]
            };
        case 'UPDATE_POKEMON':
            return {
                ...state,
                pokemons: updateItem(state.pokemons, action.payload)
            };
        case 'DELETE_POKEMON':
            return {
                ...state,
                pokemons: deleteItem(state.pokemons, action.payload)
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        default:
            return state
    }
}

export default AppReducer