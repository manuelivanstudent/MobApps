import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';
import { ServicesData } from '../services-data';
  
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonCardContent]
})
export class MoviesPage implements OnInit {

  keyword: string = "";

  constructor(private sd: ServicesData) { }

  ngOnInit() {
    this.getkW();
  }

  async getkW() {
   this.keyword = await this.sd.get('kw');
  }

}
