import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { sendContact } from '../api/contact';

const INITIAL = { name: '', email: '', title: '', message: '' };

function validate(vals) {
  const e = {};
  if (!vals.name.trim()) e.name = 'Nom requis';
  if (!vals.email.trim()) e.email = 'Email requis';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Email invalide';
  if (!vals.title.trim()) e.title = 'Sujet requis';
  if (!vals.message.trim()) e.message = 'Message requis';
  return e;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({ ...INITIAL, title: searchParams.get('sujet') ?? '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (ev) =>
    setValues((prev) => ({ ...prev, [field]: ev.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setServerError('');
    try {
      await sendContact({
        name: values.name.trim(),
        email: values.email.trim(),
        title: values.title.trim(),
        message: values.message.trim(),
      });
      setSuccess(true);
      setValues(INITIAL);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'rgba(10, 15, 45, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(176, 38, 255, 0.25)',
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
              background: 'radial-gradient(ellipse, rgba(176,38,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}>
              Nous{' '}
              <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 20px rgba(176,38,255,0.6)' }}>
                contacter
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
              Une question, une suggestion ? On te répond.
            </Typography>
          </Box>

          {success && (
            <Alert
              severity="success"
              sx={{ mb: 3, bgcolor: 'rgba(0,200,100,0.08)', color: '#5fffaa', border: '1px solid rgba(0,200,100,0.2)' }}
            >
              Message envoyé ! On te répondra dès que possible.
            </Alert>
          )}
          {serverError && (
            <Alert
              severity="error"
              sx={{ mb: 3, bgcolor: 'rgba(255,50,50,0.08)', color: '#ff8080', border: '1px solid rgba(255,50,50,0.2)' }}
            >
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Nom"
              value={values.name}
              onChange={handleChange('name')}
              error={Boolean(errors.name)}
              helperText={errors.name}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Adresse email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Sujet"
              value={values.title}
              onChange={handleChange('title')}
              error={Boolean(errors.title)}
              helperText={errors.title}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={5}
              value={values.message}
              onChange={handleChange('message')}
              error={Boolean(errors.message)}
              helperText={errors.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                      <MessageOutlinedIcon sx={{ color: 'rgba(176,38,255,0.55)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3.5 }}
            />

            <Button
              type="submit"
              variant="outlined"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                border: '1px solid rgba(176, 38, 255, 0.65)',
                color: '#b026ff',
                bgcolor: 'transparent',
                boxShadow: '0 0 10px rgba(176, 38, 255, 0.2)',
                fontWeight: 700,
                py: 1.4,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#b026ff',
                  bgcolor: 'rgba(176, 38, 255, 0.09)',
                  boxShadow: '0 0 22px rgba(176, 38, 255, 0.55), 0 0 45px rgba(176, 38, 255, 0.2)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#b026ff' }} /> : 'ENVOYER'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
