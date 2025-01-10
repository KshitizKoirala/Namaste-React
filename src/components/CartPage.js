import { useSelector, useDispatch } from "react-redux";

import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart Page</h1>
      <div className="w-6/12 m-auto">
        {cartItems.length == 0 ? (
          <h1 className="m-5 p-5 text-2xl font-bold">
            Add Items to cart to view the cart.
          </h1>
        ) : (
          <button
            className="p-2 m-5 bg-black text-white rounded-md"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
