import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ServicesData } from '../services-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
imports: [ IonButtons, IonIcon, IonItem, IonButton, FormsModule, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonList, NgFor, NgIf],
})
export class HomePage {

  movies: any[] = [];
  keyword: string = "";
  favourites: Set<number> = new Set();

  constructor(private router: Router, private sd: ServicesData) {}

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  async ngOnInit() {
    const favs = await this.sd.getFavourites();
    this.favourites = new Set(favs.map((f: any) => f.id));

    const all = await this.sd.getTrendingMovies();
    this.movies = all.slice(0, 20);
  }

  async openMovies() {
    await this.sd.set("kw", this.keyword);
    this.router.navigate(['/movies']);
  }

  isFavourite(movie: any) {
    return this.favourites.has(movie.id);
  }

  async toggleFavourite(movie: any) {
    if (this.isFavourite(movie)) {
      this.sd.removeFavourite(movie.id);
      this.favourites.delete(movie.id);
    } else {
      this.sd.addFavourite(movie);
      this.favourites.add(movie.id);
    }
  }
}
