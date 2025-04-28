import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

export interface Movie {
  id?: number;
  name: string;
}

@Controller('movie')
export class AppController {
  private idCounter = 3;
  private movies: Movie[] = [
    {
      id: 1,
      name: 'The Matrix',
    },
    {
      id: 2,
      name: 'The Matrix Reloaded',
    },
    {
      id: 3,
      name: 'The Matrix Revolutions',
    },
  ];

  constructor(private readonly appService: AppService) {}

  @Get()
  public getMovies(@Query('name') name: string): Movie[] {
    if (!name) {
      return this.movies;
    }

    const movies = this.movies.filter((movie) => movie.name.includes(name));

    if (movies.length === 0) {
      throw new NotFoundException('Movie not found');
    }

    return movies;
  }

  @Get(':id')
  public getMovie(@Param('id') id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  @Post()
  public postMovie(@Body() movie: Movie): Movie {
    movie.id = ++this.idCounter;
    this.movies.push(movie);

    return movie;
  }

  @Patch(':id')
  public patchMovie(@Param('id') id: string, @Body() movie: Movie): Movie {
    const movieIndex = this.movies.findIndex((movie) => movie.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('Movie not found');
    }

    this.movies[movieIndex] = { ...this.movies[movieIndex], ...movie };

    return this.movies[movieIndex];
  }

  @Delete(':id')
  public deleteMovie(@Param('id') id: string): number {
    const movieIndex = this.movies.findIndex((movie) => movie.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('Movie not found');
    }

    this.movies.splice(movieIndex, 1);

    return +id;
  }
}
