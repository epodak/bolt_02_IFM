import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
}

interface FilterCategory {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFilterProps {
  categories: FilterCategory[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (categoryId: string, optionId: string) => {
    setFilters(prevFilters => {
      const categoryFilters = prevFilters[categoryId] || [];
      const updatedCategoryFilters = categoryFilters.includes(optionId)
        ? categoryFilters.filter(id => id !== optionId)
        : [...categoryFilters, optionId];
      
      const updatedFilters = {
        ...prevFilters,
        [categoryId]: updatedCategoryFilters
      };
      
      if (updatedCategoryFilters.length === 0) {
        delete updatedFilters[categoryId];
      }
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const countActiveFilters = () => {
    return Object.values(filters).reduce((count, options) => count + options.length, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">筛选</h2>
          
          {countActiveFilters() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              清除全部
              <X className="h-4 w-4 ml-1" />
            </button>
          )}
          
          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={toggleMobileFilters}
          >
            <Filter className="h-5 w-5 mr-1" />
            <span className="text-sm">筛选</span>
            {countActiveFilters() > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {countActiveFilters()}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className={`md:block ${showMobileFilters ? 'block' : 'hidden'}`}>
        {categories.map(category => (
          <div key={category.id} className="p-4 border-b border-gray-200 last:border-b-0">
            <h3 className="font-medium mb-2">{category.name}</h3>
            <div className="space-y-2">
              {category.options.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${category.id}-${option.id}`}
                    checked={(filters[category.id] || []).includes(option.id)}
                    onChange={() => handleFilterChange(category.id, option.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${category.id}-${option.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;