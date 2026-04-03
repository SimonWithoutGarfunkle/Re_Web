import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function formatBirthday(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Profile() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (!stored || !token) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const displayName = user.username || user.email || 'utilisateur';

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6, pb: 12 }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'rgba(10, 15, 45, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(176, 38, 255, 0.2)',
            borderRadius: '24px',
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
            animation: 'fadeInUp 0.6s ease both',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '60%',
              background: 'radial-gradient(ellipse, rgba(176,38,255,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Avatar + bonjour */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 84,
                height: 84,
                borderRadius: '22px',
                border: '2px solid rgba(176,38,255,0.6)',
                boxShadow: '0 0 24px rgba(176,38,255,0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                overflow: 'hidden',
                background: 'radial-gradient(circle at 30% 30%, rgba(176,38,255,0.4), rgba(10,15,40,0.8))',
              }}
            >
              {user.avatar ? (
                <Box
                  component="img"
                  src={user.avatar}
                  alt={displayName}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: '#b026ff' }}>
                  {displayName.charAt(0).toUpperCase()}
                </Typography>
              )}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Bonjour,{' '}
              <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 18px rgba(176,38,255,0.6)' }}>
                {displayName}
              </Box>{' '}
              !
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
              Voici tes informations
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(176,38,255,0.12)', mb: 3.5 }} />

          {/* Champs */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            {/* Username */}
            {user.username && (
              <TextField
                label="Nom d'utilisateur"
                value={user.username}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}

            {/* Email + badge non vérifié */}
            {user.email && (
              <Box>
                <TextField
                  label="Adresse email"
                  value={user.email}
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: user.isEmailVerified === false ? (
                        <InputAdornment position="end">
                          <WarningAmberIcon sx={{ color: '#ffb300', fontSize: 20 }} />
                        </InputAdornment>
                      ) : null,
                    },
                  }}
                />
                {user.isEmailVerified === false && (
                  <Box
                    sx={{
                      mt: 1,
                      px: 1.5,
                      py: 0.8,
                      borderRadius: '10px',
                      background: 'rgba(255, 179, 0, 0.08)',
                      border: '1px solid rgba(255, 179, 0, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <WarningAmberIcon sx={{ color: '#ffb300', fontSize: 16, flexShrink: 0 }} />
                    <Typography sx={{ color: 'rgba(255,179,0,0.9)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                      Adresse email non vérifiée. Un lien de confirmation a été envoyé à cette adresse.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Téléphone */}
            {user.telephone && (
              <TextField
                label="Téléphone"
                value={user.telephone}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}

            {/* Date de naissance */}
            {user.birthday && (
              <TextField
                label="Date de naissance"
                value={formatBirthday(user.birthday)}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}

          </Box>

          {/* Déconnexion */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogout}
            sx={{
              mt: 4,
              py: 1.2,
              border: '1px solid rgba(220, 50, 50, 0.7)',
              color: 'rgba(220, 80, 80, 0.9)',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid #ff3333',
                color: '#ff5555',
                bgcolor: 'rgba(255, 30, 30, 0.08)',
                boxShadow: '0 0 18px rgba(255, 50, 50, 0.4), 0 0 40px rgba(255, 50, 50, 0.15)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            SE DÉCONNECTER
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
