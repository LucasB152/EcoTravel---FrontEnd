import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Appeler le service pour obtenir le message
    this.dataService.getPosts().subscribe(
      (response) => {
        this.message = response.message; // Récupère le message depuis la réponse JSON
      },
      (error) => {
        //console.error('Erreur lors de la récupération des données', error);
        this.message = 'Erreur lors de la connexion au serveur';
      }
    );
  }
}
