import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { QRCodeSVG } from 'qrcode.react';
import StoreButtons from './StoreButtons';
// Single link for every device: /telecharger sends phones to their store.
import { DOWNLOAD_PAGE_URL } from '../utils/storeLinks';

export default function DownloadCard({ headingComponent = 'h2' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 3, md: 5 },
        p: { xs: 3, sm: 4, md: 5 },
        textAlign: { xs: 'center', md: 'left' },
        background: 'rgba(10, 15, 50, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(176, 38, 255, 0.25)',
        borderRadius: '24px',
        boxShadow: '0 0 40px rgba(176, 38, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component={headingComponent}
          sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 800, lineHeight: 1.2, mb: 1.5 }}
        >
          <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 18px rgba(0,229,255,0.6)' }}>
            RE
          </Box>{' '}
          est dans ta poche
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 3,
            mx: { xs: 'auto', md: 0 },
            mb: 2,
            background: 'linear-gradient(90deg, #b026ff, #00e5ff)',
            borderRadius: '2px',
          }}
        />
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, mb: 3, maxWidth: 440, mx: { xs: 'auto', md: 0 } }}>
          Gratuite sur iPhone et Android. Installe l'appli, retrouve tes proches
          et découvre enfin quoi regarder ce soir.
        </Typography>
        <StoreButtons justifyContent={{ xs: 'center', md: 'flex-start' }} />
      </Box>

      {/* QR code: only useful when the visitor is not already on a phone. */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
          p: 1.25,
          borderRadius: '16px',
          bgcolor: '#fff',
          lineHeight: 0,
          boxShadow: '0 0 0 1px rgba(0, 229, 255, 0.5), 0 0 28px rgba(0, 229, 255, 0.3)',
        }}
      >
        <QRCodeSVG
          value={DOWNLOAD_PAGE_URL}
          size={136}
          level="M"
          bgColor="#ffffff"
          fgColor="#050815"
          title="QR code pour installer RE sur ton téléphone"
        />
      </Box>
    </Box>
  );
}
