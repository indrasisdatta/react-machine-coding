import { SeatType, SeatRowType } from "../../types/SeatBooking";

export const SeatRow = ({ row }: { row: SeatRowType }) => {
  return (
    <div className="seat-row">
      {row.seats.map((seat: SeatType) => (
        <div className="seat">{seat.seatNo}</div>
      ))}
    </div>
  );
};
