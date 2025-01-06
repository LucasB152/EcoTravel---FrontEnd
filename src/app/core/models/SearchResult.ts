import {DestinationSearch} from './DestinationSearch';

export interface SearchResult {
  page: number;
  size: number;
  totalPages: number;
  totalResults: number;
  destinations: DestinationSearch[];
}
