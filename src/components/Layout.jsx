import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, pb: '56px' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
