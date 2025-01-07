/**
 * utiliser a lindex apres une recherche
 */
export interface DestinationSearch {
  destinationID: number;
  name: string;
  description: string | "no description";
  images: string[] | ["no image"];
  longitude: number;
  latitude: number;
}
