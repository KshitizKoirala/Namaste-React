import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";

import Shimmer from "./Shimmer";
import RestaurantCard, { withPromotedLabel } from "./RestraurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

// import resList from "../utils/mockData";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // This will render first and then the JSX and then only the useEffect;
  // As useEffect's callback function is loaded after the component renders

  // console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
    // console.log("UseEffect Called");
  }, []);
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

  const { setUserName, loggedInUser } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="search p-4 m-4">
          <input
            data-testid="searchInput"
            type="text"
            placeholder="Search for restaurants"
            className="py-1 px-4 border border-solid border-gray-500 active:border-gray-100"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-1 m-4 bg-green-200 rounded-md"
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
        <div className="search p-4 m-4 flex items-center rounded-lg">
          <button
            className="px-4 py-1 bg-gray-300 rounded-md"
            onClick={() => {
              setFilteredRestaurant(
                listOfRestaurants.filter((res) => res?.info?.avgRating > 4)
              );
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        <div className="search p-4 m-4 flex items-center rounded-lg">
          <label>UserName Changes Along with Context</label>
          <input
            className="border border-black p-1 rounded-lg"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="m-4 flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={"restaurant/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            {/* If a restaurant is promoted then add a promoted label to it. */}
            {restaurant?.info?.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
