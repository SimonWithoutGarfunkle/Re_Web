import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2.5, sm: 2 },
        px: { xs: 2, sm: 4, lg: 8 },
        borderTop: '1px solid rgba(168,85,247,0.15)',
        background: 'rgba(5,0,16,0.7)',
        backdropFilter: 'blur(12px)',
        mt: 'auto',
      }}
    >
      <Box sx={{
        maxWidth: 1200, mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 1.5, sm: 0 },
        textAlign: { xs: 'center', sm: 'left' },
      }}>
        {/* Liens légaux */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Mentions légales', 'Politique de confidentialité'].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 1.5, display: { xs: 'none', sm: 'block' } }} />
              )}
              <Typography
                component="a" href="#"
                sx={{
                  color: 'rgba(248,250,252,0.45)',
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#a855f7' },
                  ...(i > 0 && { mt: { xs: 0.5, sm: 0 } }),
                }}
              >
                {label}
              </Typography>
            </React.Fragment>
          ))}
        </Box>

        {/* Copyright */}
        <Typography sx={{ color: 'rgba(248,250,252,0.3)', fontSize: '0.78rem' }}>
          © 2024 RE:
        </Typography>

        {/* Socials */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton href="#" aria-label="X / Twitter" size="small"
            sx={{ color: 'rgba(248,250,252,0.45)', '&:hover': { color: '#f8fafc', background: 'rgba(168,85,247,0.15)' } }}>
            <XIcon fontSize="small" />
          </IconButton>
          <IconButton href="#" aria-label="Instagram" size="small"
            sx={{ color: 'rgba(248,250,252,0.45)', '&:hover': { color: '#E1306C', background: 'rgba(225,48,108,0.12)' } }}>
            <InstagramIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
