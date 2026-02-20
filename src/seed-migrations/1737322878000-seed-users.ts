import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1737322878000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "users" ("username", "email", "password", "pokemonsIds", "favouritePokemon")
      VALUES
        ('john_doe', 'john.doe@example.com', '$2a$10$XqWYVzQVJzJZqJZqJZqJZO', ARRAY[1, 4, 7], 'Charizard'),
        ('jane_smith', 'jane.smith@example.com', '$2a$10$YrWZVaQWKaKZrKZrKZrKZP', ARRAY[25, 133, 151], 'Pikachu'),
        ('bob_jones', 'bob.jones@example.com', '$2a$10$ZsWAVbQXLbLZsLZsLZsLZQ', ARRAY[6, 9, 143], 'Blastoise')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "users"
      WHERE "email" IN (
        'john.doe@example.com',
        'jane.smith@example.com',
        'bob.jones@example.com'
      )
    `);
  }
}
