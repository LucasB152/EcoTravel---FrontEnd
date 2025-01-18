import {Component, inject, signal, WritableSignal, viewChild} from '@angular/core';
import {SearchService} from '../../core/services/search.service';
import {DestinationSearch} from '../../core/models/DestinationSearch';
import {MapAdvancedMarker, MapInfoWindow} from '@angular/google-maps';
import {lookupService} from 'node:dns';
import {LoadingService} from '../../core/services/loading.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  isSearchActive: boolean = false;

  infoWindowRef = viewChild.required(MapInfoWindow);
  readonly #searchService = inject(SearchService);
  center = signal<google.maps.LatLngLiteral>({lat: 50.636, lng: 5.573});
  zoom = signal(8);

  $destinations: WritableSignal<any[]> = signal([]);

  constructor(private loadingService: LoadingService) {
    this.loadDestinations("", [], "", 1, 3);
  }

  onSearchResults(event: any): void {
    this.loadingService.show();
    this.isSearchActive = true;
    const {query, tags, type} = event;
    this.loadDestinations(query, tags, type, 1, 20);
  }

  onMarkerClick(destination: DestinationSearch, marker: MapAdvancedMarker): void {
    const content = `
      <div class="p-2 h-full">
        <h1 class="font-bold text-xl">${destination.name}</h1>
        <p class="line-clamp-2 text-sm text-gray-700 ">${destination.description}</p>
        <div class="flex items-center mt-2">
        <a href="destination/${destination.destinationID}"class=" p-1 text-white bg-[#00a14b] rounded-lg hover:bg-green-700 rounded text-sm">
          View Details
        </a>
        </div>
    </div>
  `;
    this.infoWindowRef().open(marker, false, content);
  }

  private loadDestinations(query: string, tags: string[], type: string, page: number, size: number): void {
    this.#searchService
      .getSearchDestinations(this.center(), query, tags, type, page, size)
      .pipe(finalize(() => {
        this.loadingService.hide();
      }))
      .subscribe((newDestinations) => {
        this.$destinations.set(newDestinations);
      });
  }
}
