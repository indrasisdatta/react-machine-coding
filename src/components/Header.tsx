import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  console.log("Pathname", pathname);

  const menuClass = (urlCheck: string) => {
    return pathname === "/" + urlCheck ? "active" : "";
  };

  return (
    <header>
      <ul className="menu-items">
        <li>
          <span className="text-white app-name">Machine coding</span>
        </li>
        <li>
          <NavLink to="/autocomplete" className={menuClass("autocomplete")}>
            Autocomplete
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={menuClass("products")}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/seat-booking" className={menuClass("seat-booking")}>
            Seat Booking
          </NavLink>
        </li>
        <li>
          <NavLink to="/trello" className={menuClass("trello")}>
            Trello
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
