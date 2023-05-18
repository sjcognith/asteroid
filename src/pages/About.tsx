import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const About = ({ url }: { url: string }) => {
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
  });

  const getPokemon = async (url: string) => {
    try {
      const pokemonUrl = url;
      const result = await axios(pokemonUrl);
      const { name, sprites } = result.data;
      setPokemon({ name, img: sprites.front_default });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon(url);
  }, [url]);

  return (
    <Layout>
      <div data-testid="about">About</div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.img} alt={pokemon.name} className="w-1/2 h-1/2" />
    </Layout>
  );
};

export default About;
