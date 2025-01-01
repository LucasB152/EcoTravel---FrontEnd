export interface ReviewResponseDto {
  id: number;
  score: number;
  title: string;
  comment: string;
  edited: boolean;
  username: string;
  dateStringCreation: string;
  dateStringModification: string;
}
