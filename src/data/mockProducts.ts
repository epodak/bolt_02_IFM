import { Product } from '../types/Product';

export const mockProducts: Product[] = [
  {
    id: '1',
    skuId: 'AC-DIAG-001',
    nameInternal: 'Remote AC Diagnostics - Small Office',
    nameDisplay: '空调系统远程故障诊断 (≤5000 m²办公楼)',
    categoryL1: 'digital',
    categoryL2: 'remote-diagnostics',
    shortDescription: '专业技师远程诊断办公楼空调系统问题，无需等待上门服务',
    longDescription: '我们的空调系统远程诊断服务为中小型办公楼提供专业的故障诊断和处理建议。通过远程连接，我们的专业技师可以快速准确地判断空调系统问题，为您节省时间和差旅成本。服务完成后，您将收到一份详细的诊断报告和处理建议。',
    keywords: ['空调维修', '远程诊断', '故障排查', '办公楼维护'],
    keyBenefits: [
      '快速响应，无需等待上门',
      '专家在线指导，降低误判率',
      '节约差旅成本与时间',
      '提供标准化诊断报告',
      '可作为后续维修依据'
    ],
    specifications: {
      '适用面积': '≤5000 m²',
      '适用系统': '中央空调、分体式空调',
      '报告类型': '标准诊断报告',
      '咨询时长': '最长2小时'
    },
    scopeIncluded: [
      '系统运行状态远程检查',
      '常见故障诊断',
      '排除简单故障的指导',
      '维修建议',
      '标准诊断报告'
    ],
    scopeExcluded: [
      '实物部件更换',
      '现场服务',
      '非空调系统的问题',
      '超过2小时的咨询'
    ],
    standardProcess: [
      '客户下单并提供系统信息',
      '安排专业技师进行远程连接',
      '远程诊断系统问题（2小时内响应）',
      '提供初步诊断和处理建议',
      '生成诊断报告（24小时内）',
      '发送报告并解答客户疑问'
    ],
    slaDescription: '工作时间2小时内响应，24小时内出具诊断报告',
    slaMetrics: {
      '响应时间': '2小时',
      '报告交付': '24小时'
    },
    deliverable: '空调系统诊断报告（电子版）',
    deliveryMethod: 'online',
    basePrice: 1200,
    priceUnit: 'time',
    pricingModel: 'fixed',
    stockType: 'service',
    stockLevel: 100,
    imageUrls: [
      'https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg',
      'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg'
    ],
    videoUrls: [
      'https://www.example.com/videos/ac-diagnostics.mp4'
    ],
    certifications: [
      {
        name: 'ISO9001',
        imageUrl: 'https://images.pexels.com/photos/6266257/pexels-photo-6266257.jpeg'
      }
    ],
    customerCases: [
      {
        id: 'case-001',
        company: 'ABC科技有限公司',
        description: '通过远程诊断，识别出空调系统控制阀故障，避免了不必要的现场检修，节省50%时间和成本',
        imageUrl: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
      }
    ],
    channelVisibility: ['website', 'wechat', '1688']
  },
  {
    id: '2',
    skuId: 'IFM-5S-001',
    nameInternal: '5S Onsite Training - 3 Days',
    nameDisplay: '工厂车间5S现场辅导与改善 (3天)',
    categoryL1: 'onsite',
    categoryL2: 'training-implementation',
    shortDescription: '专业讲师到现场进行5S培训并协助实施改善，提升车间管理水平',
    longDescription: '我们的5S现场辅导与改善服务由经验丰富的专业讲师提供，在3天时间内对您的工厂车间进行全面的5S（整理、整顿、清扫、清洁、素养）培训和实施指导。服务包括现场评估、针对性培训、实施计划制定和改善效果验收，帮助您的工厂提升现场管理水平，改善工作环境，提高生产效率。',
    keywords: ['5S管理', '现场改善', '精益生产', '工厂管理'],
    keyBenefits: [
      '专业讲师现场指导，确保正确实施',
      '针对性强，结合企业实际情况',
      '培训+实施双结合，见效快',
      '员工全员参与，形成持续改善文化',
      '提供持续改进计划和建议'
    ],
    specifications: {
      '服务天数': '3天',
      '培训人数': '最多30人',
      '适用场所': '工厂车间、仓库等',
      '讲师级别': '高级讲师'
    },
    scopeIncluded: [
      '5S基础知识培训（半天）',
      '现场评估与问题识别',
      '5S实施计划制定',
      '现场改善指导（2天）',
      '效果评估和持续改进建议',
      '改善前后对比报告'
    ],
    scopeExcluded: [
      '物料、设备的采购',
      '超出3天的服务',
      '30人以上的培训',
      'TPM等其他精益工具的培训'
    ],
    standardProcess: [
      '服务预约（提前7天）',
      '前期沟通与信息收集',
      '讲师进厂，开展培训',
      '现场评估与问题识别',
      '制定具体改善计划',
      '指导员工实施5S改善',
      '改善效果验收',
      '总结汇报与改进建议'
    ],
    slaDescription: '工作日期间提供服务，提前7天预约，讲师按时到达',
    slaMetrics: {
      '预约提前期': '7天',
      '服务完成': '3天内'
    },
    deliverable: '5S培训教材、改善前后对比报告、持续改进计划建议书',
    deliveryMethod: 'onsite',
    basePrice: 9800,
    priceUnit: 'set',
    pricingModel: 'fixed',
    tierPricingRules: [
      {
        minQty: 3,
        price: 8800
      },
      {
        minQty: 5,
        price: 7800
      }
    ],
    stockType: 'service',
    stockLevel: 15,
    imageUrls: [
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
      'https://images.pexels.com/photos/8297478/pexels-photo-8297478.jpeg'
    ],
    videoUrls: [
      'https://www.example.com/videos/5s-implementation.mp4'
    ],
    certifications: [
      {
        name: '精益生产管理认证',
        imageUrl: 'https://images.pexels.com/photos/6266259/pexels-photo-6266259.jpeg'
      }
    ],
    customerCases: [
      {
        id: 'case-002',
        company: 'XYZ制造有限公司',
        description: '通过3天的5S培训与实施，生产区域空间利用率提升30%，员工工作效率提高15%',
        imageUrl: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg'
      }
    ],
    channelVisibility: ['website', 'wechat', '1688']
  },
  {
    id: '3',
    skuId: 'IOT-PRED-001',
    nameInternal: 'AI Predictive Maintenance Sensor Kit - 10 Points',
    nameDisplay: 'AI预测性维护传感器套装 (10点位/含一年平台费)',
    categoryL1: 'physical',
    categoryL2: 'iot-solutions',
    shortDescription: '工业设备智能监测传感器套装，预测故障风险，提前预警',
    longDescription: '我们的AI预测性维护传感器套装包含10套工业级传感器（温度、振动、声音、电流），可监测关键设备的运行状态，通过AI算法分析预测潜在故障，提前7-30天预警。套装包含所有必要的硬件设备、一年的云平台服务费用、安装调试和基础培训。帮助企业从传统的"故障修复"模式转变为"预测维护"模式，降低维修成本，延长设备寿命。',
    keywords: ['预测性维护', 'AI监测', '工业传感器', '设备管理'],
    keyBenefits: [
      '提前7-30天预测设备故障风险',
      '减少计划外停机时间，提高设备可用率',
      '延长设备使用寿命20%-40%',
      '降低维护成本约30%',
      '基于云的平台，随时随地监控设备状态'
    ],
    specifications: {
      '传感器数量': '10套',
      '传感器类型': '温度、振动、声音、电流',
      '数据上传': '有线/无线双模式',
      '精度': '温度±0.5℃,振动±0.1g',
      '电池寿命': '≥1年（无线模式）',
      '平台服务期': '1年'
    },
    scopeIncluded: [
      '10套传感器设备（含安装附件）',
      '数据传输网关1台',
      '数据分析云平台账号（10点位/1年）',
      '现场安装调试',
      '基础操作培训（4小时）',
      '首年技术支持服务'
    ],
    scopeExcluded: [
      '超过10个点位的监测',
      '超过1年的云平台服务',
      '复杂环境的网络铺设',
      '设备本体的维修服务'
    ],
    standardProcess: [
      '购买确认后技术人员联系',
      '现场勘测，确定监测点位',
      '下单后7个工作日内安排安装',
      '传感器安装与调试',
      '云平台账号设置与参数配置',
      '操作培训与验收',
      '日常监测与技术支持'
    ],
    slaDescription: '7个工作日内完成安装，24小时内响应技术问题，严重告警10分钟内短信通知',
    slaMetrics: {
      '安装时间': '7个工作日内',
      '技术响应': '24小时内',
      '告警通知': '10分钟内'
    },
    deliverable: '传感器设备、网关、云平台账号、安装调试报告、操作手册',
    deliveryMethod: 'hybrid',
    basePrice: 29800,
    priceUnit: 'set',
    pricingModel: 'fixed',
    tierPricingRules: [
      {
        minQty: 2,
        price: 27800
      },
      {
        minQty: 5,
        price: 25800
      }
    ],
    stockType: 'physical',
    stockLevel: 50,
    imageUrls: [
      'https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg',
      'https://images.pexels.com/photos/3912976/pexels-photo-3912976.jpeg'
    ],
    videoUrls: [
      'https://www.example.com/videos/iot-predictive.mp4'
    ],
    certifications: [
      {
        name: 'CE认证',
        imageUrl: 'https://images.pexels.com/photos/6266260/pexels-photo-6266260.jpeg'
      },
      {
        name: '防爆认证',
        imageUrl: 'https://images.pexels.com/photos/6266261/pexels-photo-6266261.jpeg'
      }
    ],
    customerCases: [
      {
        id: 'case-003',
        company: '协鑫机械制造',
        description: '安装AI预测系统后，关键生产线停机时间减少65%，年节约维护成本约40万元',
        imageUrl: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg'
      }
    ],
    channelVisibility: ['website', '1688']
  },
  {
    id: '4',
    skuId: 'TRAINING-SAFETY-001',
    nameInternal: 'Online Safety Training with Certificate',
    nameDisplay: '企业安全生产线上直播培训 (4小时/含证书)',
    categoryL1: 'training',
    categoryL2: 'safety-compliance',
    shortDescription: '专业讲师线上培训，符合安全生产法规要求，提供培训合规证书',
    longDescription: '我们的企业安全生产线上直播培训由具有安全生产培训资质的专业讲师提供，内容涵盖最新的安全生产法规要求、常见安全隐患识别、应急处理措施等。培训采用线上直播形式，互动性强，便于企业组织员工统一参与。培训后提供有效的培训证书，满足企业安全生产培训的合规要求。',
    keywords: ['安全培训', '合规培训', '线上直播', '安全生产'],
    keyBenefits: [
      '符合最新安全生产法规要求',
      '无需员工出差，节省培训成本',
      '直播互动，提高培训效果',
      '培训结束颁发合规证书',
      '支持培训记录查询验证'
    ],
    specifications: {
      '培训时长': '4小时',
      '培训方式': '线上直播',
      '讲师资质': '安全工程师/注册安全培训师',
      '适用行业': '制造、建筑、物流等',
      '证书有效期': '1年'
    },
    scopeIncluded: [
      '安全生产法规解读',
      '行业常见安全隐患识别',
      '应急处理措施培训',
      '直播互动答疑',
      '培训考核测试',
      '培训合规证书'
    ],
    scopeExcluded: [
      '超过4小时的培训内容',
      '特种作业操作证培训',
      '行业特殊资质培训',
      '现场实操培训'
    ],
    standardProcess: [
      '企业提交培训申请',
      '确认培训时间和人员名单',
      '发送培训链接和预习资料',
      '线上直播培训（4小时）',
      '培训考核测试',
      '证书发放（电子版+纸质版）',
      '培训记录存档'
    ],
    slaDescription: '7个工作日内安排培训，培训后3个工作日内发放电子证书，7个工作日内寄送纸质证书',
    slaMetrics: {
      '培训安排': '7个工作日内',
      '电子证书': '3个工作日内',
      '纸质证书': '7个工作日内'
    },
    deliverable: '培训直播、培训资料、考核测试、培训证书（电子版+纸质版）',
    deliveryMethod: 'online',
    basePrice: 199,
    priceUnit: 'person',
    pricingModel: 'tiered',
    tierPricingRules: [
      {
        minQty: 10,
        price: 179
      },
      {
        minQty: 50,
        price: 159
      },
      {
        minQty: 100,
        price: 139
      }
    ],
    stockType: 'service',
    stockLevel: 500,
    imageUrls: [
      'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
      'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg'
    ],
    videoUrls: [
      'https://www.example.com/videos/safety-training.mp4'
    ],
    certifications: [
      {
        name: '安全培训资质证书',
        imageUrl: 'https://images.pexels.com/photos/6266262/pexels-photo-6266262.jpeg'
      }
    ],
    customerCases: [
      {
        id: 'case-004',
        company: '远大工程集团',
        description: '组织200名员工参加安全培训，全员通过考核，安全意识显著提升，安全事故发生率下降40%',
        imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg'
      }
    ],
    channelVisibility: ['website', 'wechat']
  }
];