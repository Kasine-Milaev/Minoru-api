import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './animeSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: { anime: animeReducer, favorites: favoritesReducer },
});

store.subscribe(() => {
  try {
    localStorage.setItem('minoru-fav', JSON.stringify(store.getState().favorites.items));
  } catch { /* ignore */ }
});