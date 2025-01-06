export interface ReviewResponseDto {
  id: number;
  score: number;
  comment: string;
  edited: boolean;
  userId: number;
  username: string;
  dateStringCreation: string;
  dateStringModification: string;
}
