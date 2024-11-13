
import { Cartoon } from '@/utils/interface';
import React from 'react';

import { AiOutlineDownload } from 'react-icons/ai';

interface DownloadCSVProps {
  data: Cartoon[];
  headers:  (keyof Cartoon)[];
  filename?: string;
}


const DownloadCSV: React.FC<DownloadCSVProps> = ({ data, headers, filename = 'data.csv' }) => {
  const handleDownload = () => {
    const rows = data.map((item) => headers.map((header) => item[header]).join(','))
    console.log(rows, 'rows>>>>>')
    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <button
    onClick={handleDownload}
    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
  >
    <span>CSV</span>
    <AiOutlineDownload size={18} />
  </button>

    
    
  );
};

export default DownloadCSV;
