import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface PokemonDetail {
  id: number;
  name: string;
}

@Injectable()
export class PokemonClient {
  private readonly apiUrl = process.env.POKEMON_API_URL;

  async getPokemonById(id: number): Promise<PokemonDetail | null> {
    try {
      const response = await axios.get<PokemonDetail>(`${this.apiUrl}/${id}`);

      return {
        id: response.data.id,
        name: response.data.name,
      };
    } catch (error) {
      console.error(`Error fetching Pokemon with id ${id}`);
      return null;
    }
  }
  async getPokemonDetailsById(ids: number[]): Promise<PokemonDetail[] | null> {
    const pokemonPromises = ids.map((id) => this.getPokemonById(id));
    const pokemonResults = await Promise.all(pokemonPromises);

    return pokemonResults.filter((pokemon) => pokemon !== null);
  }
}
