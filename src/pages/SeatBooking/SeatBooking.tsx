import { useEffect, useState } from "react";
import { SeatRowType } from "../../types/SeatBooking";
import { SeatRow } from "./SeatRow";
import { seatBookingData } from "./booking";

interface SeatRespObj {
  zone: string;
  rows: SeatRowType[];
}

export const SeatBooking = () => {
  const [seatData, setseatData] = useState<SeatRespObj[]>([]);

  useEffect(() => {
    (async () => {
      // const response = await fetch("./mock-json/seat-booking.json");
      // const respData = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const respData = seatBookingData as any;
      setseatData(respData);
    })();
  });

  return (
    <div>
      <a href="/system-design-booking.drawio.html" target="_blank">
        Check System Design
      </a>
      <div className="container">
        <div className="seat-group">
          {seatData.length > 0 &&
            seatData.map(({ zone, rows }) => (
              <div className="zone" key={zone}>
                <h1>{zone}</h1>
                {rows.length > 0 &&
                  rows.map((seatRow) => <SeatRow row={seatRow} />)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
