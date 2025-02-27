import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialState,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);
    
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity ?? 1) + 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        if (quantity > 0) {
          product.quantity = quantity;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;