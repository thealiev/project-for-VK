import { Controller, Post, Delete, Param, Get, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':catId')
  async addFavorite(
    @Param('catId') catId: string,
    @Body() body: { userId: string },
  ) {
    const { userId } = body;
    return this.favoritesService.likeCat(catId, userId);
  }

  @Delete(':favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: number) {
    return this.favoritesService.removeFavorite(favoriteId);
  }

  @Get(':userId')
  async getFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(userId);
  }
}
