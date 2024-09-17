import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';
import { Favorite } from './favorites/favorite.entity';
import { CatsModule } from './cats/cats.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'catsdb',
      entities: [Cat, Favorite],
      synchronize: true,
    }),
    CatsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
