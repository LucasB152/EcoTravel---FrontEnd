import { Component, AfterViewInit } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: google.maps.Map | undefined;
  private locations = [
    { lat: 50.7636, lng: 5.5273 },
    { lat: 50.6336, lng: 5.3573 },
    { lat: 50.66036, lng: 5.5993 },
    { lat: 50.6836, lng: 5.5673 },
    { lat: 50.0636, lng: 5.8573 },
    { lat: 50.6136, lng: 5.7873 },
    { lat: 50.7636, lng: 5.0573 },
    { lat: 50.9636, lng: 5.9573 },
    { lat: 50.7636, lng: 5.9573 },
    { lat: 51.636, lng: 5.2573 },
    { lat: 50.0636, lng: 5.0573 },
    { lat: 50.0636, lng: 5.7573 },
    { lat: 50.4636, lng: 5.4573 },
    { lat: 50.1636, lng: 5.1573 },
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('Google Maps cannot be initialized in a non-browser environment.');
      return;
    }
    this.loadGoogleMapsAPI()
      .then(() => this.initMap())
      .catch((err) => console.error('Failed to load Google Maps API:', err));
  }

  private loadGoogleMapsAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=marker';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  private async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.map = new Map(document.getElementById('map') as HTMLElement, {
      zoom: 10,
      center: { lat: 50.636, lng: 5.573 },
      mapId: '1b9475db8c0f46f2',
    });

    const markers = this.locations.map(position => {
      const marker = new AdvancedMarkerElement({
        position,
        map: this.map,
      });
      return marker;
    });

    new MarkerClusterer({
      markers,
      map: this.map,
    });
  }
}
