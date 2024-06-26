import "./App.css";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <header>
        <ul className="menu-items">
          <li>
            <NavLink to="/autocomplete">Autocomplete</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/seat-booking">Seat Booking</NavLink>
          </li>
          <li>
            <NavLink to="/trello">Trello</NavLink>
          </li>
        </ul>
      </header>
      <body>
        <div className="container">
          <Router />
        </div>
      </body>
    </BrowserRouter>
  );
}

export default App;
