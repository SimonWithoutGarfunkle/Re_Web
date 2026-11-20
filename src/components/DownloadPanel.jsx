import { useLayoutEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoreButtons from './StoreButtons';

export default function DownloadPanel() {
  const panelRef = useRef(null);
  const spacerRef = useRef(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const spacer = spacerRef.current;
    const footer = document.querySelector('footer');
    let frame = 0;

    const update = () => {
      frame = 0;
      const overlap = footer ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top) : 0;
      panel.style.setProperty('--footer-offset', `${overlap}px`);
      // Reserve room at the end so the last content can scroll clear of the panel.
      const height = `${panel.offsetHeight + 32}px`;
      if (spacer.style.height !== height) spacer.style.height = height;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(panel);
    observer.observe(document.body);
    if (footer) observer.observe(footer);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Box ref={spacerRef} aria-hidden="true" />
      <Box
        ref={panelRef}
        component="aside"
        aria-labelledby="download-title"
        sx={{
          position: 'fixed',
          right: { xs: 12, sm: 24 },
          bottom: 'calc(var(--footer-offset, 0px) + 16px + env(safe-area-inset-bottom, 0px))',
          width: { xs: 'calc(100% - 24px)', sm: 380 },
          maxWidth: 380,
          zIndex: 1090,
          p: { xs: 2, sm: 2.5 },
          borderRadius: '16px',
          border: '1px solid rgba(0, 229, 255, 0.4)',
          background: 'rgba(10, 15, 40, 0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 0 24px rgba(0,229,255,0.12), 0 8px 32px rgba(0,0,0,0.45)',
        }}
      >
        <Typography id="download-title" component="h2" sx={{ fontSize: '1.25rem', fontWeight: 800, mb: 1.5 }}>
          Rejoins-nous
        </Typography>
        <StoreButtons />
      </Box>
    </>
  );
}
