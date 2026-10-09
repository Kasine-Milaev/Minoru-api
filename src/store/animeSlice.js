import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnime } from '../api/anilist';

export const loadAnime = createAsyncThunk('anime/load', async (params) => {
  return await fetchAnime(params);
});

const animeSlice = createSlice({
  name: 'anime',
  initialState: { items: [], pageInfo: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAnime.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(loadAnime.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload.media;
        s.pageInfo = a.payload.pageInfo;
      })
      .addCase(loadAnime.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      });
  },
});

export default animeSlice.reducer;