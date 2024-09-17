import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(@Query('limit') limit: number) {
    return this.catsService.getCats(limit);
  }

  @Post('like')
  async likeCat(
    @Body('imageId') imageId: string,
    @Body('userId') userId: string,
  ) {
    return this.catsService.likeCat(imageId, userId);
  }

  @Get('favorites/:userId')
  async getUserFavorites(@Param('userId') userId: string) {
    return this.catsService.getUserFavorites(userId);
  }

  @Delete('favorites/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: number) {
    return this.catsService.removeFavorite(favoriteId);
  }
}
