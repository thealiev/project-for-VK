import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [HttpModule],
  controllers: [CatsController, FavoritesController],
  providers: [CatsService, FavoritesService],
})
export class AppModule {}
