import { useState, useContext } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import { LOGO_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  let [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);

  // Selector for redux; to subscribe to the store
  const cart = useSelector((store) => store.cart.items);
  // console.log("cart", cart);

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-pink-200 sm:bg-yellow-50 lg:bg-green-50">
      <div className="w-32">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div>
        <ul className="flex">
          <li className="px-4">Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart {cart.length} items</Link>
          </li>
          <button
            className="login"
            onClick={() =>
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
            }
          >
            {btnName}
          </button>
          <li className="px-4 font-bold">{data.loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
