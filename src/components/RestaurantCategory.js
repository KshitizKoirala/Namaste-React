import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      {/* Accordion Header */}
      <div className="w-6/12 mx-auto bg-gray-100 p-2 my-4 shadow-lg rounded-lg">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold p-2">
            {data?.title} ({data?.itemCards.length})
          </span>
          <span className="p-2">🔽</span>
        </div>
        {/* Accordion Body */}
        {showItems && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
