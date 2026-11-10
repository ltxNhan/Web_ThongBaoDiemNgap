import { useEffect, useState } from 'react';

export function useSocket() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // In real environment, connects to WebSocket or socket.io
    // Here we simulate live heartbeats
    const interval = setInterval(() => {
      setConnected(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { isConnected: connected };
}
