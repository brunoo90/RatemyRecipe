import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './modules/layout/Navigation';
import Home from './modules/pages/Home';
import Categories from './modules/pages/Categories';
import Favorites from './modules/pages/Favorites';
import Create from './modules/pages/Create';
import Login from './modules/auth/Login';
import Signup from './modules/auth/Signup';
import MyRecipes from './modules/pages/MyRecipes';
import NoPage from './modules/pages/NoPage';
import Layout from './modules/layout/Layout';

export default function App() {
  return (
    <Router>
      <Layout>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
} 