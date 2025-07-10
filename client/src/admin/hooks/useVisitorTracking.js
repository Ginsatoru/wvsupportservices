import { useEffect } from 'react';
import axios from 'axios';

const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post('/api/track-visit', {
          path: window.location.pathname
        });
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Track initial page view
    trackVisit();

    // Track time spent on page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds
      axios.post('/api/track-engagement', {
        timeSpent,
        path: window.location.pathname
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

export default useVisitorTracking;