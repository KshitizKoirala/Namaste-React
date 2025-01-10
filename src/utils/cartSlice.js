import { createSlice, current } from "@reduxjs/toolkit";

// Creating a Slice inside the store
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // In Vanilla(older) Redux => DOCS Used to say DON"T MUTATE STATE and returning the state was mandatory
      // SO we needed to make a copy of the state and then return the updatedState, i.e.
      /**
       * const newState = [..state]
       * newState.items.push(action.payload)
       * return newState
       */

      // In Redux Toolkit, we have to modify the state
      // mutating the state, directly modifying the state
      // without needing to return the state
      // this is done with the help of immer library
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // find the item using action.payload and remove the item from the index
      state.items.pop();
    },
    clearCart: (state) => {
      /**
       * We cannot directly modify the state, if we do
       * state = [];
       * then this will only change the reference to the state and not modify the state
       * that is the reason we directly mutate the state
       */
      // console.log(current(state)); // if we directly log the state it will return a proxy object, so we need to use current from @redux/toolkit to view the data inisde state
      // state.items.length = 0;

      // RTK Says that either we mutate the existing state or return a new state.
      // i.e return {items: []}; this new array will modify the original state
      return { items: [] };
    },
  },
});
/**
 * createSlice returns object like this
 * {
 *  actions: {
 *      addItem
 *   },
 *  reducers
 * }
 *
 */

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
