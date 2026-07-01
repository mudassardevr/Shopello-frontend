import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ProductDetails from "./pages/ProductDetails";
import SearchResult from "./pages/SearchResult";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";

//layout
import Navbar from "./components/Navbar";
//protected route
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

//toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "./pages/Wishlist";

//admin
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProducts";
import ProductList from "./pages/admin/ProductList";
import EditProducts from "./pages/admin/EditProducts";
import Orders from "./pages/admin/Orders";


function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {/* <Navbar /> */}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/search" element={<SearchResult />} />

        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* <Footer /> */}

      {!hideLayout && <Footer />}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
