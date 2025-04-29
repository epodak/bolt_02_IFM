import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

const ProductListingPage: React.FC = () => {
  const { products, filteredProducts, setFilteredProducts } = useProductContext();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  useEffect(() => {
    // Filter products based on URL parameters
    let filtered = [...products];
    
    if (categoryParam) {
      filtered = filtered.filter(product => product.categoryL1 === categoryParam);
    }
    
    setFilteredProducts(filtered);
  }, [categoryParam, products, setFilteredProducts]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
    
    let sorted = [...filteredProducts];
    
    switch (sortValue) {
      case 'price-asc':
        sorted.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.nameDisplay.localeCompare(b.nameDisplay));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.nameDisplay.localeCompare(a.nameDisplay));
        break;
      default:
        // Default sorting or no sorting
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    console.log('Applied filters:', filters);
    // Implement actual filtering logic here based on the filters object
  };

  const toggleView = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filterCategories = [
    {
      id: 'category',
      name: '服务类别',
      options: [
        { id: 'digital', name: '数字化服务' },
        { id: 'onsite', name: '现场执行' },
        { id: 'physical', name: '软硬一体' },
        { id: 'training', name: '培训课程' },
        { id: 'bundle', name: '组合套餐' }
      ]
    },
    {
      id: 'priceRange',
      name: '价格范围',
      options: [
        { id: '0-1000', name: '¥1,000以下' },
        { id: '1000-5000', name: '¥1,000 - ¥5,000' },
        { id: '5000-10000', name: '¥5,000 - ¥10,000' },
        { id: '10000+', name: '¥10,000以上' }
      ]
    },
    {
      id: 'deliveryMethod',
      name: '交付方式',
      options: [
        { id: 'online', name: '线上交付' },
        { id: 'onsite', name: '现场服务' },
        { id: 'shipping', name: '物流发货' },
        { id: 'hybrid', name: '混合模式' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
          <ProductFilter 
            categories={filterCategories}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Product listing */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {categoryParam ? (
                    <>
                      {categoryParam === 'digital' && '数字化服务'}
                      {categoryParam === 'onsite' && '现场执行'}
                      {categoryParam === 'physical' && '软硬一体'}
                      {categoryParam === 'training' && '培训课程'}
                      {categoryParam === 'bundle' && '组合套餐'}
                    </>
                  ) : '所有服务'}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  显示 {filteredProducts.length} 个服务
                </p>
              </div>
              
              <div className="flex w-full sm:w-auto justify-between sm:justify-start items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    className={`p-2 ${
                      view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => toggleView('grid')}
                    aria-label="Grid view"
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    className={`p-2 ${
                      view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => toggleView('list')}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
                
                <button
                  className="md:hidden border rounded p-2 text-gray-600 flex items-center"
                  onClick={toggleFilters}
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  筛选
                </button>
                
                <div>
                  <select
                    className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">默认排序</option>
                    <option value="price-asc">价格: 从低到高</option>
                    <option value="price-desc">价格: 从高到低</option>
                    <option value="name-asc">名称: A-Z</option>
                    <option value="name-desc">名称: Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden mb-6">
              <ProductFilter 
                categories={filterCategories}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
          
          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">未找到匹配的服务</h2>
              <p className="text-gray-600 mb-4">
                尝试调整筛选条件或浏览我们的所有服务
              </p>
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                查看所有服务
              </button>
            </div>
          ) : (
            <div className={view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;