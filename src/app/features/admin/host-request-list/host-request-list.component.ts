import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../core/services/request.service';
import {Request} from '../../../core/models/Request';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-host-request-list',
  templateUrl: './host-request-list.component.html',
  styleUrl: './host-request-list.component.scss'
})
export class HostRequestListComponent implements OnInit {
  requests$: Observable<Request[]> = of([]);
  selectedRequest: Request | null = null;

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.requests$ = this.requestService.getRequests();
  }

  selectRequest(request: Request) {
    this.selectedRequest = request;
  }

  updateStatus(status: string) {
    if (this.selectedRequest) {
      const id = this.selectedRequest.identifier || ''; // Remplacez par le champ identifiant unique
      this.requestService.updateRequestStatus(id, status).subscribe(
        () => {
          this.selectedRequest!.hostStatus = status; // Met à jour localement
          this.selectedRequest = null; // Retour à la liste
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut :', error);
        }
      );
    }
  }


}
