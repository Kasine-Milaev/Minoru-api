import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Button, Container, Box, Badge } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Logo from './Logo';
import Sakura from './Sakura';

export default function Layout() {
  const favCount = useSelector((s) => s.favorites.items.length);

  const links = [
    { to: '/', label: 'Додзё', icon: <HomeRoundedIcon /> },
    { to: '/catalog', label: 'Архив', icon: <AutoStoriesRoundedIcon /> },
    { to: '/stats', label: 'Инфографика', icon: <InsightsRoundedIcon /> },
    {
      to: '/favorites', label: 'Любимое',
      icon: <Badge badgeContent={favCount} color="primary"><FavoriteRoundedIcon /></Badge>,
    },
  ];

  return (
    <>
      <Sakura />
      <AppBar position="sticky" color="transparent" elevation={0}
        sx={{ backdropFilter: 'blur(14px)', background: 'rgba(11,11,12,.75)',
      borderBottom: '1px solid rgba(239,220,195,.1)' }}>
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
          <Box flexGrow={1}><Logo /></Box>
          {links.map((l) => (
            <Button key={l.to} component={NavLink} to={l.to} end={l.to === '/'}
              startIcon={l.icon} color="inherit"
              sx={{
                borderRadius: 3, fontWeight: 700,
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
                '& .label': { display: { xs: 'none', sm: 'inline' } },
               '&.active': { background: 'linear-gradient(135deg,#e6394666,#b6f23a33)' },
              }}>
              <span className="label">{l.label}</span>
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </Container>
    </>
  );
}