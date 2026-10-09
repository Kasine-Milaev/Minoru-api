import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Alert } from '@mui/material';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PageTitle from '../components/PageTitle';
import Charts from '../components/Charts';
import { fetchMany } from '../api/anilist';

export default function Stats() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchMany(5, 50)
      .then((data) => { if (!cancelled) setItems(data); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <PageTitle icon={<InsightsRoundedIcon />}>Инфографика</PageTitle>

      {loading && (
        <Box textAlign="center" my={6}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>Собираем статистику...</Typography>
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && items.length > 0 && (
        <>
          <Typography color="text.secondary" mb={3}>
            Статистика по {items.length} самым популярным тайтлам AniList
          </Typography>
          <Charts items={items} />
        </>
      )}
    </>
  );
}