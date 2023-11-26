import { Category } from '../entities/category.entity';

export class CreateMovieDto {
  public title: string;
  public duration: string;
  public director: string;
  public release: string;
  public categories: Category[];
}
