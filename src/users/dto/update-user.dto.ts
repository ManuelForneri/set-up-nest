import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Update username',
  })
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'update@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Update password',
  })
  password?: string;

  @ApiProperty({
    description: 'The pokemons of the user',
    example: [1, 2, 3],
  })
  pokemonsIds?: number[];
}
