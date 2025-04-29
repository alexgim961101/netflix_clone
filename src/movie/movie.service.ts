import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id?: number;
  name: string;
}

@Injectable()
export class MovieService {
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

  getMovies(name: string): Movie[] {
    if (!name) {
      return this.movies;
    }

    const movies = this.movies.filter((movie) => movie.name.includes(name));

    if (movies.length === 0) {
      throw new NotFoundException('Movie not found');
    }

    return movies;
  }

  getMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  createMovie(movie: Movie): Movie {
    this.idCounter++;
    movie.id = this.idCounter;
    this.movies.push(movie);
    return movie;
  }

  updateMovie(id: number, movie: Movie): Movie {
    const index = this.movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      throw new NotFoundException('Movie not found');
    }

    this.movies[index] = movie;
    return movie;
  }

  deleteMovie(id: number): number {
    const index = this.movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      throw new NotFoundException('Movie not found');
    }

    this.movies.splice(index, 1);
    return id;
  }
}
