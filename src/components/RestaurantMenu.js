import { useState } from "react";
import { useParams } from "react-router";

import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  // Lifting the state up
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo.cards[2]?.card?.card?.info;

  // const { itemCards } =
  //   resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card;
  // console.log(itemCards);

  const categories =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.["card"]?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);

  return (
    <div className="px-4 mx-4 text-center">
      <h1 className="my-3 py-3 font-bold text-3xl">{resInfo && name}</h1>
      <p className="italic font-semibold">
        {resInfo && cuisines.join(", ")}. ₹ {costForTwo / 100} for two.
      </p>
      {/* Category Accordions */}
      {categories.map((category, index) => {
        return (
          // Controlled Component
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={index == showIndex && true}
            setShowIndex={() => setShowIndex(showIndex == index ? null : index)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
