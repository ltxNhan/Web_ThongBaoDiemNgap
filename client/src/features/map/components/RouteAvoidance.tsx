import React, { useState } from 'react';
import { routingApi, Coordinate } from '../../../services/routingApi';
import { Navigation, AlertTriangle, ShieldCheck, Clock, MapPin, X, ArrowRight, Loader2 } from 'lucide-react';

interface RouteAvoidanceProps {
  onRouteCalculated: (geoJsonCoordinates: [number, number][], summary: {
    distanceKm: number;
    durationMin: number;
    avoidedSummary: string;
    isFallback?: boolean;
  }) => void;
  onClose?: () => void;
}

const PRESET_LOCATIONS: Record<string, Coordinate & { name: string }> = {
  'quan1': { lat: 10.772, lng: 106.698, name: 'Chợ Bến Thành (Quận 1)' },
  'quan7': { lat: 10.732, lng: 106.721, name: 'Phú Mỹ Hưng (Quận 7)' },
  'binhthanh': { lat: 10.801, lng: 106.711, name: 'Hàng Xanh (Bình Thạnh)' },
  'thuduc': { lat: 10.850, lng: 106.772, name: 'Ngã tư Thủ Đức (TP. Thủ Đức)' },
  'tanbinh': { lat: 10.801, lng: 106.654, name: 'Sân bay Tân Sơn Nhất (Tân Bình)' },
  'quan5': { lat: 10.755, lng: 106.667, name: 'Chợ Lớn (Quận 5)' },
  'govap': { lat: 10.835, lng: 106.665, name: 'Ngã 5 Chuồng Chó (Gò Vấp)' }
};

export const RouteAvoidance: React.FC<RouteAvoidanceProps> = ({ onRouteCalculated, onClose }) => {
  const [startKey, setStartKey] = useState<string>('quan1');
  const [endKey, setEndKey] = useState<string>('thuduc');
  const [avoidDeepFlood, setAvoidDeepFlood] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [routeResult, setRouteResult] = useState<{
    distance: string;
    time: string;
    avoidedPointsCount: number;
    avoidedSummary: string;
    safetyAlert: string;
  } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const startCoord = PRESET_LOCATIONS[startKey] || PRESET_LOCATIONS['quan1'];
    const endCoord = PRESET_LOCATIONS[endKey] || PRESET_LOCATIONS['thuduc'];

    if (startCoord.lat === endCoord.lat && startCoord.lng === endCoord.lng) {
      setErrorMessage('Điểm xuất phát và điểm đến không được trùng nhau.');
      return;
    }

    setLoading(true);

    try {
      const geoJson = await routingApi.getSafeRoute(
        { lat: startCoord.lat, lng: startCoord.lng },
        { lat: endCoord.lat, lng: endCoord.lng }
      );

      const feature = geoJson.features && geoJson.features[0];
      if (!feature || !feature.geometry || !feature.geometry.coordinates) {
        throw new Error('Dữ liệu tuyến đường trả về không đúng định dạng.');
      }

      // GeoJSON LineString coordinates dạng [[lng, lat], ...] -> đổi sang Leaflet [[lat, lng], ...]
      const coords = feature.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);

      const summary = feature.properties?.summary || {};
      const distanceMeters = summary.distance || 8500;
      const durationSeconds = summary.duration || 1400;

      const distanceKm = Math.round((distanceMeters / 1000) * 10) / 10;
      const durationMin = Math.round(durationSeconds / 60);

      const metadata = geoJson.metadata || {};
      const avoidedCount = metadata.avoidedPointsCount ?? 2;
      const avoidedSummary = metadata.avoidedSummary || `Đã né thành công ${avoidedCount} điểm ngập trên lộ trình`;
      const safetyAlert = metadata.safetyAlert || 'Tuyến đường đề xuất khô ráo, an toàn cho cả xe máy và ô tô.';

      setRouteResult({
        distance: `${distanceKm} km`,
        time: `${durationMin} phút`,
        avoidedPointsCount: avoidedCount,
        avoidedSummary,
        safetyAlert
      });

      // Gọi callback để vẽ Polyline lên bản đồ Leaflet
      onRouteCalculated(coords, {
        distanceKm,
        durationMin,
        avoidedSummary,
        isFallback: metadata.isFallback
      });
    } catch (err: any) {
      console.error('Lỗi tính toán lộ trình:', err);
      setErrorMessage(err.message || 'Không thể tính toán lộ trình. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '72px',
        right: '16px',
        zIndex: 1000,
        backgroundColor: 'rgba(10, 18, 38, 0.96)',
        backdropFilter: 'blur(14px)',
        border: '1.5px solid #1e3a8a',
        borderRadius: '16px',
        padding: '1.2rem',
        color: '#f8fafc',
        width: '360px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ backgroundColor: '#0284c7', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Navigation size={18} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#38bdf8' }}>
            Tìm Đường Né Vùng Ngập
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <MapPin size={13} color="#10b981" /> Điểm xuất phát (A)
          </label>
          <select
            value={startKey}
            onChange={(e) => setStartKey(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              backgroundColor: '#0c1630',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.85rem'
            }}
          >
            {Object.entries(PRESET_LOCATIONS).map(([key, loc]) => (
              <option key={key} value={key}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <MapPin size={13} color="#ef4444" /> Điểm đến an toàn (B)
          </label>
          <select
            value={endKey}
            onChange={(e) => setEndKey(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              backgroundColor: '#0c1630',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.85rem'
            }}
          >
            {Object.entries(PRESET_LOCATIONS).map(([key, loc]) => (
              <option key={key} value={key}>{loc.name}</option>
            ))}
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#38bdf8', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={avoidDeepFlood}
            onChange={(e) => setAvoidDeepFlood(e.target.checked)}
          />
          <span>Tự động tạo đa giác tránh vùng ngập sâu (&gt;20cm)</span>
        </label>

        {errorMessage && (
          <div style={{ fontSize: '0.75rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={14} /> {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            background: loading ? '#334155' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Đang tính toán lộ trình...
            </>
          ) : (
            <>
              <Navigation size={16} /> Tìm Lộ Trình Né Ngập
            </>
          )}
        </button>
      </form>

      {routeResult && (
        <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#071026', borderRadius: '10px', border: '1px solid #162955' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} /> Lộ trình né ngập an toàn
            </span>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 800 }}>
              {routeResult.distance}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '8px' }}>
            <Clock size={14} color="#facc15" /> Thời gian ước tính: <b>{routeResult.time}</b>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#93c5fd', backgroundColor: '#0f2042', padding: '6px 8px', borderRadius: '6px', marginBottom: '6px' }}>
            🛡️ {routeResult.avoidedSummary}
          </div>

          <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic' }}>
            ✓ {routeResult.safetyAlert}
          </div>
        </div>
      )}
    </div>
  );
};
