import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Apple from '@mui/icons-material/Apple';
import GooglePlayIcon from './GooglePlayIcon';
import { getStoreLinks, getAppleReviewUrl } from '../utils/storeLinks';

const STORES = {
  apple: { name: 'App Store', Icon: Apple, accent: '0, 229, 255' },
  google: { name: 'Google Play', Icon: GooglePlayIcon, accent: '255, 0, 200' },
};

// `review` points the App Store button at the "Write a review" sheet.
export default function StoreButtons({ justifyContent = 'center', review = false }) {
  const links = getStoreLinks();
  if (review) links.apple = getAppleReviewUrl();
  // Show the visitor's own store first.
  const order = links.platform === 'android' ? ['google', 'apple'] : ['apple', 'google'];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent }}>
      {order.map((key) => {
        const { name, Icon, accent } = STORES[key];
        return (
          <ButtonBase
            key={key}
            component="a"
            href={links[key]}
            target={links.target}
            rel="noopener noreferrer"
            aria-label={`${review ? 'Noter' : 'Télécharger'} RE sur ${name}`}
            sx={{
              gap: { xs: 1, sm: 1.25 },
              minWidth: { xs: 0, sm: 176 },
              height: { xs: 52, sm: 56 },
              pl: { xs: 1.25, sm: 1.75 },
              pr: { xs: 1.75, sm: 2.25 },
              justifyContent: 'flex-start',
              borderRadius: '12px',
              color: '#fff',
              textAlign: 'left',
              background: 'rgba(5, 8, 21, 0.6)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `rgba(${accent}, 0.8)`,
                background: `rgba(${accent}, 0.08)`,
                boxShadow: `0 0 22px rgba(${accent}, 0.35), 0 4px 24px rgba(0, 0, 0, 0.35)`,
                transform: 'translateY(-1px)',
              },
              '&:focus-visible': { outline: `2px solid rgb(${accent})`, outlineOffset: 3 },
            }}
          >
            <Icon aria-hidden sx={{ fontSize: { xs: 26, sm: 30 } }} />
            <Box component="span" sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              {name}
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
