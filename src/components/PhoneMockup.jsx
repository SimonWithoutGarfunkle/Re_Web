import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LISTES = [
  { label: '🎬', gradient: 'linear-gradient(145deg, #8B1A1Acc, #5a1010aa)' },
  { label: '📺', gradient: 'linear-gradient(145deg, #1A3A8Bcc, #0d2260aa)' },
  { label: '📚', gradient: 'linear-gradient(145deg, #1A6B3Acc, #0e4226aa)' },
  { label: '🎮', gradient: 'linear-gradient(145deg, #6B4A1Acc, #3d2a0eaa)' },
];

const ACTIVITES = [
  { user: 'Marie', action: 'a ajouté Dune 2', emoji: '🎬', time: '2 min' },
  { user: 'Lucas', action: 'a complété le quiz', emoji: '🏆', time: '15 min' },
  { user: 'Sophie', action: 'a partagé une série', emoji: '📺', time: '1 h' },
];

export default function PhoneMockup() {
  return (
    <Box
      className="animate-float"
      sx={{
        position: 'relative',
        width: { xs: 230, sm: 265 },
        filter:
          'drop-shadow(0 0 28px rgba(0, 229, 255, 0.28)) drop-shadow(0 0 55px rgba(176, 38, 255, 0.18))',
      }}
    >
      {/* ── Phone frame ── */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 460, sm: 530 },
          borderRadius: '44px',
          background: 'linear-gradient(160deg, rgba(14, 18, 48, 0.97), rgba(5, 8, 22, 0.99))',
          border: '2px solid rgba(0, 229, 255, 0.32)',
          boxShadow:
            '0 0 0 4px rgba(5, 8, 22, 0.9), 0 0 0 5.5px rgba(0, 229, 255, 0.12), inset 0 0 40px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 85,
            height: 22,
            bgcolor: 'rgba(5, 8, 22, 0.99)',
            borderRadius: '0 0 14px 14px',
            zIndex: 10,
          }}
        />

        {/* Screen inner glow */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── Screen content ── */}
        <Box
          sx={{
            height: '100%',
            overflowY: 'auto',
            pt: '34px',
            pb: 3,
            px: 1.5,
            position: 'relative',
            zIndex: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {/* App header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.8,
              px: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box
                component="img"
                src="/logo_re_detour.png"
                alt="RE:"
                sx={{ width: 26, height: 26, filter: 'drop-shadow(0 0 4px rgba(0,229,255,0.5))' }}
              />
              <Box>
                <Typography sx={{ fontSize: '0.62rem', color: '#00e5ff', fontWeight: 700, lineHeight: 1.2 }}>
                  RE:
                </Typography>
                <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.2 }}>
                  Bienvenue, Thomas !
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8rem' }}>🔔</Typography>
          </Box>

          {/* Mes Listes */}
          <Typography sx={{ fontSize: '0.67rem', fontWeight: 700, color: '#fff', mb: 0.8, px: 0.5 }}>
            Mes Listes
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.8, mb: 1.8 }}>
            {LISTES.map((item, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: 52,
                  borderRadius: '10px',
                  background: item.gradient,
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          {/* Quiz du Jour */}
          <Typography sx={{ fontSize: '0.67rem', fontWeight: 700, color: '#fff', mb: 0.8, px: 0.5 }}>
            Quiz du Jour
          </Typography>
          <Box
            sx={{
              borderRadius: '12px',
              background: 'rgba(176, 38, 255, 0.12)',
              border: '1px solid rgba(176, 38, 255, 0.3)',
              p: 1.2,
              mb: 1.8,
            }}
          >
            <Typography sx={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.8)', mb: 0.9, lineHeight: 1.5 }}>
              🎬 Dans quel film apparaît ce personnage ?
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
              {['Interstellar', 'Inception', 'Dune', 'Avatar'].map((opt) => (
                <Box
                  key={opt}
                  sx={{
                    borderRadius: '6px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    py: 0.5,
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.65)' }}>
                    {opt}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Dernières Activités */}
          <Typography sx={{ fontSize: '0.67rem', fontWeight: 700, color: '#fff', mb: 0.8, px: 0.5 }}>
            Dernières Activités
          </Typography>
          {ACTIVITES.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                py: 0.75,
                px: 0.5,
                borderBottom: i < ACTIVITES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(176,38,255,0.45), rgba(0,229,255,0.35))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  flexShrink: 0,
                }}
              >
                {item.emoji}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: '0.55rem',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {item.user}
                  </Box>{' '}
                  <Box component="span" sx={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item.action}
                  </Box>
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                {item.time}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Home indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 3.5,
            bgcolor: 'rgba(255,255,255,0.25)',
            borderRadius: '2px',
          }}
        />
      </Box>
    </Box>
  );
}
