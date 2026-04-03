import Box from '@mui/material/Box';

const U = 're.lasoce';
const D = 'gmail.com';

// Rendered as &#64; in HTML so basic email scrapers won't detect the address.
export default function ObfuscatedEmail({ sx }) {
  return (
    <Box
      component="span"
      sx={sx}
      dangerouslySetInnerHTML={{ __html: `${U}&#64;${D}` }}
    />
  );
}
