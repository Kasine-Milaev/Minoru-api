import { createSlice } from '@reduxjs/toolkit';

const saved = (() => {
  try { return JSON.parse(localStorage.getItem('minoru-fav')) || []; }
  catch { return []; }
})();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: saved },
  reducers: {
    toggleFavorite: (state, action) => {
      const i = state.items.findIndex((a) => a.id === action.payload.id);
      if (i >= 0) state.items.splice(i, 1);
      else state.items.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;