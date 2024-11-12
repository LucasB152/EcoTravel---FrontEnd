import { Component, OnInit } from '@angular/core';
import {DefaultRenderer, MarkerClusterer} from "@googlemaps/markerclusterer";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}


async function initMap() {
  // Request needed libraries.
  const {Map, InfoWindow} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    // center: { lat: 50.636, lng: 5.573 },
    // zoom: 10,
    // mapId: 'DEMO_MAP_ID',
    zoom: 10,
    center: {lat: 50.636, lng: 5.573},
    mapId: '1b9475db8c0f46f2',
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });


  // Create an array of alphabetical characters used to label the markers.

  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const pinGlyph = new google.maps.marker.PinElement({
      background : "#a6f342",
      glyphColor : "#ffffff",
      borderColor : "#000000",
    })
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(position.lat + ", " + position.lng);
      infoWindow.open(map, marker);
    });
    return marker;
  });


  // Add a marker clusterer to manage the markers.

  let renderer = {
    render({ count, position }: any, stats: { clusters: { markers: { mean: number; }; }; }) {
      const color = count > Math.max(10, stats.clusters.markers.mean) ? "#237700" : "#53b800";
      const svg = window.btoa(`
        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
          <circle cx="120" cy="120" opacity=".8" r="70" />
          <circle cx="120" cy="120" opacity=".3" r="90" />
          <circle cx="120" cy="120" opacity=".1" r="110" />
          <text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>

        </svg>`);
      return new google.maps.Marker({
        position,
        icon: {
          url: `data:image/svg+xml;base64,${svg}`,
          scaledSize: new google.maps.Size(45, 45),
        },
      });
    }
  }


  const markerCluster = new MarkerClusterer({ markers, map, renderer:renderer });

}



const locations = [
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

initMap();
