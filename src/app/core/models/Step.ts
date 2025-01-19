import {Destination} from './Destination';

export interface Step {
  id?: string;
  destinationId: string;
  itineraryId: string;
  orderSequence?: number;
  destination: Destination;
}
