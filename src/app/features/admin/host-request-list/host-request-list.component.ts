import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../core/services/request.service';
import {Request} from '../../../core/models/Request';

@Component({
  selector: 'app-host-request-list',
  templateUrl: './host-request-list.component.html',
  styleUrl: './host-request-list.component.scss'
})
export class HostRequestListComponent implements OnInit {
  requests: Request[] = [];
  selectedRequest: Request | null = null;

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.requests = [
      {
        fullName: 'Alice Dupont',
        email: 'alice.dupont@example.com',
        phone: '+33612345678',
        status: 'PENDING',
        company: 'Eco Hosting',
        identifier: 'REQ12345',
        website: 'https://www.ecohosting.com',
        services: ['Web Hosting', 'Cloud Storage'],
        description: 'Demande pour héberger des sites éco-responsables.',
        certifications: [],
        motivation: 'Je souhaite contribuer à un hébergement plus écologique.',
        terms: true
      },
      {
        fullName: 'Jean Martin',
        email: 'jean.martin@example.com',
        phone: '+33698765432',
        status: 'PENDING',
        company: 'GreenHost',
        identifier: 'REQ67890',
        website: 'https://www.greenhost.com',
        services: ['Web Hosting'],
        description: 'Une plateforme verte pour un avenir durable.',
        certifications: [],
        motivation: 'Promouvoir des solutions cloud écologiques.',
        terms: true
      },
      {
        fullName: 'Sophie Leroy',
        email: 'sophie.leroy@example.com',
        phone: '+33654321987',
        status: 'ACCEPTED',
        company: 'PlanetHost',
        identifier: 'REQ24680',
        website: 'https://www.planethost.com',
        services: ['Cloud Storage'],
        description: 'Des services cloud respectueux de l’environnement.',
        certifications: [],
        motivation: 'Soutenir la transition numérique durable.',
        terms: true
      }
    ];
  }
    // this.requestService.getRequests().subscribe((data) => {
    //   this.requests = data;
    // })
  // }

  selectRequest(request: Request) {
    this.selectedRequest = request;
  }

  updateStatus(status: string) {
    if (this.selectedRequest) {
      const id = this.selectedRequest.identifier || ''; // Remplacez par le champ identifiant unique
      this.requestService.updateRequestStatus(id, status).subscribe(
        () => {
          this.selectedRequest!.status = status; // Met à jour localement
          this.selectedRequest = null; // Retour à la liste
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut :', error);
        }
      );
    }
  }


}
