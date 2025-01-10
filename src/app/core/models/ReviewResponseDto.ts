export interface ReviewResponseDto {
  id: number;
  score: number;
  comment: string;
  edited: boolean;
  userId: string;
  username: string;
  dateStringCreation: string;
  dateStringModification: string;
}
