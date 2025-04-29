import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { Edit, Trash2, PlusCircle, Search } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { products, deleteProduct } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.nameDisplay.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.skuId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除此产品吗？此操作不可逆。')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">产品管理</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            添加新产品
          </button>
        </div>
        
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="搜索产品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  产品名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  价格
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  库存/容量
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.skuId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.nameDisplay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {getCategoryName(product.categoryL1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatPrice(product.basePrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.stockLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="编辑">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800" 
                        title="删除"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">未找到匹配的产品</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">数据分析</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-800 mb-2">总产品数</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-800 mb-2">库存充足</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => p.stockLevel > 10).length}
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">库存不足</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => p.stockLevel <= 10).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;