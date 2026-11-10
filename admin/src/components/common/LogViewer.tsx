import React from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

interface LogViewerProps {
  logs: LogEntry[];
  title?: string;
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs, title = 'Terminal Log Viewer' }) => {
  return (
    <div style={{ backgroundColor: '#050a18', border: '1px solid #142142', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#94a3b8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #142142', paddingBottom: '6px', marginBottom: '8px', color: '#f8fafc', fontWeight: 700 }}>
        <span>💻 {title}</span>
        <span style={{ color: '#10b981' }}>● Live Stream</span>
      </div>

      <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {logs.map((lg) => (
          <div key={lg.id} style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#64748b' }}>[{lg.timestamp}]</span>
            <span style={{ color: lg.level === 'error' ? '#ef4444' : lg.level === 'warn' ? '#f59e0b' : '#38bdf8', fontWeight: 'bold' }}>
              [{lg.level.toUpperCase()}]
            </span>
            <span style={{ color: '#cbd5e1' }}>{lg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
