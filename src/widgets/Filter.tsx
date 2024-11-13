
import React from 'react';

interface FilterOption {
  label: string;
  value: string | number;
}

interface FilterProps {
  label: string;
  filterValue: string | number;
  options: FilterOption[];
  onChange: (value: string | number) => void;
}

const Filter: React.FC<FilterProps> = ({ label, filterValue, options, onChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center mt-6 sm:mt-0">
  
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-0">
        <label 
          className="text-white font-semibold text-lg sm:text-base sm:mb-0 sm:mr-4"
          style={{ margin: '1rem' }}
        >
          {label}
        </label>

    
        <select
          value={filterValue}
          onChange={(e) => onChange(e.target.value)}
          className="m-1 p-3 sm:p-2 sm:pl-4 sm:pr-8 rounded-lg border border-gray-300 bg-white 
                     text-gray-700 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     hover:bg-indigo-50 transition duration-300 ease-in-out 
                     w-full sm:w-auto min-w-[14rem] h-14 sm:h-10" 
        >
          <option value="">All {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
