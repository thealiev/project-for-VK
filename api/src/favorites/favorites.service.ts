import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FavoritesService {
  private readonly apiUrl = 'https://api.thecatapi.com/v1';
  private readonly apiKey = process.env.CAT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async likeCat(catId: string, userId: string): Promise<any> {
    const url = `${this.apiUrl}/favourites`;
    const headers = { 'x-api-key': this.apiKey };

    const body = {
      image_id: catId,
      sub_id: userId,
    };

    const request = this.httpService.post(url, body, { headers }).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, error.response.status);
      }),
    );

    return lastValueFrom(request);
  }

  async removeFavorite(favoriteId: number): Promise<any> {
    const url = `${this.apiUrl}/favourites/${favoriteId}`;
    const headers = { 'x-api-key': this.apiKey };

    const request = this.httpService.delete(url, { headers }).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, error.response.status);
      }),
    );

    return lastValueFrom(request);
  }

  async getUserFavorites(userId: string): Promise<any> {
    const url = `${this.apiUrl}/favourites?sub_id=${userId}`;
    const headers = { 'x-api-key': this.apiKey };

    const request = this.httpService.get(url, { headers }).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, error.response.status);
      }),
    );

    return lastValueFrom(request);
  }
}
