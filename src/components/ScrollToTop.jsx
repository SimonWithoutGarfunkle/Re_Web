import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    // Let the browser restore history entries and preserve anchor navigation.
    if (navigationType === 'POP' || location.hash) return;
    if (location.pathname === '/' && location.state?.scrollTo) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location, navigationType]);

  return null;
}
