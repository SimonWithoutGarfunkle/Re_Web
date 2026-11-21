import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DownloadCard from '../components/DownloadCard';
import { getAutoRedirectUrl } from '../utils/storeLinks';

// Target of the QR code and of any shared "download" link:
// phones go straight to their store, desktops see both stores.
export default function Download() {
  useEffect(() => {
    const url = getAutoRedirectUrl();
    if (url) window.location.replace(url);
  }, []);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="md" sx={{ animation: 'fadeInUp 0.6s ease both' }}>
        <DownloadCard headingComponent="h1" />
      </Container>
    </Box>
  );
}
