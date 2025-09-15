export interface Schedule {
  id: number;
  train_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  status: string;
  created_by?: { id: number; username: string };
  updated_by?: { id: number; username: string };
}
