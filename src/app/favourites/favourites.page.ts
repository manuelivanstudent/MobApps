import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ServicesData } from '../services-data';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail, CommonModule, NgFor, NgIf]
})
export class FavouritesPage {

  favourites: any[] = [];

  constructor(private sd: ServicesData, private router: Router) {}

  async ionViewWillEnter() {
    this.favourites = await this.sd.getFavourites();
  }

  openMovie(movie: any) {
    this.router.navigate(['/movie-details', movie.id], { state: { movie } });
  }

  async remove(id: number) {
    await this.sd.removeFavourite(id);
    this.favourites = await this.sd.getFavourites();
  }
}
