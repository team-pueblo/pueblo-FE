import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import App from "./App";
import MainPage from "./pages/Main/MainPage";
import CategoryPage from "./pages/Main/CategoryPage";
import BrandsPage from "./pages/brands/BrandsPage";
import BrandProductsPage from "./pages/brands/BrandProductsPage";
import EmptyPage from "./pages/Main/EmptyPage";
import LoginPage from "./pages/login/LoginPage";
import FindIdPage from "./pages/login/FindIdPage";
import FindIdResultPage from "./pages/login/FindIdResultPage";
import SignupPage from "./pages/login/SignupPage";
import ResetPasswordPage from "./pages/login/ResetPasswordPage";
import { CartPage } from "./pages/cart/CartPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import SearchPage from "./pages/search/SearchPage";
import "./index.css";
import { sentryRootOptions } from "./monitoring";


ReactDOM.createRoot(document.getElementById("root")!, sentryRootOptions).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="men" element={<CategoryPage title="남성" />} />
            <Route path="women" element={<CategoryPage title="여성" />} />
            <Route path="lifestyle" element={<CategoryPage title="생활" />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="brands/:slug" element={<BrandProductsPage />} />
            <Route path="sale" element={<CategoryPage title="세일" />} />
            <Route path="empty" element={<EmptyPage />} />
            {/*<Route path="/" element={<LoginPage />} />*/}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/find-id" element={<FindIdPage />} />
            <Route path="/find-id-result" element={<FindIdResultPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
