// src/components/questions/SearchFilter.tsx
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterPage: number | '';
  onFilterPageChange: (value: number | '') => void;
  onClearFilters: () => void;
  placeholder: string;
}

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  filterPage,
  onFilterPageChange,
  onClearFilters,
  placeholder
}: SearchFilterProps) => {
  const hasActiveFilters = searchTerm || filterPage !== '';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
        />
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="number"
            placeholder="Page"
            min="1"
            value={filterPage}
            onChange={(e) => onFilterPageChange(e.target.value ? parseInt(e.target.value) : '')}
            className="w-24 pl-10 pr-4 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};