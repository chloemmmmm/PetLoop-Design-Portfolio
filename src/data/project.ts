export type ProjectMedia = {
  src: string
  alt: string
  caption?: string
  sourceNote: string
}

export const projectContent = {
  identity: {
    name: 'PetLoop',
    titleZh: '人宠情感闭环系统',
    titleEn: 'HUMAN–PET EMOTIONAL LOOP',
    positioning: 'Pet Wearable × Desktop Robot × Emotional Computing',
    summary: '通过宠物可穿戴设备采集行为与状态线索，经数据处理转化为可理解的信息，再通过桌面机器人与主人侧界面形成“感知—理解—回应”的双向交互闭环。',
  },
  problems: [
    { en: 'INVISIBLE', zh: '看不见', text: '宠物的行为与状态变化持续发生，但主人难以长期、连续地察觉这些变化。' },
    { en: 'HARD TO INTERPRET', zh: '读不懂', text: '叫声、动作与日常行为携带信息，但单一现象往往缺少足够语境，给主人带来理解门槛。' },
    { en: 'HARD TO RESPOND', zh: '无法回应', text: '即使发现了变化，当人与宠物不在同一空间时，也缺少及时、具象的互动反馈渠道。' },
  ],
  insights: [
    { index: '01', title: '从异常监测到日常状态理解', text: '项目把关注点从单次“是否异常”扩展到宠物每天的情绪、行为与状态变化，让反馈更贴近日常陪伴。' },
    { index: '02', title: '用多模态信息补充上下文', text: '课程研究同时讨论行为、声音、生理/运动等信息来源，并通过特征提取与分类思路构建状态理解路径，而不是依赖单一信号。' },
    { index: '03', title: '识别不是终点，回应才形成闭环', text: 'PetLoop 的核心价值被定义为“感知 → 处理 → 理解 → 回应”，桌面机器人承担远程具象反馈的角色。' },
  ],
  persona: {
    name: 'Luna',
    label: 'CORE USER PERSONA',
    text: '原项目以年轻宠物主人 Luna 作为核心用户画像，聚焦忙碌生活中对宠物状态、远程陪伴与反馈效率的关注。网站仅保留原汇报能够支持的需求方向，不额外虚构人口统计或使用数据。',
  },
  systemLoop: ['Pet', 'Wearable', 'Data / Interpretation', 'PetLoop Console', 'Owner', 'Desktop Robot', 'Pet'],
  dataPipeline: [
    { step: '01', title: 'Quantify behavior', text: '通过声音、视频/行为观察与 MPU6050 等运动信息，将宠物行为转为可处理的数据线索。' },
    { step: '02', title: 'Feature extraction', text: '声音侧以 MFCC 等特征思路、运动侧以加速度与行为特征进行整理，形成可用于分析的输入。' },
    { step: '03', title: 'Interpretation', text: '原项目提出 AI 情绪分类与机器学习行为分类的处理路径；网站不声明未经材料证明的准确率或临床能力。' },
  ],
  wearable: {
    eyebrow: 'WEARABLE / 01',
    title: 'Listening to what pets cannot say.',
    text: '从可穿戴形态草图、材料与版型测试，到传感器整合和宠物实际穿戴，原项目通过实体制作验证信息采集装置如何真正进入宠物日常。',
  },
  robot: {
    eyebrow: 'DESKTOP ROBOT / 02',
    title: 'Turning data into presence.',
    text: '桌面机器人从机械结构与零件搭建逐步转向交互终端，原汇报明确记录了“语音 + 屏幕双重交互”的演进方向，用于把状态信息转化为可感知的陪伴反馈。',
  },
  productExperience: {
    eyebrow: 'PRODUCT EXPERIENCE',
    title: 'DATA BECOMES EXPERIENCE.',
    text: '求职精简版进一步把 PetLoop 延伸为完整 Console：包括宠物状态总览、情绪与健康信息、多端响应式界面与 Service Journey。网站以这套已存在的视觉系统作为 GUI 基线。',
  },
  reflection: {
    title: 'From object to connected experience.',
    text: 'PetLoop 的设计重点并不落在某一个单独硬件上，而是把研究、可穿戴设备、数据解释、桌面机器人与数字界面串成一个闭环体验。独立站将这些已有证据重新组织为面向求职的产品设计叙事。',
  },
  media: {
    hero: { src: 'assets/brand/hero-pet.webp', alt: 'PetLoop 项目中的宠物猫场景', sourceNote: '求职精简版 PetLoop 封面页，裁切并压缩用于网页 Hero。' },
    system: { src: 'assets/research/system-map.webp', alt: 'PetLoop 人宠情感闭环系统图', sourceNote: '课程汇报系统图页，压缩用于系统章节参考。' },
    wearable: { src: 'assets/wearable/wearable-process.webp', alt: '宠物可穿戴设备草图、材料测试与穿戴原型制作过程', sourceNote: '课程汇报产品制作页，压缩用于 Wearable 章节。' },
    robot: { src: 'assets/robot/robot-build.webp', alt: 'PetLoop 桌面机器人零件与搭建过程', sourceNote: '课程汇报机器狗搭建过程页，压缩用于 Robot 章节。' },
    ui: { src: 'assets/ui/ui-suite.webp', alt: 'PetLoop Console 与多端产品界面设计', sourceNote: '求职精简版 PetLoop GUI 展示页，压缩用于 Product Experience。' },
  } satisfies Record<string, ProjectMedia>,
} as const
