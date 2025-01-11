/**
 * Interface for Destination qui contient toutes les informations sur une destination.
 *
 * !!! ATTENTION version temporaire et a completer (type, tags et images peuvent changer) !!!
 */
export interface Destination {
  destinationID: string;
  name: string;
  description: string;
  price: string;
  capacity: string;
  contactPhone: string;
  contactEmail: string;
  images: string[];
  destinationType: string;
  address: string;
  tags: string[];
  visible: boolean;
}
