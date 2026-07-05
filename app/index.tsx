import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type pokemonProps = {
  name: string;
  url: string;
  image: string;
  imageBack: string;
  types: pokemonType[];
};

type pokemonType = {
  type: {
    name: string;
    url: string;
  };
};

const colorsByType: Record<string, string> = {
  normal: "#E2E2D0",
  fire: "#FFB3A7",
  water: "#A9D5FA",
  grass: "#C1E7C4",
  electric: "#FFF1A1",
  ice: "#C4FAF6",
  fighting: "#E8B2B2",
  poison: "#E1BEE7",
  ground: "#F3E5AB",
  flying: "#D3C5E5",
  psychic: "#FFC5D9",
  bug: "#D6E9C6",
  rock: "#E0D7C1",
  ghost: "#C7B8E9",
  dragon: "#BCB1F1",
  dark: "#A39E9E",
  steel: "#D2D7DF",
  fairy: "#FBC7DF",
  stellar: "#D1F2E5",
};

export default function Index() {
  const pokemonApi = "https://pokeapi.co/api/v2/pokemon?limit=150";
  const [pokemons, setPokemons] = useState<pokemonProps[]>([]);

  useEffect(() => {
    // Fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      // Fetch pokemons
      const response = await fetch(pokemonApi);
      const data = await response.json();

      // Fetch detailed info for each Pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: pokemonProps) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, // Main sprite
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );
      setPokemons(detailedPokemons);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 10,
      }}
    >
      {pokemons.map((pokemon) => (
        <View
          key={pokemon.name}
          style={{
            backgroundColor: colorsByType[pokemon.types[0].type.name],
          }}
        >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            <Image source={{ uri: pokemon.imageBack }} style={styles.image} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  type: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
  image: {
    width: 150,
    height: 150,
  },
});
