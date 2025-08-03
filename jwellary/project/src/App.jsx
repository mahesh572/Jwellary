import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/Products/ProductList';
import AddProduct from './components/Admin/Products/AddProduct';
import ProductOptions from './components/Admin/Products/ProductOptions';
import ProductAttributes from './components/Admin/Products/ProductAttributes';
import AddCategory from './components/Admin/Categories/AddCategory';
import CategoryList from './components/Admin/Categories/CategoryList';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/options" element={<ProductOptions />} />
            <Route path="products/attributes" element={<ProductAttributes />} />
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<AddCategory />} />
            <Route path="orders" element={<div className="p-8 text-center text-slate-500">Orders management coming soon...</div>} />
            <Route path="customers" element={<div className="p-8 text-center text-slate-500">Customer management coming soon...</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-slate-500">Settings coming soon...</div>} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections" element={<div className="container py-16 text-center text-slate-500">Collections coming soon...</div>} />
                  <Route path="/engagement" element={<div className="container py-16 text-center text-slate-500">Engagement rings coming soon...</div>} />
                  <Route path="/wedding" element={<div className="container py-16 text-center text-slate-500">Wedding jewelry coming soon...</div>} />
                  <Route path="/fine-jewelry" element={<div className="container py-16 text-center text-slate-500">Fine jewelry coming soon...</div>} />
                  <Route path="/watches" element={<div className="container py-16 text-center text-slate-500">Watches coming soon...</div>} />
                  <Route path="/gifts" element={<div className="container py-16 text-center text-slate-500">Gifts coming soon...</div>} />
                  <Route path="/cart" element={<div className="container py-16 text-center text-slate-500">Shopping cart coming soon...</div>} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;