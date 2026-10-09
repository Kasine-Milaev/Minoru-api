import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Stats from './pages/Stats';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="stats" element={<Stats />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}