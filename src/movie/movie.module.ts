import { Module } from '@nestjs/common';
import { MovieController } from '@/movie/movie.controller';
import { MovieService } from '@/movie/movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
