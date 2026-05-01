import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesData } from '../services-data';
import { CommonModule, NgFor } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, CommonModule, NgFor]
})
export class MoviesPage {

  movies: any[] = [];

  constructor(private sd: ServicesData, private router: Router) {}

  async ngOnInit() {
    const kw = await this.sd.get("kw");
    this.movies = await this.sd.searchMovies(kw);
  }

  openMovie(movie: any) {
    this.router.navigate(['/movie-details', movie.id]);
  }
}