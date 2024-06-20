import "./App.css";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavLink to="/autocomplete">Autocomplete</NavLink> |&nbsp;
        <NavLink to="/products">Products</NavLink> |&nbsp;
        <NavLink to="/seat-booking">Seat Booking</NavLink>
      </header>
      <body>
        <Router />
      </body>
    </BrowserRouter>
  );
}

export default App;
