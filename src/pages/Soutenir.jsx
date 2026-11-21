import { createElement, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import StoreButtons from '../components/StoreButtons';
import EmailAction from '../components/EmailAction';
import { detectPlatform, DOWNLOAD_PAGE_URL as SHARE_URL } from '../utils/storeLinks';
const SHARE_TEXT = 'Rejoins-moi sur RE pour partager nos recos films, séries et livres !';

const CYAN = { rgb: '0, 229, 255', hex: '#00e5ff' };
const MAGENTA = { rgb: '255, 0, 200', hex: '#ff00c8' };

function ShareButton() {
  const [copied, setCopied] = useState(false);
  // Phones get the native share sheet; desktops copy the link.
  const canShare = detectPlatform() !== 'desktop' && typeof navigator.share === 'function';

  const handleClick = async () => {
    if (canShare) {
      try {
        await navigator.share({ title: 'RE', text: SHARE_TEXT, url: SHARE_URL });
      } catch {
        // Share sheet dismissed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the link stays visible below to copy by hand.
    }
  };

  const icon = canShare ? <IosShareIcon /> : copied ? <CheckIcon /> : <ContentCopyIcon />;
  return (
    <Box>
      <Button variant="outlined" color="secondary" startIcon={icon} onClick={handleClick}>
        {canShare ? 'Partager RE' : copied ? 'Lien copié !' : 'Copier le lien'}
      </Button>
      {!canShare && (
        <Typography sx={{ mt: 1.25, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', wordBreak: 'break-all' }}>
          {SHARE_URL}
        </Typography>
      )}
    </Box>
  );
}

const ACTIONS = [
  {
    icon: FavoriteBorderOutlinedIcon,
    title: 'Utilise RE',
    text: "C'est le meilleur des soutiens. Ajoute ce que tu regardes et ce que tu lis, partage tes coups de cœur : chaque reco rend l'app plus vivante, pour toi comme pour tes proches.",
    action: <StoreButtons justifyContent="flex-start" />,
  },
  {
    icon: GroupAddOutlinedIcon,
    title: 'Embarque tes proches',
    text: "RE prend tout son sens avec les gens que tu connais. Envoie le lien à ceux dont tu aimerais découvrir les goûts… et qui devraient découvrir les tiens.",
    action: <ShareButton />,
  },
  {
    icon: ChatBubbleOutlineIcon,
    title: 'Dis-nous tout',
    text: "Un bug, une idée, un truc qui t'agace ? On lit tous les messages, et ce sont vos retours qui décident de la suite. Les avis francs, positifs comme négatifs, sont les plus précieux.",
    action: <EmailAction subject="Retour sur RE" />,
  },
  {
    icon: StarBorderRoundedIcon,
    title: 'Laisse un avis',
    text: '30 secondes pour toi, un vrai coup de pouce pour nous : les notes et les avis aident RE à se faire une place dans les stores et à être découverte par d’autres.',
    action: <StoreButtons justifyContent="flex-start" review />,
  },
];

const ROADMAP = [
  {
    icon: SportsEsportsOutlinedIcon,
    title: <>De nouveaux <Box component="span" sx={{ whiteSpace: 'nowrap' }}>mini-jeux</Box></>,
    text: 'De nouveaux concepts de mini-jeux pour découvrir autrement les goûts de tes proches.',
  },
  {
    icon: LiveTvOutlinedIcon,
    title: 'Les séries saison par saison',
    text: 'Suis tes séries saison par saison, et partage ton avis sur chacune.',
  },
];

const cardSx = {
  height: '100%',
  borderRadius: '8px',
  background: 'rgba(10, 15, 45, 0.66)',
  border: '1px solid rgba(176, 38, 255, 0.24)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
};

function IconTile({ icon, accent }) {
  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: '8px',
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 44px',
        color: accent.hex,
        background: `rgba(${accent.rgb}, 0.08)`,
        border: `1px solid rgba(${accent.rgb}, 0.24)`,
        boxShadow: `0 0 18px rgba(${accent.rgb}, 0.16)`,
      }}
    >
      {createElement(icon, { fontSize: 'small' })}
    </Box>
  );
}

function CardHeader({ icon, title, accent, component = 'h2' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6, mb: 2 }}>
      <IconTile icon={icon} accent={accent} />
      <Typography component={component} variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
        {title}
      </Typography>
    </Box>
  );
}

export default function Soutenir() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">

        {/* ── Intro ── */}
        <Box sx={{ maxWidth: 780, mb: { xs: 4, md: 5 }, animation: 'fadeInUp 0.6s ease both' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.7rem' },
              fontWeight: 800,
              lineHeight: 1.08,
              mb: 2.5,
              textShadow: '0 2px 18px rgba(0,0,0,0.95), 0 0 34px rgba(176,38,255,0.5)',
            }}
          >
            L'aventure{' '}
            <Box component="span" sx={{ color: '#00e5ff', textShadow: '0 0 24px rgba(0,229,255,0.65)' }}>
              RE
            </Box>{' '}
            ne fait que{' '}
            <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 24px rgba(255,0,200,0.65)' }}>
              commencer
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.75,
              maxWidth: 660,
              textShadow: '0 1px 12px rgba(0,0,0,0.95)',
            }}
          >
            La première version de RE est disponible sur iPhone et Android. Ce n'est qu'une étape :
            on a plein d'idées pour la suite, et on veut la construire avec toi.
            <Box component="span" sx={{ display: 'block', mt: 1.5 }}>
              Deux devs, un projet passion : ce qui fera grandir RE, c'est toi ❤️
            </Box>
          </Typography>
        </Box>

        {/* ── Ways to help ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2.5,
            animation: 'fadeInUp 0.7s ease 0.08s both',
          }}
        >
          {ACTIONS.map(({ icon, title, text, action }) => (
            <Card key={title} sx={cardSx}>
              <CardContent sx={{ p: { xs: 3, md: 3.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader icon={icon} title={title} accent={CYAN} />
                <Typography sx={{ color: 'rgba(255,255,255,0.74)', lineHeight: 1.75, mb: 3 }}>
                  {text}
                </Typography>
                <Box sx={{ mt: 'auto' }}>{action}</Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* ── What's next ── */}
        <Box sx={{ mt: { xs: 7, md: 9 }, animation: 'fadeInUp 0.7s ease 0.16s both' }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 700, mb: 1.5 }}
          >
            Et{' '}
            <Box component="span" sx={{ color: '#ff00c8', textShadow: '0 0 18px rgba(255,0,200,0.6)' }}>
              ensuite
            </Box>{' '}
            ?
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, mb: 3 }}>
            Quelques exemples de ce qu'on prépare pour la suite… et ce n'est qu'un début.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              gap: 2.5,
            }}
          >
            {ROADMAP.map(({ icon, title, text }) => (
              <Card key={text} sx={cardSx}>
                <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                  <CardHeader icon={icon} title={title} accent={MAGENTA} component="h3" />
                  <Typography sx={{ color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>{text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.82)', mb: 2 }}>
              Une idée à ajouter à la liste ? Écris-nous, on lit tout.
            </Typography>
            <EmailAction subject="Idée pour RE" label="Écris-nous" />
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
