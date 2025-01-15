import {Step} from './Step';
import {Address} from 'node:cluster';

export interface Itinerary {
  id: string;
  title: string;
  steps: Step[]
  distance: number;
  address: Address
}
