import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: {
  items: Product[];
} = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);
      
      if (!existingProduct) {
        state.items.push(product);
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 