import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Shimmer from "./Shimmer";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();
  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API_URL + resId);

    const json = await data.json();
    setResInfo(json?.data);
  };

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card;
  // console.log(itemCards);

  return (
    <div className="menu">
      <h1>{resInfo && name}</h1>
      <p>
        {resInfo && cuisines.join(", ")}. ₹ {costForTwo / 100} for two.
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name}, Rs: {item?.card?.info?.price / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
