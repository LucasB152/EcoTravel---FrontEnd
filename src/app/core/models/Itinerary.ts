import {Step} from './Step';

export interface Itinerary {
  id: string;
  title: string;
  steps: Step[]
  distance: number;
}
