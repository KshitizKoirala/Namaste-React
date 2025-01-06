import { useState, useEffect } from "react";
import { Link } from "react-router";

import Shimmer from "./Shimmer";
import RestaurantCard from "./REstraurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";

// import resList from "../utils/mockData";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
    console.log("UseEffect Called");
  }, []);

  // This will render first and then the JSX and then only the useEffect;
  // As useEffect's callback function is loaded after the component renders
  console.log("Body Rendered");
  // Whenever state variable updates, react triggers a reconcilitation cycle (re-rendering of the component)

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9352403&lng=77.624532&str=Meghana%20Foods&trackingId=0ec545e5-0b43-91df-6d83-a8f304af1df5&submitAction=ENTER&queryUniqueId=9c272744-5988-8cc7-b8e1-172fe494ef27"
    );

    const json = await data.json();
    // console.log(json);

    // Optional Chaining
    const resData =
      json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]
        ?.card?.card?.restaurants;

    setListOfRestaurants(resData);
    setFilteredRestaurant(resData);
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <div className="offline">
        <h1>
          Looks like you are offline. Please check your internet connection
        </h1>
      </div>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search for restaurants"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              setFilteredRestaurant(
                listOfRestaurants.filter((res) =>
                  res?.info?.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
              );
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setFilteredRestaurant(
              listOfRestaurants.filter((res) => res?.info?.avgRating > 4)
            );
            console.log("Button Clicked");
          }}
        >
          {" "}
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={"restaurant/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
