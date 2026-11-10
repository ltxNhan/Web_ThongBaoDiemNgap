import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Trình duyệt không hỗ trợ định vị GPS');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        // Default to Ho Chi Minh City center
        setCoords({ lat: 10.7769, lng: 106.7009 });
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { coords, error, loading, refreshLocation: requestLocation };
}
