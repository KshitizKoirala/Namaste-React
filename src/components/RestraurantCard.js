import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const styleCard = {
  backgroundColor: "#f0f0f0",
};

const RestaurantCard = (props) => {
  //   console.log(props);
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } =
    resData?.info;

  return (
    <div
      className="m-4 p-4 w-[230px] h-[500px] rounded-md bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
      // style={styleCard}
    >
      <img
        className="res-logo rounded-md"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo} stars</h4>
      <h4>{sla?.slaString}</h4>
      <h4>User: {loggedInUser}</h4>
    </div>
  );
};

// Higher Order Component

// input- RestaurantCard => RestaurantCardPromoted
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <div className="absolute bg-gray-500 text-white m-2 p-2 rounded-lg">
          Promoted
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
