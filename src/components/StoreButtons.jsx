import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getStoreLinks } from '../utils/storeLinks';

export default function StoreButtons() {
  const links = getStoreLinks();

  return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        {[
          { name: 'App Store', href: links.apple, icon: '/app-store.svg' },
          { name: 'Google Play', href: links.google, icon: '/google-play.svg' },
        ].map(({ name, href, icon }) => (
          <Button
            key={name}
            component="a"
            variant="outlined"
            color="secondary"
            size="large"
            href={href}
            target={links.target}
            rel="noopener noreferrer"
            aria-label={`Télécharger RE sur ${name}`}
            startIcon={<Box component="img" src={icon} alt="" sx={{ width: 28, height: 28 }} />}
            sx={{
              minHeight: 48,
              minWidth: 0,
              px: 1,
              letterSpacing: 0,
              fontSize: '0.875rem',
              bgcolor: 'rgba(10, 15, 50, 0.55)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              '&:focus-visible': { outline: '3px solid #00e5ff', outlineOffset: 4 },
            }}
          >
            {name}
          </Button>
        ))}
      </Box>
  );
}
