import { useState, useEffect } from "react"
import { Form, FormField, Header, Input, Button, Segment } from 'semantic-ui-react'

const initState = { name: '', power: '', description: '' }

function PokemonForm({ supabase }) {
    const [pokemon, setPokemon] = useState(initState);

    const createPokemon = async ({ name, power, description }) => {
        try {
            await supabase
                .from('pokemon')
                .insert([
                    { name, power, description }
                ]);
        } catch (error) {

        } finally {
            clear();
        }
    }

    const updatePokemon = async ({ id, name, power, description }) => {
        try {
            await supabase
                .from('pokemon')
                .update([
                    { name, power, description }
                ]).match({ id: id })
        } catch (error) {

        } finally {
            clear();
        }
    }

    const onChange = (type, value) => {
        setPokemon({ ...pokemon, [type]: value })
    }

    const clear = () => {
        setPokemon(initState)
    }

    return (
        <Segment>
            <Form>
                <FormField>
                    <Header as="h5">Name</Header>
                    <Input value={pokemon.name} onChange={(e, { value }) => onChange('name', value)} />
                </FormField>
                <FormField>
                    <Header as="h5">Power</Header>
                    <Input value={pokemon.power} onChange={(e, { value }) => onChange('power', value)} />
                </FormField>
                <FormField>
                    <Header as="h5">Description</Header>
                    <Input value={pokemon.description} onChange={(e, { value }) => onChange('description', value)} />
                </FormField>
                <Button onClick={() => createPokemon(pokemon)}>Save</Button>
            </Form>
        </Segment>
    )
}

export default PokemonForm
