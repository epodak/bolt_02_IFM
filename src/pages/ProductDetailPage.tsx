import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import PricingTable from '../components/PricingTable';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProductContext();
  const product = getProductById(id || '');
  
  const [activeTab, setActiveTab] = useState('description');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">产品未找到</h2>
        <p className="mb-8">抱歉，您查找的产品不存在或已被移除。</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
          返回产品列表
        </Link>
      </div>
    );
  }

  // Find related products (same category, but not the same product)
  const relatedProducts = products
    .filter(p => p.categoryL1 === product.categoryL1 && p.id !== product.id)
    .slice(0, 4);

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

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600">产品列表</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.categoryL1}`} className="hover:text-blue-600">
          {getCategoryName(product.categoryL1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.nameDisplay}</span>
      </div>
      
      {/* Product Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.imageUrls[0]} 
                alt={product.nameDisplay}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.imageUrls.map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.nameDisplay} - 图片 ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.nameDisplay}</h1>
            
            <p className="text-gray-700 mb-6">{product.shortDescription}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">核心价值：</h3>
              <ul className="space-y-2">
                {product.keyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">规格参数：</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="grid grid-cols-3">
                      <dt className="text-gray-600">{key}</dt>
                      <dd className="col-span-2">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            
            <PricingTable product={product} />
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('description')}
            >
              详细描述
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'scope'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('scope')}
            >
              服务范围
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'process'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('process')}
            >
              服务流程
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'delivery'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('delivery')}
            >
              交付物与承诺
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">服务详情</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{product.longDescription}</p>
                
                {/* Certifications */}
                {product.certifications && product.certifications.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">资质认证</h3>
                    <div className="flex flex-wrap gap-4">
                      {product.certifications.map((cert, index) => (
                        <div key={index} className="border rounded-md p-4 flex items-center space-x-3">
                          <img src={cert.imageUrl} alt={cert.name} className="w-12 h-12 object-contain" />
                          <span className="font-medium">{cert.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Customer Cases */}
                {product.customerCases && product.customerCases.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">客户案例</h3>
                    <div className="space-y-4">
                      {product.customerCases.map((caseItem, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            {caseItem.imageUrl && (
                              <img 
                                src={caseItem.imageUrl} 
                                alt={caseItem.company}
                                className="w-12 h-12 rounded-full object-cover mr-3"
                              />
                            )}
                            <h4 className="font-medium">{caseItem.company}</h4>
                          </div>
                          <p className="text-gray-700">{caseItem.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Scope Tab */}
          {activeTab === 'scope' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">服务范围</h2>
              
              <div className="mb-6">
                <div className="bg-green-50 rounded-md p-4">
                  <h3 className="font-medium text-green-800 mb-2">
                    包含内容
                  </h3>
                  <ul className="space-y-2">
                    {product.scopeIncluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-red-50 rounded-md p-4">
                  <h3 className="font-medium text-red-800 mb-2">
                    不包含内容
                  </h3>
                  <ul className="space-y-2">
                    {product.scopeExcluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Process Tab */}
          {activeTab === 'process' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">服务流程</h2>
              
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-6 ml-px border-l-2 border-dashed border-gray-300"></div>
                
                <div className="space-y-6">
                  {product.standardProcess.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center z-10">
                        {index + 1}
                      </div>
                      <div className="ml-4 bg-gray-50 rounded-md p-4 flex-grow">
                        <p>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Delivery Tab */}
          {activeTab === 'delivery' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">交付物与承诺</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">交付物</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p>{product.deliverable}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">服务等级承诺</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="mb-3">{product.slaDescription}</p>
                    {Object.entries(product.slaMetrics).length > 0 && (
                      <div className="border-t border-gray-200 pt-3">
                        <dl className="space-y-2">
                          {Object.entries(product.slaMetrics).map(([key, value], index) => (
                            <div key={index} className="grid grid-cols-2">
                              <dt className="text-gray-600">{key}</dt>
                              <dd className="font-medium">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">交付方式</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p>
                      {product.deliveryMethod === 'online' && '线上交付 (邮件、视频会议等)'}
                      {product.deliveryMethod === 'onsite' && '现场服务'}
                      {product.deliveryMethod === 'shipping' && '物流快递'}
                      {product.deliveryMethod === 'platform' && '平台账号访问'}
                      {product.deliveryMethod === 'hybrid' && '混合交付 (线上+线下)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">常见问题</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md">
            <button
              className="flex justify-between items-center w-full p-4 text-left font-medium"
              onClick={() => toggleSection('faq1')}
            >
              <span>如何预约此服务？</span>
              {expandedSection === 'faq1' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'faq1' && (
              <div className="px-4 pb-4">
                <p className="text-gray-700">
                  您可以直接在线下单购买，或通过页面上的"预约咨询"按钮预约我们的客服人员进行详细沟通。下单后，我们会在2小时内联系您确认需求细节和服务时间。
                </p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md">
            <button
              className="flex justify-between items-center w-full p-4 text-left font-medium"
              onClick={() => toggleSection('faq2')}
            >
              <span>此服务可以开具发票吗？</span>
              {expandedSection === 'faq2' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'faq2' && (
              <div className="px-4 pb-4">
                <p className="text-gray-700">
                  是的，我们可以提供增值税专用发票或普通发票。在下单时可以选择发票类型并填写开票信息，发票将在服务完成后7个工作日内开具并寄出。
                </p>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md">
            <button
              className="flex justify-between items-center w-full p-4 text-left font-medium"
              onClick={() => toggleSection('faq3')}
            >
              <span>如果服务不满意，可以退款吗？</span>
              {expandedSection === 'faq3' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'faq3' && (
              <div className="px-4 pb-4">
                <p className="text-gray-700">
                  我们承诺100%满意服务。如果您对服务不满意，可以在服务完成后3个工作日内提出，我们会重新安排服务或根据具体情况给予退款。对于未开始的服务，可全额退款；已开始但未完成的服务，将扣除已产生的成本后退还余款。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">相关服务推荐</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;