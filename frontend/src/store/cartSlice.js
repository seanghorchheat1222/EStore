import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.items.push(action.payload)
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      item.quantity = item.quantity + 1
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)

      if(item.quantity > 1){
        item.quantity = item.quantity - 1
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    clearItem: () => initialState
  }
})

export const {addCart, increaseQuantity, decreaseQuantity, removeItem, clearItem} = cartSlice.actions;
export default cartSlice.reducer;