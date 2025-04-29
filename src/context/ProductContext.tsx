import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types/Product';
import { supabase } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, certifications!certifications_product_id_fkey(*), customer_cases!customer_cases_product_id_fkey(*))')
        .returns<any[]>();

      if (productsError) {
        throw productsError;
      }

      if (productsData) {
        const formattedProducts = productsData.map(product => ({
          ...product,
          id: product.id,
          skuId: product.sku_id,
          nameInternal: product.name_internal,
          nameDisplay: product.name_display,
          categoryL1: product.category_l1,
          categoryL2: product.category_l2,
          shortDescription: product.short_description,
          longDescription: product.long_description,
          keyBenefits: product.key_benefits,
          scopeIncluded: product.scope_included,
          scopeExcluded: product.scope_excluded,
          standardProcess: product.standard_process,
          slaDescription: product.sla_description,
          slaMetrics: product.sla_metrics,
          basePrice: product.base_price,
          priceUnit: product.price_unit,
          pricingModel: product.pricing_model,
          tierPricingRules: product.tier_pricing_rules,
          stockType: product.stock_type,
          stockLevel: product.stock_level,
          imageUrls: product.image_urls,
          videoUrls: product.video_urls,
          channelVisibility: product.channel_visibility,
          certifications: product.certifications,
          customerCases: product.customer_cases
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};