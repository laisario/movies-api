import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
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
