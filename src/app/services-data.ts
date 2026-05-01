import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ServicesData {

  private favKey = 'favourites';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async getFavourites() {
    return (await this.storage.get(this.favKey)) || [];
  }

  async isFavourite(id: number) {
    const favs = await this.getFavourites();
    return favs.some((m: any) => m.id === id);
  }

  async addFavourite(movie: any) {
    const favs = await this.getFavourites();
    favs.push(movie);
    await this.storage.set(this.favKey, favs);
  }

  async removeFavourite(id: number) {
    let favs = await this.getFavourites();
    favs = favs.filter((m: any) => m.id !== id);
    await this.storage.set(this.favKey, favs);
  }

  async getTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=705ecf5dcca5df7a47ed180ed178bd52`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }

  async searchMovies(keyword: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&api_key=705ecf5dcca5df7a47ed180ed178bd52`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }

  async getMovieDetails(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=705ecf5dcca5df7a47ed180ed178bd52`;
    const response = await fetch(url);
    return await response.json();
  }

  async getMovieCast(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=705ecf5dcca5df7a47ed180ed178bd52`;
    const response = await fetch(url);
    const data = await response.json();
    return data.cast;
  }
}