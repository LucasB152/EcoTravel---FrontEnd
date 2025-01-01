export interface ReviewResponseDto {
  id: number;
  score: number;
  comment: string;
  edited: boolean;
  username: string;
  dateStringCreation: string;
  dateStringModification: string;
}
