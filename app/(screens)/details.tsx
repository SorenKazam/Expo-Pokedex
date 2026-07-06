import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type pokemonProps = {
  id: number;
  height: number;
  weight: number;
  name: string;
  url: string;
  sprites: imageProps;
  image: string;
  imageBack: string;
  types: pokemonType[];
  cries: {
    latest: string;
    legacy: string;
  };
};

type pokemonType = {
  type: {
    name: string;
    url: string;
  };
};

type imageProps = {
  front_default: string;
  back_default: string;
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

export default function Details() {
  // Fetch the params
  const { pokemonUrl } = useLocalSearchParams();

  // Set the pokemon details
  const [pokemon, setPokemonDetails] = useState<pokemonProps | null>(null);

  // When the screen initialize execute this
  useEffect(() => {
    fetchPokemonData();
  }, []);

  // Async func to fetch the data
  async function fetchPokemonData() {
    try {
      const url = Array.isArray(pokemonUrl) ? pokemonUrl[0] : pokemonUrl;
      const res = await fetch(url);
      const data = await res.json();
      setPokemonDetails(data as pokemonProps);
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
      <View
        style={{
          backgroundColor: pokemon
            ? colorsByType[pokemon.types[0].type.name]
            : undefined,
          borderRadius: 20,
          padding: 15,
        }}
      >
        <Text style={styles.name}>{pokemon?.name}</Text>
        <Text style={styles.type}>{pokemon?.types[0].type.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: pokemon?.sprites.front_default }}
            style={styles.image}
          />
          <Image
            source={{ uri: pokemon?.sprites.back_default }}
            style={styles.image}
          />
        </View>
        <Text style={styles.stats}>ID: {pokemon?.id}</Text>
        <Text style={styles.stats}>Heigh: {pokemon?.height}cm</Text>
        <Text style={styles.stats}>weight: {pokemon?.weight}kg</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
  },
  stats: {
    fontSize: 16,
    fontWeight: "black",
    color: "grey",
  },
  image: {
    width: 150,
    height: 150,
  },
});
