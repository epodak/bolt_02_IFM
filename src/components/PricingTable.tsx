import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, TierPricingRule } from '../types/Product';

interface PricingTableProps {
  product: Product;
}

const PricingTable: React.FC<PricingTableProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showTierDetails, setShowTierDetails] = useState(false);

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

  const getCalculatedPrice = () => {
    if (!product.tierPricingRules || product.tierPricingRules.length === 0) {
      return product.basePrice * quantity;
    }

    const applicableTier = [...product.tierPricingRules]
      .sort((a, b) => (b.minQty || 0) - (a.minQty || 0))
      .find(tier => (tier.minQty || 0) <= quantity);

    if (applicableTier) {
      if (applicableTier.price) {
        return applicableTier.price * quantity;
      } else if (applicableTier.discount) {
        return product.basePrice * quantity * applicableTier.discount;
      }
    }

    return product.basePrice * quantity;
  };

  const getUnitPrice = () => {
    if (!product.tierPricingRules || product.tierPricingRules.length === 0) {
      return product.basePrice;
    }

    const applicableTier = [...product.tierPricingRules]
      .sort((a, b) => (b.minQty || 0) - (a.minQty || 0))
      .find(tier => (tier.minQty || 0) <= quantity);

    if (applicableTier) {
      if (applicableTier.price) {
        return applicableTier.price;
      } else if (applicableTier.discount) {
        return product.basePrice * applicableTier.discount;
      }
    }

    return product.basePrice;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">价格与购买</h3>
        {product.tierPricingRules && product.tierPricingRules.length > 0 && (
          <button
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            onClick={() => setShowTierDetails(!showTierDetails)}
          >
            阶梯价格
            {showTierDetails ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        )}
      </div>

      {showTierDetails && product.tierPricingRules && (
        <div className="mb-4 bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">阶梯优惠价格</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-2">数量</th>
                <th className="text-right pb-2">单价</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">1+</td>
                <td className="text-right">{formatPrice(product.basePrice)}</td>
              </tr>
              {product.tierPricingRules.map((tier, index) => (
                <tr key={index} className={index === product.tierPricingRules!.length - 1 ? '' : 'border-b border-gray-200'}>
                  <td className="py-2">{tier.minQty}+</td>
                  <td className="text-right">
                    {tier.price 
                      ? formatPrice(tier.price)
                      : tier.discount
                        ? formatPrice(product.basePrice * tier.discount)
                        : formatPrice(product.basePrice)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-end mb-6">
        <div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-orange-600">
              {formatPrice(getUnitPrice())}
            </span>
            <span className="text-gray-500 ml-1">
              {getPriceUnit(product.priceUnit)}
            </span>
          </div>
          {quantity > 1 && (
            <div className="text-sm text-gray-500 mt-1">
              总价: {formatPrice(getCalculatedPrice())}
            </div>
          )}
        </div>
        
        <div className="flex items-center ml-auto">
          <span className="text-sm text-gray-700 mr-2">数量</span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 text-center border-0 focus:ring-0"
            />
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
          <ShoppingCart className="h-5 w-5 mr-2" />
          立即购买
        </button>
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
          添加到购物车
        </button>
        {product.basePrice > 5000 && (
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
            预约咨询
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingTable;