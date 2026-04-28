import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonIcon } from '@ionic/angular/standalone';
import { ServicesData } from '../services-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonItem, IonButton, FormsModule, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonList, AsyncPipe],
})
export class HomePage {

  movies: any[] = [];
  keyword: string = "";
  constructor(private router: Router, private sd: ServicesData) {}

  async ngOnInit() {
    this.movies = await this.sd.getTrendingMovies();
  }

  async openMovies() {
    await this.sd.set("kw", this.keyword);
    this.router.navigate(['/movies']);
  }

  async isFavourite(movie: any) {
    return await this.sd.isFavourite(movie.id);
  }

  async toggleFavourite(movie: any) {
    if (await this.isFavourite(movie)) {
      this.sd.removeFavourite(movie.id);
    } else {
      this.sd.addFavourite(movie);
    }
  }
}
