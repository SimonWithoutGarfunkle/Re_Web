import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [vals, setVals] = useState({ name: '', email: '', password: '' });
  const [errs, setErrs] = useState({});

  const validate = () => {
    const e = {};
    if (!vals.name.trim()) e.name = 'Nom requis';
    if (!vals.email) e.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(vals.email)) e.email = 'Email invalide';
    if (!vals.password) e.password = 'Mot de passe requis';
    else if (vals.password.length < 6) e.password = '6 caractères minimum';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrs(validate());
  };

  const set = (k) => (e) => {
    setVals((p) => ({ ...p, [k]: e.target.value }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: '' }));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 0, sm: 2 },
      py: { xs: 0, sm: 4 },
      background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(74,222,128,0.12) 0%, transparent 70%)',
    }}>
      <Card sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 420 },
        minHeight: { xs: '100vh', sm: 'auto' },
        borderRadius: { xs: 0, sm: 3 },
        border: { xs: 'none', sm: '1px solid rgba(74,222,128,0.25)' },
        boxShadow: { sm: '0 0 50px rgba(74,222,128,0.1)' },
        display: 'flex', flexDirection: 'column', justifyContent: { xs: 'center', sm: 'flex-start' },
      }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

          {/* Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box sx={{
              width: 54, height: 54, borderRadius: '50%',
              border: '2px solid #4ade80',
              background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(74,222,128,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
            }}>
              <AutoAwesomeIcon sx={{ color: '#4ade80', fontSize: 24 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Créer un compte</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Rejoignez la communauté RE:
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Nom complet"
              value={vals.name} onChange={set('name')}
              error={!!errs.name} helperText={errs.name}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#4ade80' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4ade80' },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'rgba(74,222,128,0.6)', fontSize: 20 }} /></InputAdornment>,
              }}
            />
            <TextField
              label="Adresse email" type="email"
              value={vals.email} onChange={set('email')}
              error={!!errs.email} helperText={errs.email}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#4ade80' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4ade80' },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'rgba(74,222,128,0.6)', fontSize: 20 }} /></InputAdornment>,
              }}
            />
            <TextField
              label="Mot de passe" type={showPwd ? 'text' : 'password'}
              value={vals.password} onChange={set('password')}
              error={!!errs.password} helperText={errs.password || '6 caractères minimum'}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#4ade80' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4ade80' },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'rgba(74,222,128,0.6)', fontSize: 20 }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd((v) => !v)} size="small" sx={{ color: 'rgba(248,250,252,0.4)' }}>
                      {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit" variant="contained" size="large" fullWidth
              sx={{
                mt: 0.5,
                background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                color: '#052e16', fontWeight: 800,
                boxShadow: '0 0 20px rgba(74,222,128,0.35)',
                '&:hover': { boxShadow: '0 0 32px rgba(74,222,128,0.55)', transform: 'translateY(-1px)' },
              }}
            >
              {"S'inscrire"}
            </Button>
          </Box>

          {/* Links */}
          <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {"Déjà un compte ? "}
              <Box component={Link} to="/login"
                sx={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none', '&:hover': { color: '#d8b4fe' } }}>
                Se connecter
              </Box>
            </Typography>
            <Box component={Link} to="/"
              sx={{ color: 'rgba(248,250,252,0.3)', fontSize: '0.8rem', textDecoration: 'none', '&:hover': { color: 'rgba(248,250,252,0.6)' } }}>
              ← Retour à l&apos;accueil
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
