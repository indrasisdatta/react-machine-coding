import { useEffect, useState } from "react";
import { SeatRowType } from "../../types/SeatBooking";
import { SeatRow } from "./SeatRow";

export const SeatBooking = () => {
  const [seatData, setseatData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("./mock-json/seat-booking.json");
      const respData = await response.json();
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
            seatData.map(
              ({ zone, rows }: { zone: string; rows: SeatRowType[] }) => (
                <div className="zone">
                  <h1>{zone}</h1>
                  {rows.length > 0 &&
                    rows.map((seatRow) => <SeatRow row={seatRow} />)}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};
