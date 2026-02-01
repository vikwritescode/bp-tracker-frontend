export interface DebateRecord {
  id: number;
  uid: string;
  date: string;
  legacy_date: string;
  position: string;
  points: number;
  speaks: number;
  infoslide: string;
  motion: string;
  categories: Array<string>;
  tournament: string;
  tournament_id: string;
}

export interface TournamentRecord {
  id: number;
  name: string;
  date: string;
}
