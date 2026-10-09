import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Chip, Stack, IconButton, Box } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { toggleFavorite } from '../store/favoritesSlice';

export default function AnimeCard({ anime }) {
  const dispatch = useDispatch();
  const isFav = useSelector((s) => s.favorites.items.some((a) => a.id === anime.id));
  const title = anime.title.english || anime.title.romaji;

  return (
    <Card sx={{
      height: '100%', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(239,220,195,.1)',
      transition: '.25s',
      '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(230,57,70,.4)' },
    }}>
      <Box position="relative">
        <CardMedia component="img" height="320" image={anime.coverImage.large} alt={title} />
        <IconButton onClick={() => dispatch(toggleFavorite(anime))}
          sx={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.55)' }}>
          {isFav ? <FavoriteRoundedIcon color="primary" /> : <FavoriteBorderRoundedIcon />}
        </IconButton>
      </Box>
      <CardContent>
        <Typography fontWeight={800} noWrap title={title}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {anime.format} • {anime.seasonYear ?? '—'} • {anime.episodes ?? '?'} эп.
        </Typography>
        <Stack direction="row" spacing={0.5} mt={1} alignItems="center">
          <StarRoundedIcon fontSize="small" sx={{ color: '#facc15' }} />
          <Typography variant="body2">{anime.averageScore ?? '—'}</Typography>
        </Stack>
        <Stack direction="row" gap={0.5} flexWrap="wrap" mt={1}>
          {anime.genres.slice(0, 3).map((g) => (
            <Chip key={g} label={g} size="small" color="secondary" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}