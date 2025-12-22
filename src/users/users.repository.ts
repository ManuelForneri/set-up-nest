import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithPokemonDto } from './dto';
import { PokemonClient } from 'src/pokemon/pokemon.client';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private pokemonClient: PokemonClient,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected !== 0;
  }
  async findByIdWithPokemons(id: number): Promise<UserWithPokemonDto> {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User whit ID: ${id} not found`);
    }
    const pokemonsIds = user.pokemonsIds;
    const pokemons =
      await this.pokemonClient.getPokemonDetailsById(pokemonsIds);

    const userWithPokemon = new UserWithPokemonDto({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
    userWithPokemon.pokemons = pokemons || [];

    return userWithPokemon;
  }
}
