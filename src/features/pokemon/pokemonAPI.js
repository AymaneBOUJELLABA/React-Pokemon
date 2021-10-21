export const BASE_URL = "https://pokeapi.co/api/v2/";

export const GEN_URL = "https://pokeapi.co/api/v2/generation";

export default async function fetchGenerations()
{
    const response = await fetch(GEN_URL);

    const json = await response.json();

    return json.results;
}

export async function fetchPokemons(url)
{
    const response = await fetch(GEN_URL +'/'+url);

    const json = await response.json();

    return {
        pokemons : json.pokemon_species,
        games : json.version_groups
    };
}