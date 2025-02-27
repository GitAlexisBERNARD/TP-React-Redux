import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  thumbnail: string;
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    return data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, category }: { page: number; category?: string }) => {
    const skip = (page - 1) * 10;
    let url = `https://dummyjson.com/products?limit=10&skip=${skip}`;
    
    if (category && category !== "all") {
      url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${skip}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  }
);

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
  selectedCategory: string;
  categories: string[];
  isLoadingCategories: boolean;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
  selectedCategory: "all",
  categories: [],
  isLoadingCategories: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Réinitialiser la pagination lors du changement de catégorie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.categories = ["all", ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoadingCategories = false;
      });
  },
});

export const { setPage, setCategory } = productSlice.actions;
export default productSlice.reducer;