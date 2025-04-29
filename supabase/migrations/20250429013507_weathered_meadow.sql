/*
  # Create products schema with admin access control
  
  1. New Tables
    - `admin_users` - Stores admin user emails
    - `products` - Main products table with all fields
    - `certifications` - Product certifications
    - `customer_cases` - Customer success stories
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku_id text NOT NULL UNIQUE,
  name_internal text NOT NULL,
  name_display text NOT NULL,
  category_l1 text NOT NULL,
  category_l2 text NOT NULL,
  short_description text NOT NULL,
  long_description text,
  keywords text[] DEFAULT '{}',
  key_benefits text[] DEFAULT '{}',
  specifications jsonb DEFAULT '{}',
  scope_included text[] DEFAULT '{}',
  scope_excluded text[] DEFAULT '{}',
  standard_process text[] DEFAULT '{}',
  sla_description text,
  sla_metrics jsonb DEFAULT '{}',
  deliverable text,
  delivery_method text NOT NULL,
  base_price numeric NOT NULL,
  price_unit text NOT NULL,
  pricing_model text NOT NULL,
  tier_pricing_rules jsonb DEFAULT '[]',
  stock_type text NOT NULL,
  stock_level integer NOT NULL DEFAULT 0,
  image_urls text[] DEFAULT '{}',
  video_urls text[] DEFAULT '{}',
  channel_visibility text[] DEFAULT '{}',
  platform_specific_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create customer cases table
CREATE TABLE IF NOT EXISTS customer_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  company text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_cases ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow admin full access" ON products
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

-- Policies for certifications
CREATE POLICY "Allow public read access" ON certifications
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow admin full access" ON certifications
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

-- Policies for customer cases
CREATE POLICY "Allow public read access" ON customer_cases
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow admin full access" ON customer_cases
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

-- Insert initial admin user
INSERT INTO admin_users (email) VALUES ('admin@example.com');

-- Insert mock data
INSERT INTO products (
  sku_id, name_internal, name_display, category_l1, category_l2,
  short_description, long_description, keywords, key_benefits,
  specifications, scope_included, scope_excluded, standard_process,
  sla_description, sla_metrics, deliverable, delivery_method,
  base_price, price_unit, pricing_model, tier_pricing_rules,
  stock_type, stock_level, image_urls, channel_visibility
) VALUES
  (
    'AC-DIAG-001',
    'Remote AC Diagnostics - Small Office',
    '空调系统远程故障诊断 (≤5000 m²办公楼)',
    'digital',
    'remote-diagnostics',
    '专业技师远程诊断办公楼空调系统问题，无需等待上门服务',
    '我们的空调系统远程诊断服务为中小型办公楼提供专业的故障诊断和处理建议。通过远程连接，我们的专业技师可以快速准确地判断空调系统问题，为您节省时间和差旅成本。服务完成后，您将收到一份详细的诊断报告和处理建议。',
    ARRAY['空调维修', '远程诊断', '故障排查', '办公楼维护'],
    ARRAY['快速响应，无需等待上门', '专家在线指导，降低误判率', '节约差旅成本与时间', '提供标准化诊断报告', '可作为后续维修依据'],
    '{"适用面积": "≤5000 m²", "适用系统": "中央空调、分体式空调", "报告类型": "标准诊断报告", "咨询时长": "最长2小时"}'::jsonb,
    ARRAY['系统运行状态远程检查', '常见故障诊断', '排除简单故障的指导', '维修建议', '标准诊断报告'],
    ARRAY['实物部件更换', '现场服务', '非空调系统的问题', '超过2小时的咨询'],
    ARRAY['客户下单并提供系统信息', '安排专业技师进行远程连接', '远程诊断系统问题（2小时内响应）', '提供初步诊断和处理建议', '生成诊断报告（24小时内）', '发送报告并解答客户疑问'],
    '工作时间2小时内响应，24小时内出具诊断报告',
    '{"响应时间": "2小时", "报告交付": "24小时"}'::jsonb,
    '空调系统诊断报告（电子版）',
    'online',
    1200,
    'time',
    'fixed',
    '[]'::jsonb,
    'service',
    100,
    ARRAY['https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg', 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg'],
    ARRAY['website', 'wechat', '1688']
  );

-- Insert certifications
INSERT INTO certifications (product_id, name, image_url)
SELECT 
  id,
  'ISO9001',
  'https://images.pexels.com/photos/6266257/pexels-photo-6266257.jpeg'
FROM products 
WHERE sku_id = 'AC-DIAG-001';

-- Insert customer cases
INSERT INTO customer_cases (product_id, company, description, image_url)
SELECT 
  id,
  'ABC科技有限公司',
  '通过远程诊断，识别出空调系统控制阀故障，避免了不必要的现场检修，节省50%时间和成本',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
FROM products 
WHERE sku_id = 'AC-DIAG-001';