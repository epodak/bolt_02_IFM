export interface Product {
  id: string;
  skuId: string;
  nameInternal: string;
  nameDisplay: string;
  categoryL1: 'digital' | 'onsite' | 'physical' | 'training' | 'bundle';
  categoryL2: string;
  shortDescription: string;
  longDescription: string;
  keywords: string[];
  keyBenefits: string[];
  specifications: Record<string, string>;
  scopeIncluded: string[];
  scopeExcluded: string[];
  standardProcess: string[];
  slaDescription: string;
  slaMetrics: Record<string, string>;
  deliverable: string;
  deliveryMethod: 'online' | 'onsite' | 'shipping' | 'platform' | 'hybrid';
  basePrice: number;
  priceUnit: 'time' | 'hour' | 'month' | 'year' | 'set' | 'area' | 'point' | 'person';
  pricingModel: 'fixed' | 'tiered' | 'subscription' | 'usage';
  tierPricingRules?: TierPricingRule[];
  stockType: 'physical' | 'service';
  stockLevel: number;
  imageUrls: string[];
  videoUrls?: string[];
  certifications?: Certification[];
  customerCases?: CustomerCase[];
  channelVisibility: string[];
  platformSpecificData?: Record<string, any>;
}

export interface TierPricingRule {
  minQty?: number;
  period?: string;
  price?: number;
  discount?: number;
}

export interface Certification {
  name: string;
  imageUrl: string;
}

export interface CustomerCase {
  id: string;
  company: string;
  description: string;
  imageUrl?: string;
}