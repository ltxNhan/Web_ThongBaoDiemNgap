import { useState, useEffect } from 'react';
import { FloodPoint, Station } from '../types';
import { floodApi } from '../services/floodApi';

export function useFloodMap() {
  const [floodPoints, setFloodPoints] = useState<FloodPoint[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Tập trung lấy dữ liệu các điểm ngập (đã đồng bộ với tin báo người dân)
      const points = await floodApi.getFloodPoints();
      setFloodPoints(points);
      setStations([]); // Đã bỏ trạm đo lượng mưa IoT
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { floodPoints, stations, loading, reload: fetchData };
}
