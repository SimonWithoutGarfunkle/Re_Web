import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ObfuscatedEmail from './ObfuscatedEmail';
import { buildMailto } from '../utils/contactEmail';

// A real mailto: link (rendered client-side only, so it is absent from the
// served HTML) with the address shown below for webmail users.
export default function EmailAction({ subject, label = 'Nous écrire' }) {
  return (
    <Box>
      <Button variant="outlined" color="secondary" component="a" href={buildMailto(subject)} startIcon={<MailOutlineIcon />}>
        {label}
      </Button>
      <Typography sx={{ mt: 1.25, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <ObfuscatedEmail />
      </Typography>
    </Box>
  );
}
