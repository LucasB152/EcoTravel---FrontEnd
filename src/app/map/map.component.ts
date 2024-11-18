import {Component, AfterViewInit} from '@angular/core';
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {


  private map: google.maps.Map | undefined;
  //https://www.houseplans.net/uploads/plans/32005/elevations/88909-768.jpg
//https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg
//https://ecopark-adventures.com/wp-content/uploads/2019/07/HP-Main-picture-Tournai-e1580480117562.jpg
  private locations = [
    {lat: 50.7636, lng: 5.5273, name: "maison en foret", type: "host", images: ["https://www.houseplans.net/uploads/plans/32005/elevations/88909-768.jpg"]},
    {lat: 50.6336, lng: 5.3573, name: "challet dans les bois", type: "host", images: ["https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg"]},
    {lat: 50.66036, lng: 5.5993, name: "maison de campagne", type: "host"},
    {lat: 50.6836, lng: 5.5673, name: "acrobranche", type: "activity", images: ["https://ecopark-adventures.com/wp-content/uploads/2019/07/HP-Main-picture-Tournai-e1580480117562.jpg"]},
    {lat: 50.0636, lng: 5.8573, name: "parc d'attraction", type: "activity", images: []},
    {lat: 50.6136, lng: 5.7873, name: "parc animalier", type: "activity", images: ["https://ecopark-adventures.com/wp-content/uploads/2019/07/HP-Main-picture-Tournai-e1580480117562.jpg"]},
    {lat: 50.7636, lng: 5.0573, name: "parc aquatique", type: "activity", images: ["https://ecopark-adventures.com/wp-content/uploads/2019/07/HP-Main-picture-Tournai-e1580480117562.jpg"]},
    {lat: 50.9636, lng: 5.9573, name: "villa de luxe", type: "host", images: []},
    {lat: 50.7636, lng: 5.9573, name: "chateau", type: "host", images: ["https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg", "https://www.houseplans.net/uploads/plans/32005/elevations/88909-768.jpg"]},
    {lat: 51.636, lng: 5.2573, name: "chateau", type: "host", images: []},
    {lat: 50.0636, lng: 5.0573, name: "aqua poney", type: "activity", images: []},
    {lat: 50.0636, lng: 5.7573, name: "cabanne dans un arbre", type: "host", images: ["https://www.houseplans.net/uploads/plans/32005/elevations/88909-768.jpg", "https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg"]},
    {lat: 50.4636, lng: 5.4573, name: "petite maison en bois", type: "host", images: ["https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg"]},
    {lat: 50.1636, lng: 5.1573, name: "petite maison en papier reciblable", type: "host", images: ["https://casaeconstrucao.org/wp-content/uploads/2020/03/casas-baratas-tiny-house-no-jardim.jpg"]},
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

    const markers = this.locations.map((position, i) => {
      const color = position.type === "host" ? "#a6f342" : "#4acbea";
      const pinGlyph = new google.maps.marker.PinElement({
        background: color,
        glyphColor: "#ffffff",
        borderColor: "#000000",
      })
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: pinGlyph.element,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        let images = "";
        if(position.images){
          images = position.images.map((image) => `<img src="${image}" class="w-20 h-20 object-cover" alt="image">`).join("");
        }

        infoWindow.setContent(`<div class="flex flex-col">
          <h1 class="text-lg font-bold">${position.name}</h1>
          <p class="text-sm">${position.type}</p>
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
