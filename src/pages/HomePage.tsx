import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Clock, Award } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { products } = useProductContext();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                专业工业设施管理服务<br />
                <span className="text-orange-400">提升效率，降低成本</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                从远程诊断到现场执行，从设备维护到培训课程，我们为您的工业设施提供全方位专业服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center">
                  探索服务
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                <Link to="/contact" className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center">
                  联系我们
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img 
                src="https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg" 
                alt="工业设备维护" 
                className="rounded-lg shadow-lg max-w-full" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">我们的服务类别</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link to="/products?category=digital" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">数字化服务</h3>
              <p className="text-sm text-gray-600">
                远程诊断、在线咨询、软件平台服务
              </p>
            </Link>
            
            <Link to="/products?category=onsite" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">现场执行</h3>
              <p className="text-sm text-gray-600">
                设备维修、现场培训、5S/精益管理实施
              </p>
            </Link>
            
            <Link to="/products?category=physical" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">软硬一体</h3>
              <p className="text-sm text-gray-600">
                IoT解决方案、预测性维护系统、安全监控设备
              </p>
            </Link>
            
            <Link to="/products?category=training" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">培训课程</h3>
              <p className="text-sm text-gray-600">
                安全培训、设备操作培训、管理技能提升
              </p>
            </Link>
            
            <Link to="/products?category=bundle" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="bg-orange-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">组合套餐</h3>
              <p className="text-sm text-gray-600">
                年度维保、一站式解决方案、定制服务包
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">精选服务</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
              查看全部
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">我们的优势</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">专业团队</h3>
              <p className="text-gray-600">
                经验丰富的工程师和技术专家，提供专业服务
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">快速响应</h3>
              <p className="text-gray-600">
                紧急故障2小时内响应，远程诊断24小时内出报告
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">数据驱动</h3>
              <p className="text-gray-600">
                利用AI和数据分析，提供预测性维护和持续改进
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">品质保证</h3>
              <p className="text-gray-600">
                ISO9001认证，100%满意度保证，不满意全额退款
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            寻找专属您企业的工业设施管理方案？
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            无论是单次维修服务，还是长期维保合同，我们都能为您量身定制最优方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
              联系我们
            </Link>
            <Link to="/products" className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors">
              浏览服务目录
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;