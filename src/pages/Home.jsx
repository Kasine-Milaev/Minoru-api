import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import { loadAnime } from '../store/animeSlice';
import AnimeCard from '../components/AnimeCard';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import PageTitle from '../components/PageTitle';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.anime);

  useEffect(() => { dispatch(loadAnime({ page: 1, perPage: 24 })); }, [dispatch]);

  const hero = items.find((a) => a.bannerImage);

  return (
    <>
      <Box sx={{
        position: 'relative', borderRadius: 6, overflow: 'hidden', mb: 5, minHeight: 360,
        display: 'flex', alignItems: 'flex-end', p: { xs: 3, md: 6 },
        background: hero
  ? `linear-gradient(to top, #0b0b0c 5%, rgba(11,11,12,.2)), url(${hero.bannerImage}) center/cover`
  : 'linear-gradient(135deg,#e6394655,#b6f23a22)',
      }}>
        <Box maxWidth={600}>
          <Typography variant="h3" mb={1}>Добро пожаловать в Додзё</Typography>
          <Typography color="text.secondary" mb={3}>
            Тысячи аниме-тайтлов, рейтинги и инфографика. Находи, изучай, сохраняй любимое.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to="/catalog"
            startIcon={<ExploreRoundedIcon />}>
            Открыть архив
          </Button>
        </Box>
      </Box>

      <PageTitle icon={<LocalFireDepartmentRoundedIcon />} variant="h5" mb={2}>
  Популярное сейчас
</PageTitle>
      {status === 'loading' && <Box textAlign="center" my={6}><CircularProgress /></Box>}
      <Grid container spacing={3}>
        {items.slice(0, 8).map((a) => (
          <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <AnimeCard anime={a} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}