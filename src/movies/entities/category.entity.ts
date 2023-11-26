import { Movie } from './movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.id, {
    cascade: true,
  })
  movies?: Movie[];
}
