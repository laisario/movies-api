import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  duration: string;

  @Column('text')
  director: string;

  @Column('date')
  release: string;

  @ManyToMany(() => Category, (category) => category.id, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'movie_categories',
    joinColumn: {
      name: 'movie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
