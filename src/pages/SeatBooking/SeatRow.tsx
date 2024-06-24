import { SeatType, SeatRowType } from "../../types/SeatBooking";

export const SeatRow = ({ row }: { row: SeatRowType }) => {
  const formatSeats = (seats) => {
    let prevSeat = 1,
      curSeat = 1;
    seats.map((seat) => {
      /* Seat doesn't start with 1 pos */
      // if (prevSeat === 1 && prevSeat !== seat.seatPos) {
      // }
    });
  };

  console.log("Row seats >>", row);
  return (
    <div className="seat-row">
      <span className="seat-row__title">{row.rowName}</span>
      {row.seats.map((seat: SeatType) => (
        <div className={`seat-row__seat ${seat.status}`} key={seat.seatNo}>
          {seat.seatNo}
        </div>
      ))}
    </div>
  );
};
