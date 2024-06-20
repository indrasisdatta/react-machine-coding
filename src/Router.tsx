import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const AutocompleteComp = lazy(() => import("./pages/Autocomplete"));
const ProductsListComp = lazy(() => import("./pages/Products/ProductsList"));

/* For named export */
const SeatBookingComp = lazy(() =>
  import("./pages/SeatBooking/SeatBooking").then((module) => ({
    default: module.SeatBooking,
  }))
);

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/autocomplete"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <AutocompleteComp />
          </Suspense>
        }
      />
      <Route
        path="/products"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsListComp />
          </Suspense>
        }
      />
      <Route
        path="/seat-booking"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <SeatBookingComp />
          </Suspense>
        }
      />
    </Routes>
  );
};
