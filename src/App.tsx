import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";
import { RootState } from "./store/store";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const App = () => {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + (item.quantity ?? 0), 0)
  );
  
  const wishlistItemCount = useSelector((state: RootState) => 
    state.wishlist.items.length
  );

  return (
    <Router>
      <div className="w-full mx-auto">
        <nav className="flex justify-center p-4 bg-white shadow-md">
          <div className="flex items-center space-x-6">
            <Link className="text-gray-700 hover:text-blue-600" to="/">Accueil</Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600" to="/wishlist">
              <FaHeart className="mr-1 text-red-500" />
              Favoris {wishlistItemCount > 0 && <span className="ml-1 bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-0.5">{wishlistItemCount}</span>}
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600" to="/cart">
              <FaShoppingCart className="mr-1 text-blue-500" />
              Panier {cartItemCount > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">{cartItemCount}</span>}
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
