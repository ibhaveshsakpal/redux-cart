import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const initialState = {
  carts: [],
  items: data,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.carts[index].quantity += 1;
      } else {
        state.carts.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    getTotalPrice: (state) => {
      let { totalQuantity, totalPrice } = state.carts.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    increaseQuantity: (state, action) => {
      state.carts.map((item) => {
        if (item.id === action.payload) {
          return item.quantity++;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.carts.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return item.quantity--;
          }
        }
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  getTotalPrice,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
