/**
 * Interface for Destination qui contient toutes les informations sur une destination.
 *
 * !!! ATTENTION version temporaire et a completer (type, tags et images peuvent changer) !!!
 */
export interface Destination {
  destinationID: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  type: string;
  images: string[];
  tags: string[];
}
