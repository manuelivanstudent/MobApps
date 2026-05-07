import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesData } from '../services-data';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, CommonModule, NgFor, NgIf, RouterModule]
})
export class ActorDetailsPage {

  actor: any = null;
  movies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private sd: ServicesData
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actor = await this.sd.getPersonDetails(id);
    this.movies = await this.sd.getPersonMovies(id);
  }

  goBack() {
    this.router.navigate(['/movie-details', this.actor.id]);
  }
}