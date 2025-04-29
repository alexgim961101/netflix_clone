import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '@/movie/movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });
});
