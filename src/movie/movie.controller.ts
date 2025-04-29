import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie, MovieService } from '@/movie/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query('name') name: string): Movie[] {
    return this.movieService.getMovies(name);
  }

  @Get(':id')
  getMovie(@Param('id') id: number): Movie {
    return this.movieService.getMovie(id);
  }

  @Post()
  createMovie(@Body() movie: Movie): Movie {
    return this.movieService.createMovie(movie);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: number, @Body() movie: Movie): Movie {
    return this.movieService.updateMovie(id, movie);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number): number {
    return this.movieService.deleteMovie(id);
  }
}
