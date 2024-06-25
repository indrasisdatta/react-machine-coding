import { FC } from "react";
import { SeatType, SeatRowType } from "../../types/SeatBooking";

interface SeatRowInf {
  row: SeatRowType;
}

export const SeatRow: FC<SeatRowInf> = ({ row }) => {
  const formatSeats = (seats: SeatType[]) => {
    /* Initialize all seats as empty */
    const lastSeatPos = seats[seats.length - 1].seatPos;
    const seatObj: { [key: number]: SeatType } = {};
    for (let i = 1; i < lastSeatPos; i++) {
      seatObj[i] = {
        seatNo: 0,
        seatPos: i,
        status: "empty",
      };
    }
    /* Update seat pos with status from json */
    seats.forEach((seat) => {
      seatObj[seat.seatPos] = seat;
    });
    return Object.values(seatObj);
  };

  const displaySeats = () => {
    let seats = structuredClone(row.seats);
    console.log("Display seats: ", seats);
    seats = formatSeats(seats);
    return seats.map((seat: SeatType) => {
      return (
        <div
          key={`${row.rowName}-${seat.seatPos}`}
          className={`seat-row__seat ${seat.status}`}
        >
          {seat.seatNo}
        </div>
      );
    });
  };

  return (
    <div className="seat-row">
      <span className="seat-row__title">{row.rowName}</span>
      {displaySeats()}
    </div>
  );
};
