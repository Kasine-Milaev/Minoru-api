import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Grid, Pagination, CircularProgress, Alert, Box, InputAdornment, MenuItem, Stack,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { loadAnime } from '../store/animeSlice';
import AnimeCard from '../components/AnimeCard';
import PageTitle from '../components/PageTitle';

const SORTS = [
  { value: 'POPULARITY_DESC', label: 'По популярности' },
  { value: 'SCORE_DESC', label: 'По рейтингу' },
  { value: 'START_DATE_DESC', label: 'Сначала новые' },
  { value: 'START_DATE', label: 'Сначала старые' },
];

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, pageInfo, status, error } = useSelector((s) => s.anime);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('POPULARITY_DESC');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => { setQuery(search); setPage(1); }, 500);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    dispatch(loadAnime({ page, perPage: 24, search: query, sort }));
  }, [dispatch, page, query, sort]);

  return (
    <>
      <PageTitle icon={<AutoStoriesRoundedIcon />}>Архив тайтлов</PageTitle>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
        <TextField
          fullWidth
          placeholder="Поиск аниме..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment>
              ),
            },
          }}
        />
        <TextField
          select
          label="Сортировка"
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          sx={{ minWidth: 220 }}
        >
          {SORTS.map((s) => (
            <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {status === 'loading' && <Box textAlign="center" my={6}><CircularProgress /></Box>}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}

      {status === 'succeeded' && (
        <>
          <Grid container spacing={3}>
            {items.map((a) => (
              <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <AnimeCard anime={a} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.min(pageInfo.lastPage, 100)}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
    </>
  );
}