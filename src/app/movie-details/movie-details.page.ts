import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesData } from '../services-data';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, CommonModule, NgFor, NgIf, FormsModule]
})
export class MovieDetailsPage {

  movie: any = null;
  cast: any[] = [];
  isFavourite = false;

  constructor(private route: ActivatedRoute, private router: Router, private sd: ServicesData) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = await this.sd.getMovieDetails(id);
    this.cast = await this.sd.getMovieCast(id);
    const favs = await this.sd.getFavourites();
    this.isFavourite = favs.some((f: any) => f.id === id);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  async toggleFavourite() {
    if (this.isFavourite) {
      this.sd.removeFavourite(this.movie.id);
      this.isFavourite = false;
    } else {
      this.sd.addFavourite(this.movie);
      this.isFavourite = true;
    }
  }

  openPerson(id: number) {
    this.router.navigate(['/actor-details', id]);
  }

  openActor(id: number) {
    this.router.navigate(['/actor-details', id]);
  }
}