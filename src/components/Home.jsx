import { useEffect, useContext } from "react";
import AppContex from "../AppContext"
import { Grid, GridRow, GridColumn } from 'semantic-ui-react'
import PokemonList from "../components/PokemonList";
import PokemonForm from "../components/PokemonForm"


function Home({ supabase }) {
    const { getPokemons, createPokemon, deletePokemon } = useContext(AppContex);

    const alterPokemons = (payload) => {
        switch (payload.eventType) {
            case "INSERT":
                createPokemon(payload.new);
                break;
            case "DELETE":
                deletePokemon(payload.old);
                break;
            case "UPDATE":
                return;
            default:
                createPokemon(payload.new);
        }
    }

    useEffect(() => {
        supabase
            .from('pokemon')
            .select().then(({ data }) => { getPokemons(data) })

        const subscription = supabase
            .from('pokemon')
            .on('*', payload => {
                alterPokemons(payload)
            })
            .subscribe()

        return () => supabase.removeSubscription(subscription)
    }, []);

    return (
        <Grid padded>
            <GridRow>
                <GridColumn width={2}></GridColumn>
                <GridColumn width={12}><PokemonForm supabase={supabase} /></GridColumn>
                <GridColumn width={2}></GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={2}></GridColumn>
                <GridColumn width={12}><PokemonList supabase={supabase}></PokemonList></GridColumn>
                <GridColumn width={2}></GridColumn>
            </GridRow>
        </Grid>
    )
}

export default Home
