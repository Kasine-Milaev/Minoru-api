import { useMemo } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#e63946', '#b6f23a', '#efdcc3', '#ff7a45', '#7fb069', '#8c2f39'];
const tooltipStyle = { background: '#1a1717', border: 'none', borderRadius: 12 };

export default function Charts({ items }) {
  const genreData = useMemo(() => {
    const map = {};
    items.forEach((a) => a.genres.forEach((g) => (map[g] = (map[g] || 0) + 1)));
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [items]);

  const formatData = useMemo(() => {
    const map = {};
    items.forEach((a) => { if (a.format) map[a.format] = (map[a.format] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [items]);

  const yearData = useMemo(() => {
    const map = {};
    items.forEach((a) => { if (a.seasonYear) map[a.seasonYear] = (map[a.seasonYear] || 0) + 1; });
    return Object.entries(map)
      .map(([year, value]) => ({ year, value }))
      .sort((a, b) => a.year - b.year);
  }, [items]);

  return (
    <Grid container spacing={3} mb={4}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 2, height: 320 }}>
          <Typography mb={1}>Топ жанров</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={genreData}>
              <XAxis dataKey="name" /><YAxis allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" name="Тайтлов" fill="#e63946" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Paper sx={{ p: 2, height: 320 }}>
          <Typography mb={1}>Форматы</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={formatData} dataKey="value" nameKey="name" outerRadius={90} label>
                {formatData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 2, height: 320 }}>
          <Typography mb={1}>Тайтлы по годам</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={yearData}>
              <XAxis dataKey="year" /><YAxis allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" name="Тайтлов" fill="#b6f23a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}