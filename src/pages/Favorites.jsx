import { useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import AnimeCard from '../components/AnimeCard';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PageTitle from '../components/PageTitle';

export default function Favorites() {
  const items = useSelector((s) => s.favorites.items);

  return (
    <>
      <PageTitle icon={<FavoriteRoundedIcon />}>Любимое</PageTitle>
      {items.length === 0 && (
        <Typography color="text.secondary">Пока пусто. Нажми на сердечко у любого тайтла.</Typography>
      )}
      <Grid container spacing={3}>
        {items.map((a) => (
          <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <AnimeCard anime={a} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}