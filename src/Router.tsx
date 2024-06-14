import { Route, Routes } from "react-router-dom";
// import { Autocomplete } from "./pages/Autocomplete";
// import { ProductsList } from "./pages/Products/ProductsList";
import { Suspense, lazy } from "react";

const AutocompleteComp = lazy(() => import("./pages/Autocomplete"));
const ProductsListComp = lazy(() => import("./pages/Products/ProductsList"));

/* For named export */
// const AutocompleteComp = lazy(() =>
//     import("./pages/Autocomplete").then(module => ({ default: module.Autocomplete }))
//   );

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
        //   lazy={() => import("./pages/Autocomplete")}
      />
      <Route
        path="/products"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsListComp />
          </Suspense>
        }
        // lazy={() => import("./pages/Products/ProductsList")}
      />
    </Routes>
  );
};
