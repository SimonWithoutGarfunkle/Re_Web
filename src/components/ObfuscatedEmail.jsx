import Box from '@mui/material/Box';
import { EMAIL_USER, EMAIL_DOMAIN } from '../utils/contactEmail';

// Rendered as &#64; in HTML so basic email scrapers won't detect the address.
export default function ObfuscatedEmail({ sx }) {
  return (
    <Box
      component="span"
      sx={sx}
      dangerouslySetInnerHTML={{ __html: `${EMAIL_USER}&#64;${EMAIL_DOMAIN}` }}
    />
  );
}
