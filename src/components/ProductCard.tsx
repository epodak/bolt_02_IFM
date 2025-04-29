import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'digital':
        return 'bg-blue-100 text-blue-800';
      case 'onsite':
        return 'bg-green-100 text-green-800';
      case 'physical':
        return 'bg-purple-100 text-purple-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      case 'bundle':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'digital':
        return '数字化服务';
      case 'onsite':
        return '现场执行';
      case 'physical':
        return '软硬一体';
      case 'training':
        return '培训课程';
      case 'bundle':
        return '组合套餐';
      default:
        return category;
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(category)}`}>
      {getCategoryName(category)}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPriceUnit = (unit: string) => {
    switch (unit) {
      case 'time':
        return '/次';
      case 'hour':
        return '/小时';
      case 'month':
        return '/月';
      case 'year':
        return '/年';
      case 'set':
        return '/套';
      case 'area':
        return '/m²';
      case 'point':
        return '/点位';
      case 'person':
        return '/人';
      default:
        return '';
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full hover:shadow-lg transform hover:-translate-y-1">
        <div className="relative">
          <img 
            src={product.imageUrls[0]} 
            alt={product.nameDisplay} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <CategoryBadge category={product.categoryL1} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.nameDisplay}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-1">
              <span className="text-xl font-bold text-orange-600">
                {formatPrice(product.basePrice)}
              </span>
              <span className="text-gray-500 text-sm mt-1">
                {getPriceUnit(product.priceUnit)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {product.keyBenefits.slice(0, 2).map((benefit, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
                >
                  {benefit}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center">
                {product.certifications && product.certifications.length > 0 && (
                  <div className="flex space-x-1">
                    {product.certifications.slice(0, 2).map((cert, index) => (
                      <span 
                        key={index} 
                        className="text-xs text-gray-500 border border-gray-200 rounded px-1.5 py-0.5"
                        title={cert.name}
                      >
                        {cert.name.length > 4 ? cert.name.substring(0, 4) + '..' : cert.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <span className="text-blue-600 flex items-center text-sm font-medium group-hover:text-blue-800">
                了解更多
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;