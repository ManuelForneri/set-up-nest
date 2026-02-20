import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword',
  })
  password: string;

  @ApiProperty({
    description: 'The favourite pokemon of the user',
    example: 'Pikachu',
    required: false,
  })
  favouritePokemon: string;

  @ApiProperty({
    description: 'The pokemons of the user',
    example: [1, 4, 7],
  })
  pokemonsIds: number[];
}
