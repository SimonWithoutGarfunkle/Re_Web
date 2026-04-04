import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { uploadAvatar, updateProfile, updateUsername, updateEmail, updatePassword } from '../api/user';

// ── Helpers ────────────────────────────────────────────────────────────────

function getUser() {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function patchLocalUser(patch) {
  try {
    const u = getUser() || {};
    localStorage.setItem('user', JSON.stringify({ ...u, ...patch }));
  } catch { /* noop */ }
}

// Normalise une date stockée en "YYYY-MM-DD" pour <input type="date">
function toDateInput(val) {
  if (!val) return '';
  return val.slice(0, 10); // "YYYY-MM-DD"
}

const USERNAME_RE = /^[A-Za-z0-9._-]+$/;

const PASSWORD_RULES = [
  { label: '8 caractères minimum', test: (p) => p.length >= 8 },
  { label: 'Une majuscule',        test: (p) => /[A-Z]/.test(p) },
  { label: 'Une minuscule',        test: (p) => /[a-z]/.test(p) },
  { label: 'Un chiffre',           test: (p) => /[0-9]/.test(p) },
];

function PasswordRulesHint({ password }) {
  if (!password) return null;
  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password);
        return (
          <Box
            key={rule.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.35,
              borderRadius: '20px',
              border: `1px solid ${ok ? 'rgba(0,200,100,0.4)' : 'rgba(255,255,255,0.12)'}`,
              bgcolor: ok ? 'rgba(0,200,100,0.07)' : 'transparent',
              transition: 'all 0.25s ease',
            }}
          >
            {ok
              ? <CheckCircleOutlineIcon sx={{ fontSize: 13, color: '#00c864' }} />
              : <RadioButtonUncheckedIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }} />
            }
            <Typography sx={{ fontSize: '0.72rem', color: ok ? '#00c864' : 'rgba(255,255,255,0.4)', transition: 'color 0.25s' }}>
              {rule.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// ── Sous-composants de section ──────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <Typography
      sx={{
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: '#b026ff',
        textTransform: 'uppercase',
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

function SaveButton({ loading, label = 'ENREGISTRER' }) {
  return (
    <Button
      type="submit"
      variant="outlined"
      size="small"
      disabled={loading}
      sx={{
        border: '1px solid rgba(176,38,255,0.65)',
        color: '#b026ff',
        fontWeight: 700,
        mt: 1.5,
        alignSelf: 'center',
        minWidth: 160,
        '&:hover': { bgcolor: 'rgba(176,38,255,0.09)', borderColor: '#b026ff' },
      }}
    >
      {loading ? <CircularProgress size={18} sx={{ color: '#b026ff' }} /> : label}
    </Button>
  );
}

function Feedback({ success, error }) {
  if (!success && !error) return null;
  return (
    <Alert
      severity={success ? 'success' : 'error'}
      sx={{
        mt: 1.5,
        fontSize: '0.82rem',
        ...(success
          ? { bgcolor: 'rgba(0,200,100,0.08)', color: '#5fffaa', border: '1px solid rgba(0,200,100,0.2)' }
          : { bgcolor: 'rgba(255,50,50,0.08)', color: '#ff8080', border: '1px solid rgba(255,50,50,0.2)' }),
      }}
    >
      {success || error}
    </Alert>
  );
}

// ── Page principale ─────────────────────────────────────────────────────────

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialUser = getUser();
  const [user, setUser] = useState(initialUser);

  // Avatar
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  // Infos (téléphone + birthday)
  const [info, setInfo] = useState({
    telephone: initialUser?.telephone || '',
    birthday: toDateInput(initialUser?.birthday),
  });
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoFeedback, setInfoFeedback] = useState({ success: '', error: '' });

  // Username
  const [username, setUsername] = useState(initialUser?.username || '');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameFeedback, setUsernameFeedback] = useState({ success: '', error: '' });

  // Email
  const [email, setEmail] = useState(initialUser?.email || '');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState({ success: '', error: '' });

  // Password
  const [pwd, setPwd] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdFeedback, setPwdFeedback] = useState({ success: '', error: '' });

  if (!initialUser) { navigate('/login'); return null; }

  const displayName = user?.username || user?.email || 'utilisateur';

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarLoading(true);
    setAvatarError('');
    try {
      const res = await uploadAvatar(file);
      const newUser = { ...user, avatar: res.url };
      setUser(newUser);
      patchLocalUser({ avatar: res.url });
    } catch (err) {
      setAvatarError(err.message);
    } finally {
      setAvatarLoading(false);
      e.target.value = '';
    }
  };

  const handleInfoSave = async (e) => {
    e.preventDefault();
    setInfoLoading(true);
    setInfoFeedback({ success: '', error: '' });
    try {
      const updated = await updateProfile({
        email: user.email,
        username: user.username,
        telephone: info.telephone.trim() || null,
        birthday: info.birthday || null,
      });
      const patch = { telephone: updated.telephone, birthday: updated.birthday };
      setUser((u) => ({ ...u, ...patch }));
      patchLocalUser(patch);
      setInfoFeedback({ success: 'Informations mises à jour.', error: '' });
    } catch (err) {
      setInfoFeedback({ success: '', error: err.message });
    } finally {
      setInfoLoading(false);
    }
  };

  const handleUsernameSave = async (e) => {
    e.preventDefault();
    const val = username.trim();
    if (val.length < 3 || val.length > 32) {
      setUsernameFeedback({ success: '', error: 'Entre 3 et 32 caractères.' });
      return;
    }
    if (!USERNAME_RE.test(val)) {
      setUsernameFeedback({ success: '', error: "Lettres, chiffres, points, tirets et underscores uniquement." });
      return;
    }
    setUsernameLoading(true);
    setUsernameFeedback({ success: '', error: '' });
    try {
      const res = await updateUsername(val);
      setUser((u) => ({ ...u, username: res.username }));
      patchLocalUser({ username: res.username });
      setUsernameFeedback({ success: 'Nom d\'utilisateur mis à jour.', error: '' });
    } catch (err) {
      setUsernameFeedback({ success: '', error: err.message });
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleEmailSave = async (e) => {
    e.preventDefault();
    const val = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailFeedback({ success: '', error: 'Email invalide.' });
      return;
    }
    setEmailLoading(true);
    setEmailFeedback({ success: '', error: '' });
    try {
      await updateEmail(val);
      setEmailFeedback({
        success: `Un lien de confirmation a été envoyé à ${val}. La modification sera effective après confirmation.`,
        error: '',
      });
    } catch (err) {
      setEmailFeedback({ success: '', error: err.message });
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!PASSWORD_RULES.every((r) => r.test(pwd.newPwd))) {
      setPwdFeedback({ success: '', error: 'Le mot de passe ne respecte pas les règles requises.' });
      return;
    }
    if (pwd.newPwd !== pwd.confirm) {
      setPwdFeedback({ success: '', error: 'Les mots de passe ne correspondent pas.' });
      return;
    }
    setPwdLoading(true);
    setPwdFeedback({ success: '', error: '' });
    try {
      await updatePassword(pwd.current, pwd.newPwd);
      // Déconnexion forcée après succès
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      setPwdFeedback({ success: '', error: err.message });
      setPwdLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'flex-start', py: 6, pb: 12 }}>
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

          {/* ── Avatar ── */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <Tooltip title="Changer la photo" placement="top">
              <Box
                onClick={() => !avatarLoading && fileInputRef.current?.click()}
                sx={{
                  position: 'relative',
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
                  cursor: 'pointer',
                  '&:hover .avatar-overlay': { opacity: 1 },
                }}
              >
                {avatarLoading ? (
                  <CircularProgress size={28} sx={{ color: '#b026ff' }} />
                ) : user?.avatar ? (
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
                {/* Overlay caméra */}
                <Box
                  className="avatar-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <CameraAltOutlinedIcon sx={{ color: '#fff', fontSize: 26 }} />
                </Box>
              </Box>
            </Tooltip>
            {avatarError && (
              <Typography sx={{ color: '#ff8080', fontSize: '0.8rem', mt: -1, mb: 1 }}>
                {avatarError}
              </Typography>
            )}

            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Bonjour,{' '}
              <Box component="span" sx={{ color: '#b026ff', textShadow: '0 0 18px rgba(176,38,255,0.6)' }}>
                {displayName}
              </Box>{' '}
              !
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(176,38,255,0.12)', mb: 3.5 }} />

          {/* ── Informations personnelles ── */}
          <SectionTitle>Informations personnelles</SectionTitle>
          <Box component="form" onSubmit={handleInfoSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Téléphone"
              type="tel"
              value={info.telephone}
              onChange={(e) => setInfo((s) => ({ ...s, telephone: e.target.value }))}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              label="Date de naissance"
              type="date"
              value={info.birthday}
              onChange={(e) => setInfo((s) => ({ ...s, birthday: e.target.value }))}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    '& input::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1) opacity(0.5)',
                      cursor: 'pointer',
                    },
                  },
                },
              }}
            />
            <Feedback {...infoFeedback} />
            <SaveButton loading={infoLoading} />
          </Box>

          <Divider sx={{ borderColor: 'rgba(176,38,255,0.12)', my: 3.5 }} />

          {/* ── Sécurité ── */}
          <SectionTitle>Sécurité</SectionTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

            {/* Username */}
            <Box component="form" onSubmit={handleUsernameSave} sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Feedback {...usernameFeedback} />
              <SaveButton loading={usernameLoading} />
            </Box>

            {/* Email */}
            <Box component="form" onSubmit={handleEmailSave} sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: user?.isEmailVerified === false ? (
                      <InputAdornment position="end">
                        <Tooltip title="Email non vérifié">
                          <WarningAmberIcon sx={{ color: '#ffb300', fontSize: 20 }} />
                        </Tooltip>
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0.75,
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: 14, mt: '2px', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                  Un lien de confirmation sera envoyé à la nouvelle adresse. La modification ne sera effective qu'après validation.
                </Typography>
              </Box>
              <Feedback {...emailFeedback} />
              <SaveButton loading={emailLoading} />
            </Box>

            {/* Password */}
            <Box component="form" onSubmit={handlePasswordSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Mot de passe actuel"
                type={showPwd ? 'text' : 'password'}
                value={pwd.current}
                onChange={(e) => setPwd((s) => ({ ...s, current: e.target.value }))}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPwd((v) => !v)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                          {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Box>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type={showPwd ? 'text' : 'password'}
                  value={pwd.newPwd}
                  onChange={(e) => setPwd((s) => ({ ...s, newPwd: e.target.value }))}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <PasswordRulesHint password={pwd.newPwd} />
              </Box>
              <TextField
                fullWidth
                label="Confirmer le nouveau mot de passe"
                type={showPwd ? 'text' : 'password'}
                value={pwd.confirm}
                onChange={(e) => setPwd((s) => ({ ...s, confirm: e.target.value }))}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'rgba(176,38,255,0.5)', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, color: 'rgba(255,255,255,0.35)' }}>
                <InfoOutlinedIcon sx={{ fontSize: 14, mt: '2px', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                  Tu seras déconnecté immédiatement après le changement de mot de passe.
                </Typography>
              </Box>
              <Feedback {...pwdFeedback} />
              <SaveButton loading={pwdLoading} label="CHANGER LE MOT DE PASSE" />
            </Box>

          </Box>

          {/* ── Déconnexion ── */}
          <Divider sx={{ borderColor: 'rgba(176,38,255,0.12)', mt: 4, mb: 3 }} />
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogout}
            sx={{
              py: 1.2,
              border: '1px solid rgba(220, 50, 50, 0.7)',
              color: 'rgba(220, 80, 80, 0.9)',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid #ff3333',
                color: '#ff5555',
                bgcolor: 'rgba(255, 30, 30, 0.08)',
                boxShadow: '0 0 18px rgba(255, 50, 50, 0.4)',
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
