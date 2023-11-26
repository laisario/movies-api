import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/movies/entities/category.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async getCategory(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto) {
    const categories = [];
    for (const i in createMovieDto.categories) {
      const category = await this.getCategory(createMovieDto.categories[i].id);

      if (!category) {
        throw new NotFoundException();
      }
      categories.push(category);
    }
    console.log('>>>>>>>>>>>>>>>', categories);
    const movie = new Movie();
    movie.categories = [...categories];
    movie.director = createMovieDto.director;
    movie.duration = createMovieDto.duration;
    movie.release = createMovieDto.release;
    movie.title = createMovieDto.title;
    return await this.movieRepository.save(movie);
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const toUpdate = await this.movieRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updateMovieDto);

    return await this.movieRepository.save(updated);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id);
  }
}
