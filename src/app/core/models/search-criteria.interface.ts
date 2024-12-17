/**
 * Interface pour les critères de recherche
 *
 * !!! ATTENTION version non final (type, tags et images peuvent changer) !!!
 */
export interface SearchCriteria {
  query?: string;
  tags?: string[];
  type?: string;
  page?: number;
  size?: number;
}
