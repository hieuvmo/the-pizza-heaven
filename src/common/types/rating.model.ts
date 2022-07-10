export interface IRating {
  id: number;
  userId: number | null;
  firstName: string;
  lastName: string;
  foodId: number;
  star: number;
  review: string;
  isAnonymous: boolean;
}
