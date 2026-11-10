import React from 'react';
import { PhoneCall, Camera } from 'lucide-react';
import './FloatingSOS.css';

interface FloatingSOSProps {
  onQuickReport: () => void;
  onRequestRescue: () => void;
  showQuickReport?: boolean;
}

export const FloatingSOS: React.FC<FloatingSOSProps> = ({
  onQuickReport,
  onRequestRescue,
  showQuickReport = false
}) => {
  return (
    <div className="floating-sos-container">
      {showQuickReport && (
        <button className="floating-report-badge-btn" onClick={onQuickReport}>
          <Camera size={16} />
          Báo cáo ngập
        </button>
      )}

      <button className="floating-sos-btn" onClick={onRequestRescue}>
        <PhoneCall size={18} />
        CỨU HỘ KHẨN CẤP (114)
      </button>
    </div>
  );
};
