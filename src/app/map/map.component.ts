import {Component, AfterViewInit, Input} from '@angular/core';
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import {environment} from '../../environments/environment';
import {DestinationOnMap} from '../core/models/DestinationOnMap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() destinationsOnMap: any[] = [];

  private map: google.maps.Map | undefined;

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
        //script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkyuA7mezQv6ynC-a5p76wUhYeqjfsZ9I&libraries=marker';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      }
    });
  }


  private async initMap(): Promise<void> {
    // Request needed libraries.
    const {Map, InfoWindow} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 10,
      center: {lat: 50.636, lng: 5.573},
      mapId: '1b9475db8c0f46f2',
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const markers = this.destinationsOnMap.map((position, i) => {
      const color = position.destinationTypeName === "host" ? "#a6f342" : "#4acbea";
      const pinGlyph = new google.maps.marker.PinElement({
        background: color,
        glyphColor: "#ffffff",
        borderColor: "#000000",
      })
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: {lat: position.lat, lng: position.lng},
        content: pinGlyph.element,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        let images = "";
        if (position.images) {
          images = position.images.map((image: any) => `<img src="${image}" class="w-20 h-20 object-cover" alt="image">`).join("");
        }

        infoWindow.setContent(`<div class="flex flex-col">
          <h1 class="text-lg font-bold">${position.name}</h1>
          <p class="text-sm">${position.destinationTypeName}</p>
          <p class="text-sm">${position.lat}, ${position.lng}</p>
          <div class="flex flex-wrap">
            ${images}
          </div>
        </div>`);


        infoWindow.open(this.map, marker);
      });
      return marker;
    });

    new MarkerClusterer({
      markers,
      map: this.map,
    });
  }
}
