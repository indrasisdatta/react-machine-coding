export interface SeatType {
  seatNo: number;
  seatPos: number;
  status: "blocked" | "booked" | "not_available" | "available";
}

export interface SeatRowType {
  rowName: string;
  type: string;
  price: number;
  seats: SeatType[];
}

export interface ZoneType {
  zoneName: string;
  price: number;
}
