
import { useContext } from "react";
import AppContex from "../AppContext"
import { List, ListItem, ListIcon, ListContent, ListHeader, ListDescription, Segment } from 'semantic-ui-react'

function Row({ id, name, power, description, selectPokemon, deletePokemon }) {
    return (
        <ListItem>
            <ListIcon name="trash alternate outline" onClick={() => deletePokemon(id)}></ListIcon>
            <ListContent onClick={() => selectPokemon({ id, name, power, description })}>
                <ListHeader as="h3">{name}</ListHeader>
                <ListHeader as="h5">{power}</ListHeader>
                <ListDescription>{description}</ListDescription>
            </ListContent>
        </ListItem>
    )
}

function PokemonList({ supabase }) {

    const { pokemons, selectPokemon } = useContext(AppContex)

    const deletePokemon = async (id) => {
        await supabase
            .from('pokemon')
            .delete().match({ id: id })
    }

    return (
        <Segment>
            <List>
                {pokemons && pokemons.map((pokemon) => {
                    return <Row key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        power={pokemon.power}
                        selectPokemon={selectPokemon}
                        deletePokemon={deletePokemon}
                        description={pokemon.description}></Row>
                })}
            </List>
        </Segment>
    )
}

export default PokemonList
