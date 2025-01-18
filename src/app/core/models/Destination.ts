import {Address} from './Address';

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
  address: Address;
  tags: string[];
}
