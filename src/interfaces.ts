export interface DebateRecord {
  id: number;
  uid: string;
  date: string;
  position: string;
  points: number;
  speaks: number;
  infoslide: string;
  motion: string;
  categories: Array<string>;
}
