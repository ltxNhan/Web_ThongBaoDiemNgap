import React, { useState } from 'react';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  pageSize = 10
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize) || 1;

  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ backgroundColor: '#0c1630', border: '1px solid #1c2b54', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#070f24', color: '#94a3b8', borderBottom: '1px solid #1c2b54' }}>
              {columns.map((col, idx) => (
                <th key={idx} style={{ padding: '12px 16px' }}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rIdx) => (
              <tr key={row.id ?? rIdx} style={{ borderBottom: '1px solid #142142' }}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx} style={{ padding: '12px 16px', color: '#f8fafc' }}>
                    {col.render ? col.render(row) : (row[col.accessor as keyof T] as any)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1c2b54', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
        <span>Trang {currentPage} / {totalPages} (Tổng số {data.length} bản ghi)</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: 'none',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Trước
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: 'none',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Sau →
          </button>
        </div>
      </div>
    </div>
  );
}
