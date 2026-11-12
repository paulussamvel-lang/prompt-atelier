const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const defaultNegative = "worst quality, low quality, normal quality, lowres, blurry, out of focus, jpeg artifacts, watermark, text, logo, signature, bad anatomy, bad hands, extra fingers, missing fingers, deformed, mutated, disfigured, poorly drawn face, poorly drawn hands, duplicate, cropped, oversaturated";

const dictionary = {
  "一位": "a",
  "年轻女性": "young woman",
  "年轻男人": "young man",
  "女性": "woman",
  "男人": "man",
  "女孩": "girl",
  "男孩": "boy",
  "人物": "person",
  "肖像": "portrait",
  "白色衬衫": "white shirt",
  "红色风衣": "red trench coat",
  "透明雨伞": "transparent umbrella",
  "黑色连衣裙": "black dress",
  "红色裙子": "red dress",
  "衬衫": "shirt",
  "连衣裙": "dress",
  "坐在": "sitting",
  "站在": "standing",
  "穿着": "wearing",
  "撑着": "holding",
  "阅读": "reading a book",
  "看向镜头": "looking at viewer",
  "微笑": "smiling",
  "窗边": "by the window",
  "室内": "indoors",
  "客厅": "living room",
  "卧室": "bedroom",
  "咖啡馆": "cafe",
  "街道": "street",
  "东京街头": "Tokyo street",
  "东京": "Tokyo",
  "森林": "forest",
  "花园": "garden",
  "海边": "seaside",
  "山": "mountains",
  "城市": "city",
  "百叶窗": "window blinds",
  "窗户": "window",
  "午后的阳光": "afternoon sunlight",
  "阳光": "sunlight",
  "阳光从窗户洒进来": "sunlight streaming through the window",
  "洒进来": "streaming in",
  "光影": "light and shadow",
  "柔和的光线": "soft lighting",
  "柔光": "soft light",
  "逆光": "backlighting",
  "轮廓光": "rim light",
  "体积光": "volumetric light",
  "安静": "quiet atmosphere",
  "安静的室内": "quiet indoor atmosphere",
  "温柔": "gentle mood",
  "温暖": "warm atmosphere",
  "暖色调": "warm color palette",
  "温柔的暖色调": "soft warm color palette",
  "冷色调": "cool color palette",
  "电影感": "cinematic",
  "电影摄影": "cinematic photography",
  "电影画面": "cinematic still",
  "胶片摄影": "analog film photography",
  "模拟胶片": "analog film",
  "35mm胶片": "35mm film",
  "时尚杂志": "fashion editorial",
  "极简": "minimalist",
  "二次元": "anime style",
  "动漫": "anime style",
  "插画": "illustration",
  "水彩": "watercolor",
  "油画": "oil painting",
  "写实": "photorealistic",
  "真实感": "photorealistic",
  "细腻": "delicate details",
  "细节丰富": "highly detailed",
  "皮肤质感": "detailed skin texture",
  "细腻的皮肤质感": "delicate skin texture",
  "清晰": "sharp focus",
  "高清": "high definition",
  "高分辨率": "high resolution",
  "浅景深": "shallow depth of field",
  "背景虚化": "bokeh background",
  "特写": "close-up",
  "半身": "upper body",
  "全身": "full body",
  "正面": "front view",
  "侧面": "side profile",
  "俯拍": "top-down view",
  "广角": "wide angle",
  "构图": "well-composed",
  "对称构图": "symmetrical composition",
  "居中构图": "centered composition",
  "木桌": "wooden table",
  "书": "book",
  "花": "flowers",
  "咖啡": "coffee",
  "窗帘": "curtains",
  "墙": "wall"
  ,"雨后的": "rain-soaked"
  ,"雨后": "after the rain"
  ,"霓虹灯": "neon lights"
  ,"倒映": "reflected"
  ,"湿润的路面": "wet pavement"
  ,"湿润路面": "wet pavement"
  ,"夜晚": "nighttime"
};

// Extra vocabulary keeps the offline mode useful for detailed ComfyUI captions.
const extendedDictionary = {
  "一个": "a", "一名": "a", "年轻男子": "young man", "年轻女孩": "young girl",
  "红色": "red", "橙色": "orange", "黄色": "yellow", "绿色": "green", "蓝色": "blue",
  "紫色": "purple", "粉色": "pink", "白色": "white", "黑色": "black", "灰色": "gray",
  "银色": "silver", "金色": "golden", "棕色": "brown", "米色": "beige",
  "明亮": "bright", "暗色": "dark", "柔和": "soft", "鲜明": "vivid", "透明": "transparent",
  "半透明": "translucent", "细长": "slender", "纤细": "slender", "高大": "tall", "娇小": "petite",
  "成熟": "mature", "年轻": "young", "独特": "distinctive", "复杂": "intricate", "简洁": "clean",
  "中年女性": "middle-aged woman", "中年男人": "middle-aged man", "模特": "model",
  "独行者": "solitary figure", "角色": "character", "脸": "face", "面部": "facial",
  "五官": "facial features", "眼睛": "eyes", "眼神": "gaze", "目光": "gaze",
  "红唇": "red lips", "长发": "long hair", "短发": "short hair", "黑发": "black hair",
  "棕色头发": "brown hair", "金色头发": "blonde hair", "卷发": "curly hair",
  "直发": "straight hair", "凌乱的头发": "messy hair", "飘逸的头发": "flowing hair",
  "白皙皮肤": "fair skin", "小麦色皮肤": "tanned skin", "雀斑": "freckles",
  "自然妆容": "natural makeup", "淡妆": "subtle makeup", "浓妆": "dramatic makeup",
  "优雅": "elegant", "精致": "refined", "英俊": "handsome", "美丽": "beautiful",
  "可爱": "cute", "严肃": "serious expression", "忧郁": "melancholic expression",
  "平静": "calm expression", "惊讶": "surprised expression", "表情": "facial expression",
  "身穿": "wearing", "黑色外套": "black jacket", "棕色皮夹克": "brown leather jacket",
  "蓝色牛仔裤": "blue jeans", "针织毛衣": "knitted sweater", "羊毛大衣": "wool coat",
  "丝绸长裙": "silk long dress", "结构感外套": "structured jacket", "围巾": "scarf",
  "手套": "gloves", "靴子": "boots", "高跟鞋": "high heels", "耳环": "earrings",
  "项链": "necklace", "帽子": "hat", "服装": "clothing", "面料": "fabric texture",
  "材质": "material texture", "皮革": "leather", "丝绸": "silk", "棉麻": "cotton and linen",
  "褶皱": "fabric folds", "刺绣": "embroidery", "拿着": "holding", "手持": "holding",
  "手放在": "hand resting on", "抬起手": "raising a hand", "伸出手": "reaching out",
  "回头": "looking back", "低头": "looking down", "仰望": "looking up", "凝视": "gazing",
  "闭着眼睛": "eyes closed", "张开双臂": "arms outstretched", "靠在": "leaning against",
  "倚靠": "leaning", "躺在": "lying on", "走在": "walking on", "奔跑": "running",
  "跳舞": "dancing", "弹吉他": "playing guitar", "翻阅书页": "turning book pages",
  "写字": "writing", "画画": "drawing", "喝咖啡": "drinking coffee", "抽烟": "smoking",
  "拥抱": "embracing", "看向远方": "looking into the distance", "彼此对视": "looking at each other",
  "大笑": "laughing", "皱眉": "frowning", "张嘴": "mouth slightly open",
  "老街": "old town street", "小巷": "narrow alley", "屋顶": "rooftop", "阳台": "balcony",
  "车站": "train station", "图书馆": "library", "教堂": "church", "博物馆": "museum",
  "商店": "shop", "市场": "market", "公园": "park", "湖边": "lakeside", "海滩": "beach",
  "云海": "sea of clouds", "山谷": "mountain valley", "古老建筑": "ancient architecture",
  "混凝土建筑": "concrete architecture", "极简主义住宅": "minimalist house", "背景中": "in the background",
  "前景中": "in the foreground", "清晨": "early morning", "黎明": "dawn", "黄昏": "dusk",
  "日落": "sunset", "日出": "sunrise", "午夜": "midnight", "雨天": "rainy weather",
  "雨滴": "raindrops", "薄雾": "mist", "雾气": "fog", "烟雾": "smoke", "云层": "clouds",
  "星空": "starry sky", "月光": "moonlight", "路灯": "street lamps", "灯光": "lights",
  "倒影": "reflection", "水面": "water surface", "湿润": "wet", "石材": "stone material",
  "黑色石材台面": "black stone countertop", "木质": "wooden texture", "玻璃": "glass",
  "金属": "metallic", "水珠": "water droplets", "尘埃": "dust particles", "魔法光尘": "magical glowing dust",
  "漂浮": "floating", "巨大": "massive", "宏伟": "grand", "狭窄": "narrow", "开阔": "spacious",
  "层次丰富": "rich depth", "空间感": "sense of space", "叙事感": "narrative atmosphere",
  "故事感": "storytelling quality", "氛围": "atmosphere", "宁静": "serene mood", "神秘": "mysterious mood",
  "梦幻": "dreamlike atmosphere", "戏剧性": "dramatic", "浪漫": "romantic mood", "孤独": "lonely mood",
  "怀旧": "nostalgic mood", "高对比度": "high contrast", "低饱和度": "low saturation",
  "柔和对比": "soft contrast", "鲜艳色彩": "vibrant colors", "单色调": "monochromatic palette",
  "互补色": "complementary colors", "色彩分级": "color grading", "景深": "depth of field",
  "散景": "bokeh", "运动模糊": "motion blur", "长曝光": "long exposure", "慢门": "slow shutter speed",
  "高角度": "high angle", "低角度": "low angle", "视线高度": "eye-level view", "肩部以上": "head and shoulders",
  "三分之二身": "three-quarter body", "前景": "foreground", "中景": "midground", "背景": "background",
  "留白": "negative space", "引导线": "leading lines", "三分法构图": "rule of thirds composition",
  "框架构图": "framing composition", "黄金比例": "golden ratio", "摄影棚": "studio",
  "工作室布光": "studio lighting", "自然光": "natural light", "窗光": "window light", "侧光": "side lighting",
  "顶光": "top lighting", "环境光": "ambient light", "边缘光": "edge light", "柔和阴影": "soft shadows",
  "深阴影": "deep shadows", "高光": "highlights", "超细节": "ultra detailed", "纹理丰富": "rich textures",
  "真实纹理": "realistic textures", "锐利细节": "crisp details", "高清细节": "high definition details",
  "柔和的侧光": "soft side lighting", "暖色的阳光": "warm sunlight", "冷色的月光": "cool moonlight",
  "光线从窗户照进来": "light entering through the window", "阳光照在脸上": "sunlight falling across the face",
  "背景虚化": "bokeh background", "细节清晰": "clear details", "画面干净": "clean image",
  "二十多岁": "in her twenties", "二十多岁的": "in her twenties", "三十多岁": "in her thirties", "三十多岁的": "in her thirties",
  "微卷": "slightly wavy", "微卷的": "slightly wavy", "黑色长发": "long black hair",
  "淡淡的雀斑": "subtle freckles", "米色针织毛衣": "beige knitted sweater", "深蓝色牛仔裤": "dark blue jeans",
  "老公寓": "old apartment", "木质窗台": "wooden windowsill", "窗台边": "by the windowsill", "翻开的书": "open book",
  "手里拿着": "holding", "低头阅读": "reading while looking down", "雨后的东京街头": "Tokyo street after the rain",
  "远处霓虹灯": "distant neon lights", "湿润的路面上": "on the wet pavement", "暖色阳光": "warm sunlight",
  "午后的暖色阳光": "warm afternoon sunlight", "落在她的脸上": "falling across her face", "咖啡杯": "coffee cup",
  "白色花朵": "white flowers", "几枝白色花朵": "a few white flowers", "房间里": "in the room",
  "二十多岁的年轻女性": "young woman in her twenties", "留着微卷的黑色长发": "with slightly wavy long black hair",
  "坐在老公寓的木质窗台边": "sitting by a wooden windowsill in an old apartment",
  "房间里有木桌、咖啡杯和几枝白色花朵": "a room with a wooden table, coffee cup, and a few white flowers",
  "午后的暖色阳光穿过百叶窗落在她的脸上": "warm afternoon sunlight passing through blinds and falling across her face",
  "远处霓虹灯映照在湿润的路面上": "distant neon lights reflected on the wet pavement",
  "窗外是": "outside the window is", "窗外": "outside the window", "映照在": "reflected on", "湿润的路面上": "the wet pavement",
  "阳光穿过百叶窗落在她的脸上": "sunlight passing through blinds and falling across her face", "穿过百叶窗落在她的脸上": "passing through blinds and falling across her face",
  "手里拿着一本翻开的书": "holding an open book", "一本": "a", "35mm胶片摄影": "35mm film photography", "真实面料纹理": "realistic fabric texture", "细腻皮肤质感": "delicate skin texture",
  "带有": "with", "带着": "with", "拥有": "with", "有着": "with", "留着": "with",
  "反射在": "reflected on", "映照在": "falling across", "覆盖着": "covered with",
  "摆放着": "with", "放在": "on", "位于": "located in", "充满": "filled with",
  "周围环绕着": "surrounded by", "远处是": "in the distance"
};

const promptLexicon = { ...dictionary, ...extendedDictionary };

// Phrase-level entries keep related visual details together before the generic
// vocabulary matcher gets a chance to split them apart.
const phraseLexicon = {
  "中年男性": "middle-aged man",
  "中年男人": "middle-aged man",
  "年轻人": "young person",
  "身穿深灰色羊毛大衣": "wearing a dark gray wool coat",
  "深灰色羊毛大衣": "dark gray wool coat",
  "废弃火车站": "abandoned train station",
  "废弃火车站的月台上": "the platform of an abandoned train station",
  "月台": "train platform",
  "昏黄的煤油灯": "dim yellow kerosene lamp",
  "煤油灯": "kerosene lamp",
  "右手握着一盏昏黄的煤油灯": "holding a dim yellow kerosene lamp in his right hand",
  "左手插在口袋里": "his left hand in his pocket",
  "风吹动他的围巾": "wind blowing his scarf",
  "疲惫而警觉": "tired and alert",
  "疲惫而警觉的神情": "tired and alert expression",
  "脸上带着疲惫而警觉的神情": "a tired and alert expression",
  "远处铁轨": "distant railroad tracks",
  "远处铁轨延伸进浓雾": "distant railroad tracks fading into dense fog",
  "浓雾": "dense fog",
  "冷蓝色月光": "cold blue moonlight",
  "煤油灯的暖黄色光线": "warm yellow lamplight",
  "冷蓝色月光与煤油灯的暖黄色光线交织": "cold blue moonlight interwoven with warm yellow lamplight",
  "空气中漂浮着细小尘埃": "tiny dust particles floating in the air",
  "孤独而紧张": "lonely and tense",
  "孤独而紧张的叙事氛围": "lonely and tense narrative atmosphere",
  "电影级构图": "cinematic composition",
  "50mm镜头": "50mm lens",
  "低机位": "low-angle view",
  "强烈明暗对比": "strong chiaroscuro",
  "高度细节": "highly detailed",
  "湿透白衬衫": "soaked white shirt",
  "穿着湿透白衬衫": "wearing a soaked white shirt",
  "破旧浴室": "old bathroom",
  "破旧浴室的瓷砖地面上": "the tiled floor of an old bathroom",
  "瓷砖地面": "tiled floor",
  "双手捂住脸": "covering their face with both hands",
  "天花板裂缝": "crack in the ceiling",
  "水从天花板裂缝滴落": "water dripping from a crack in the ceiling",
  "镜子里映出模糊的倒影": "a blurry reflection in the mirror",
  "模糊的倒影": "blurry reflection",
  "唯一的顶灯忽明忽暗": "the only ceiling light flickering",
  "蓝绿色冷色调": "blue-green cool color palette",
  "压抑": "oppressive mood",
  "超现实": "surreal mood",
  "颗粒感胶片摄影": "grainy film photography",
  "夜幕下的未来城市高架桥": "a futuristic city overpass at night",
  "未来城市高架桥": "futuristic city overpass",
  "成排无人驾驶汽车": "rows of self-driving cars",
  "成排无人驾驶汽车在雨中留下红色尾灯轨迹": "rows of self-driving cars leaving red taillight trails in the rain",
  "红色尾灯轨迹": "red taillight trails",
  "玻璃摩天大楼的立面反射着紫色霓虹": "glass skyscraper facades reflecting purple neon",
  "玻璃摩天大楼": "glass skyscrapers",
  "摩天大楼的立面": "skyscraper facades",
  "紫色霓虹": "purple neon",
  "画面前景有一把被遗忘的透明雨伞": "a forgotten transparent umbrella in the foreground",
  "被遗忘的透明雨伞": "forgotten transparent umbrella",
  "远处雾气笼罩建筑群": "distant buildings shrouded in fog",
  "建筑群": "building complex",
  "垂直构图": "vertical composition",
  "广角镜头": "wide-angle lens",
  "丰富层次": "rich depth"
};
Object.assign(promptLexicon, phraseLexicon);

const categories = [
  { key: "subject", label: "主体", terms: ["女性", "男人", "女孩", "男孩", "人物", "肖像", "模特", "角色", "脸", "面部", "眼睛", "眼神", "长发", "短发", "黑发", "白皙皮肤", "雀斑", "服装", "衬衫", "连衣裙", "外套", "阅读", "写字", "微笑", "大笑", "皱眉", "表情", "坐在", "站在", "走在", "奔跑", "拥抱", "看向镜头", "看向远方", "凝视", "穿着", "身穿"] },
  { key: "scene", label: "环境", terms: ["窗边", "室内", "客厅", "卧室", "咖啡馆", "街道", "东京街头", "老街", "小巷", "森林", "花园", "海边", "海滩", "湖边", "山", "山谷", "城市", "屋顶", "阳台", "车站", "图书馆", "教堂", "博物馆", "公园", "市场", "窗户", "百叶窗", "木桌", "书", "花", "咖啡", "墙", "前景", "中景", "背景", "背景中", "前景中", "建筑", "住宅"] },
  { key: "light", label: "光线", terms: ["阳光", "午后的阳光", "月光", "光影", "柔和的光线", "柔光", "窗光", "自然光", "环境光", "工作室布光", "侧光", "顶光", "逆光", "轮廓光", "边缘光", "体积光", "柔和阴影", "深阴影", "高光", "灯光", "路灯", "霓虹灯", "暖色调", "冷色调", "日落", "日出", "黎明", "黄昏"] },
  { key: "style", label: "风格", terms: ["电影感", "电影摄影", "电影画面", "胶片摄影", "模拟胶片", "35mm胶片", "时尚杂志", "fashion editorial", "极简", "二次元", "动漫", "插画", "水彩", "油画", "写实", "真实感", "浪漫", "梦幻", "怀旧", "神秘", "戏剧性", "叙事感", "故事感"] },
  { key: "detail", label: "质感", terms: ["细腻", "细节丰富", "超细节", "高清细节", "纹理丰富", "真实纹理", "皮肤质感", "面料", "材质", "皮革", "丝绸", "玻璃", "金属", "水珠", "湿润", "清晰", "高清", "高分辨率", "锐利细节", "浅景深", "背景虚化", "散景", "运动模糊", "长曝光", "特写", "半身", "全身", "肩部以上", "三分之二身", "正面", "侧面", "俯拍", "高角度", "低角度", "广角", "景深", "构图", "对称构图", "居中构图", "三分法构图", "框架构图", "黄金比例", "留白", "引导线", "前景", "中景", "背景"] }
];

const styleAdditions = {
  cinematic: ["cinematic composition", "cinematic color grading", "subtle film grain"],
  editorial: ["editorial photography", "refined styling", "art direction"],
  anime: ["anime aesthetic", "clean linework", "expressive eyes"],
  analog: ["analog texture", "35mm film grain", "natural color rendition"],
  minimal: ["minimal composition", "clean background", "visual restraint"]
};

const templates = [
  { number: "01", title: "人物肖像", desc: "适合角色立绘、人像摄影和带有明确情绪的面部特写。", tags: ["主体", "表情", "服装", "光线", "镜头"] },
  { number: "02", title: "电影场景", desc: "从环境与叙事气氛出发，组织成有空间感的电影静帧。", tags: ["主体", "环境", "时间", "光线", "色彩"] },
  { number: "03", title: "产品静物", desc: "让产品、材质、背景和布光各司其职，适合商业视觉。", tags: ["产品", "材质", "构图", "布光", "质感"] },
  { number: "04", title: "幻想世界", desc: "把抽象设定拆成可执行的世界观、建筑和氛围标签。", tags: ["世界观", "场景", "生物", "氛围", "细节"] },
  { number: "05", title: "建筑空间", desc: "强调透视、结构、材质与自然光，适合室内外空间探索。", tags: ["建筑", "视角", "材质", "自然光", "比例"] },
  { number: "06", title: "服装造型", desc: "将面料、版型、配饰与 editorial 影像语言组合起来。", tags: ["人物", "服装", "面料", "姿态", "摄影"] }
];

let history = JSON.parse(localStorage.getItem("prompt-atelier-history") || "[]");
let lastResult = { positive: "", negative: defaultNegative };

const modelProfiles = {
  sdxl: { badge: "S", label: "翻译为 SDXL 提示词", tag: "SDXL READY", heading: "把画面说清楚，<br /><em>让模型听懂。</em>", copy: "把自然语言或 ComfyUI 描述整理成结构清晰、可直接使用的 SDXL 标签提示词。", negative: true },
  turbo: { badge: "T", label: "翻译为 SDXL Turbo 提示词", tag: "TURBO READY", heading: "把画面说清楚，<br /><em>让模型听懂。</em>", copy: "为 SDXL Turbo 保留主体与关键风格，输出更短、更直接的生成提示词。", negative: true },
  pony: { badge: "P", label: "翻译为 Pony XL 提示词", tag: "PONY READY", heading: "把画面说清楚，<br /><em>让模型听懂。</em>", copy: "为 Pony Diffusion XL 保留质量评分前缀，并整理出适合模型的英文标签。", negative: true },
  krea2: { badge: "K", label: "翻译为 Krea 2 提示词", tag: "KREA 2 READY", heading: "把画面说清楚，<br /><em>让 Krea 2 画出来。</em>", copy: "Krea 2 使用七层 Mega-Stack：主体、尺度、材质、环境、光线、镜头和风格分层组织。", negative: false },
  minimaxh3: { badge: "H", label: "翻译为 MiniMax H3 提示词", tag: "H3 VIDEO READY", heading: "把画面说清楚，<br /><em>让 H3 动起来。</em>", copy: "MiniMax H3 使用带时间线的视听描述，并拆分为画面动作、环境声和配乐。", negative: false }
};

function cleanTerm(term) {
  return term.replace(/^[-+•·*\s]+/, "").replace(/[。！？!]+$/, "").trim();
}

function splitInput(source) {
  return source
    .replace(/[\r\n，；、。！？!;]+/g, ",")
    .split(",")
    .map(cleanTerm)
    .filter(Boolean);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mergeTranslationParts(parts) {
  return parts.map((part) => String(part || "").trim()).filter(Boolean).join(" ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

function translateMappedPhrase(term) {
  const normalized = term.replace(/[：:]/g, "").trim();
  if (!normalized) return { english: "", unresolved: "" };
  if (promptLexicon[normalized]) return { english: promptLexicon[normalized], unresolved: "" };
  if (!/[\u3400-\u9fff]/.test(normalized) && /[a-z]/i.test(normalized)) return { english: normalized, unresolved: "" };

  // Single-character entries such as 花 and 脸 are only safe as whole terms.
  const keys = Object.keys(promptLexicon)
    .filter((key) => /[\u3400-\u9fff]/.test(key) && key.length > 1)
    .sort((a, b) => b.length - a.length);
  const matcher = keys.length ? new RegExp(keys.map(escapeRegExp).join("|"), "g") : null;
  const parts = [];
  const unresolvedParts = [];
  let cursor = 0;
  if (matcher) {
    normalized.replace(matcher, (match, offset) => {
      const before = normalized.slice(cursor, offset);
      if (before && /^(?:和|以及|与)$/.test(before.trim())) parts.push(",");
      else if (before) unresolvedParts.push(before);
      parts.push(promptLexicon[match]);
      cursor = offset + match.length;
      return match;
    });
  }
  if (cursor < normalized.length) unresolvedParts.push(normalized.slice(cursor));
  const unresolved = unresolvedParts.join(" ")
    .replace(/[的了着在从和与及一位一个一名里边上中下是有几枝盏个条]/g, " ")
    .replace(/[()（）\[\]，；、。！？!]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { english: mergeTranslationParts(parts), unresolved };
}

function combineTranslation(parts, details) {
  return {
    english: mergeTranslationParts(parts),
    unresolved: mergeTranslationParts(details.map((detail) => detail.unresolved))
  };
}

function translateTermDetailed(term) {
  const normalized = term.replace(/[：:]/g, "").trim();
  if (!normalized) return { english: "", unresolved: "" };
  if (promptLexicon[normalized]) return { english: promptLexicon[normalized], unresolved: "" };
  if (!/[\u3400-\u9fff]/.test(normalized) && /[a-z]/i.test(normalized)) return { english: normalized, unresolved: "" };

  const translatePart = (value) => translateTermDetailed(value);
  const personMatch = normalized.match(/^(?:一位|一个|一名)?(?:穿着|身穿)(.+?)的(中年男性|中年男人|年轻女性|年轻男人|年轻男子|年轻人|女性|男人|女孩|男孩|模特)(.*)$/);
  if (personMatch) {
    const clothing = translatePart(personMatch[1]);
    const person = translatePart(personMatch[2]);
    const suffix = personMatch[3] ? translatePart(personMatch[3]) : { english: "", unresolved: "" };
    const personText = person.english || "person";
    const clothingText = clothing.english ? `wearing ${/^(a|an|the)\s/i.test(clothing.english) ? clothing.english : `a ${clothing.english}`}` : "";
    return combineTranslation([personText, clothingText, suffix.english], [clothing, suffix]);
  }

  const handMatch = normalized.match(/^(右手|左手)(?:握着|拿着|拿住|手持)(.+)$/);
  if (handMatch) {
    const object = translatePart(handMatch[2]);
    const side = handMatch[1] === "右手" ? "right" : "left";
    return combineTranslation([object.english ? `holding ${object.english} in the ${side} hand` : ""], [object]);
  }

  const pocketMatch = normalized.match(/^(左手|右手)插在口袋里$/);
  if (pocketMatch) return { english: `their ${pocketMatch[1] === "左手" ? "left" : "right"} hand in their pocket`, unresolved: "" };

  const faceMatch = normalized.match(/^脸上(?:带着|带有|有着)(.+?)(?:的)?神情$/);
  if (faceMatch) {
    const expression = translatePart(faceMatch[1]);
    return combineTranslation([expression.english ? `a ${expression.english} expression` : ""], [expression]);
  }

  const locationMatch = normalized.match(/^(.+?)(站在|跪在|坐在|躺在|走在)(.+)$/);
  if (locationMatch) {
    const actor = translatePart(locationMatch[1]);
    const place = translatePart(locationMatch[3]);
    const relation = { "站在": "standing on", "跪在": "kneeling on", "坐在": "sitting on", "躺在": "lying on", "走在": "walking on" }[locationMatch[2]];
    if (actor.english && place.english) return combineTranslation([actor.english, relation, place.english], [actor, place]);
  }

  const leadingLocationMatch = normalized.match(/^(站在|跪在|坐在|躺在|走在)(.+)$/);
  if (leadingLocationMatch) {
    const place = translatePart(leadingLocationMatch[2]);
    const relation = { "站在": "standing on", "跪在": "kneeling on", "坐在": "sitting on", "躺在": "lying on", "走在": "walking on" }[leadingLocationMatch[1]];
    if (place.english) return combineTranslation([relation, place.english], [place]);
  }

  const relationRules = [
    { pattern: /^(.+?)从(.+?)滴落$/, make: (match) => ["water dripping from", translatePart(match[2])], details: (match) => [translatePart(match[2])] },
    { pattern: /^(.+?)延伸进(.+)$/, make: (match) => [translatePart(match[1]), "extending into", translatePart(match[2])], details: (match) => [translatePart(match[1]), translatePart(match[2])] },
    { pattern: /^(.+?)与(.+?)交织$/, make: (match) => [translatePart(match[1]), "interwoven with", translatePart(match[2])], details: (match) => [translatePart(match[1]), translatePart(match[2])] },
    { pattern: /^(.+?)反射着(.+)$/, make: (match) => [translatePart(match[1]), "reflecting", translatePart(match[2])], details: (match) => [translatePart(match[1]), translatePart(match[2])] },
    { pattern: /^(.+?)在雨中留下(.+)$/, make: (match) => [translatePart(match[1]), "leaving", translatePart(match[2]), "in the rain"], details: (match) => [translatePart(match[1]), translatePart(match[2])] },
    { pattern: /^(.+?)映出(.+)$/, make: (match) => [translatePart(match[1]), "showing", translatePart(match[2])], details: (match) => [translatePart(match[1]), translatePart(match[2])] },
    { pattern: /^画面前景有(.+)$/, make: (match) => [translatePart(match[1]), "in the foreground"], details: (match) => [translatePart(match[1])] },
    { pattern: /^(.+?)笼罩(.+)$/, make: (match) => [translatePart(match[2]), "shrouded in", translatePart(match[1])], details: (match) => [translatePart(match[1]), translatePart(match[2])] }
  ];
  for (const rule of relationRules) {
    const match = normalized.match(rule.pattern);
    if (!match) continue;
    const pieces = rule.make(match);
    const english = pieces.map((piece) => typeof piece === "string" ? piece : piece.english);
    if (english.every(Boolean)) return combineTranslation(english, rule.details(match));
  }

  const lightMatch = normalized.match(/^(.+?)从(.+?)洒进来$/);
  if (lightMatch) {
    const light = translatePart(lightMatch[1]);
    const place = translatePart(lightMatch[2]);
    if (light.english && place.english) return combineTranslation([light.english, "streaming through", place.english], [light, place]);
  }

  const reflectionMatch = normalized.match(/^(.+?)倒映在(.+)$/);
  if (reflectionMatch) {
    const subject = translatePart(reflectionMatch[1]);
    const surface = translatePart(reflectionMatch[2]);
    if (subject.english && surface.english) return combineTranslation([subject.english, "reflected on", surface.english], [subject, surface]);
  }

  const withMatch = normalized.match(/^(.+?)(?:带着|带有|拥有|有)(.+)$/);
  if (withMatch && withMatch[1].length > 1 && withMatch[2].length > 1) {
    const owner = translatePart(withMatch[1]);
    const feature = translatePart(withMatch[2]);
    if (owner.english && feature.english) return combineTranslation([owner.english, "with", feature.english], [owner, feature]);
  }

  const relationalMatch = normalized.match(/^(.+?)(反射出|映出|照亮|穿过|笼罩着)(.+)$/);
  if (relationalMatch) {
    const first = translatePart(relationalMatch[1]);
    const second = translatePart(relationalMatch[3]);
    const relationMap = { "反射出": "reflecting", "映出": "showing", "照亮": "illuminating", "穿过": "passing through", "笼罩着": "covering" };
    if (first.english && second.english) return combineTranslation([first.english, relationMap[relationalMatch[2]], second.english], [first, second]);
  }

  const mapped = translateMappedPhrase(normalized);
  // Never emit disconnected fragments that mislead the image model.
  return mapped.unresolved ? { english: "", unresolved: mapped.unresolved } : mapped;
}

function translateTerm(term) {
  return translateTermDetailed(term).english;
}

function categoryFor(original) {
  if (/前景|中景|背景|镜头|景深|构图|角度|清晰|质感/.test(original)) return "detail";
  const matches = categories.filter((category) => category.terms.some((term) => original.toLowerCase().includes(term.toLowerCase())));
  if (matches.length) return matches[0].key;
  if (/穿|发|脸|眼|嘴|微笑|表情|衣|裙|外套|坐|站|走|看|手|拥抱/.test(original)) return "subject";
  if (/光|影|色调|日落|月光|灯|阴影/.test(original)) return "light";
  if (/摄影|画面|风格|氛围|感|胶片|杂志|写实/.test(original)) return "style";
  if (/材质|纹理|细节|镜头|景深|构图|角度|清晰|质感/.test(original)) return "detail";
  return "scene";
}

function parsePrompt(source) {
  const rawTerms = splitInput(source);
  const found = Object.fromEntries(categories.map((category) => [category.key, []]));
  const uncategorized = [];
  rawTerms.forEach((original, sourceIndex) => {
    const detail = translateTermDetailed(original);
    const english = detail.english;
    const category = categoryFor(original);
    const item = { original, english, unresolved: detail.unresolved, category, sourceIndex, confidence: detail.unresolved ? "partial" : "high" };
    found[category].push(item);
  });
  return { found, uncategorized, rawTerms, source };
}

function unique(items) {
  return [...new Set(items.map((item) => typeof item === "string" ? item : item.english).filter(Boolean))];
}

function selectedStyles() { return $$("[data-style].selected").map((chip) => chip.dataset.style); }

function detailMode() { return $("[data-detail-mode].selected")?.dataset.detailMode || "complete"; }

function currentModel() { return $("#modelSelect").value; }

function translatedItems(parsed) {
  return [...categories.flatMap((category) => parsed.found[category.key])]
    .filter((item) => item.english && !item.unresolved)
    .sort((a, b) => a.sourceIndex - b.sourceIndex);
}

function buildKrea2(parsed) {
  const values = (key) => unique((parsed.found[key] || [])
    .filter((item) => item.english && !item.unresolved)
    .sort((a, b) => a.sourceIndex - b.sourceIndex)
    .map((item) => item.english));
  const styles = unique(selectedStyles().flatMap((style) => styleAdditions[style] || []));
  const all = translatedItems(parsed).map((item) => item.english);
  const subject = values("subject");
  const scene = values("scene");
  const light = values("light");
  const style = unique([...values("style"), ...styles]);
  const detail = values("detail");
  const take = (items, fallback) => (items.length ? items.join(", ") : fallback);
  const scale = detail.filter((term) => /composition|view|angle|close-up|body|depth|foreground|background|lens|framing|perspective|wide/i.test(term));
  const material = detail.filter((term) => !scale.includes(term));
  const camera = detail.filter((term) => /composition|view|angle|close-up|body|lens|framing|perspective|depth of field|bokeh|wide/i.test(term));
  const blocks = [
    ["CORE — Subject & Structure", `The image centers on ${take(subject, take(all, "a clearly defined subject"))}. Preserve the stated actions, relationships, and visual hierarchy.`],
    ["SCALE — Size & Spatial Relationships", take(scale, "Clear subject scale, readable proportions, and stable spatial relationships between foreground, subject, and background.")],
    ["MATERIAL — Object & Surface", take(material, "Believable materials, tactile surface detail, and coherent texture on the main objects and clothing.")],
    ["ENVIRONMENT — Setting & Occupancy", take(scene, "A coherent environment that supports the subject, with readable foreground, midground, and background depth." )],
    ["LIGHT — Light & Color", take(light, "Natural, physically coherent lighting with controlled highlights, shadows, and color contrast." )],
    ["CAMERA — Lens & Composition", take(camera, "Intentional framing, perspective, and depth of field that keep the main subject visually dominant." )],
    ["STYLE — Texture & Rendering", take(style, "Cinematic visual language, refined rendering, coherent color palette, and polished image quality." )]
  ];
  return blocks.map(([title, content], index) => `${index + 1}. ${title}\n${content}`).join("\n\n");
}

function buildMiniMaxH3(parsed) {
  const items = translatedItems(parsed);
  const styles = selectedStyles().flatMap((style) => styleAdditions[style] || []);
  const visual = unique([...items.map((item) => item.english), ...styles]);
  const visualText = visual.length ? visual.join(", ") : "a cinematic scene";
  const sourceText = $("#sourceInput").value;
  const motion = /移动|走|奔跑|驶|飞|飘|风|雨|水|镜头|推|拉|摇|跟随|转身|抬起|落下|打开|关闭/.test(sourceText)
    ? "The subjects continue their described movement with natural physical motion and clear cause-and-effect."
    : "The scene develops subtly with natural breathing, small environmental motion, and stable subject identity.";
  return `integrated_multimodal_description: [Shot 1] Live-action, cinematic, ${visualText}. ${motion} The camera holds a clear composition and preserves the described appearance, spatial relationships, lighting, and visual style.\n\noverall_soundscape: Natural ambient sound matching the described environment, with subtle physical action sounds and no distracting noise.\n\nnon_diegetic_music: A restrained cinematic score that supports the mood and pacing without overpowering the scene.`;
}

function buildPositive(parsed) {
  const styles = selectedStyles().flatMap((style) => styleAdditions[style] || []);
  const allItems = categories.flatMap((category) => parsed.found[category.key]).filter((item) => item.english && !item.unresolved);
  const inSourceOrder = [...allItems].sort((a, b) => a.sourceIndex - b.sourceIndex);
  const allCategories = ["scene", "light", "style", "detail"];
  const grouped = ["subject", ...allCategories].flatMap((key) => unique(parsed.found[key].filter((item) => item.english && !item.unresolved)));
  const ordered = detailMode() === "complete" ? [...unique(inSourceOrder), ...styles] : [...grouped, ...styles];
  const compactTerms = detailMode() === "compact" ? ordered.filter((term) => !/cinematic composition|cinematic color grading|subtle film grain|quiet atmosphere|nostalgic mood|narrative atmosphere|storytelling quality|visual restraint/i.test(term)) : ordered;
  let output = unique(compactTerms).join(", ");
  const model = currentModel();
  if (model === "turbo") output = `(${output}), fast generation, simplified prompt`; 
  if (model === "pony") output = `score_9, score_8_up, ${output}, source_photo`; 
  if (model === "krea2") return buildKrea2(parsed);
  if (model === "minimaxh3") return buildMiniMaxH3(parsed);
  return output;
}

function updateModelUI() {
  const profile = modelProfiles[currentModel()] || modelProfiles.sdxl;
  $("#modelBadge").textContent = profile.badge;
  $("#translateLabel").textContent = profile.label;
  $("#resultTag").textContent = profile.tag;
  $("#headingCopy").textContent = profile.copy;
  $(".page-heading h1").innerHTML = profile.heading;
  $("#negativePanel").classList.toggle("model-hidden", !profile.negative);
  $("#negativeOutput").placeholder = profile.negative ? "negative prompt" : "当前模型不使用反向提示词";
  $("#tipText").textContent = profile.negative
    ? "SDXL 对具体的光线与材质词响应很好，建议把主体放在提示词最前面。"
    : currentModel() === "krea2"
      ? "Krea 2 已按 Mega-Stack 七层结构整理；需要生成画面文字时，请在原始描述中使用英文双引号。"
      : "H3 使用三段式视听结构；对白请保留原文，并在需要时补充镜头动作或时间点。";
}

function renderAnalysis(parsed) {
  const list = $("#categoryList");
  const escapeHtml = (value) => String(value || "").replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character]));
  const renderItem = (item) => {
    const unresolved = item.unresolved ? `<span class="unresolved-copy">待确认：${escapeHtml(item.unresolved)}</span>` : "";
    const result = item.english ? ` → ${escapeHtml(item.english)}` : " → 未识别英文";
    return `<span class="analysis-tag${item.unresolved || !item.english ? " unresolved" : ""}"><span class="tag-original">${escapeHtml(item.original)}</span>${result}${unresolved}</span>`;
  };
  const rows = categories.map((category) => {
    const items = parsed.found[category.key];
    if (!items.length) return "";
    return `<div class="category-row"><span class="category-name">${category.label}</span><div class="tag-cloud">${items.map(renderItem).join("")}</div></div>`;
  }).join("");
  const loose = parsed.uncategorized.length ? `<div class="category-row"><span class="category-name">其他</span><div class="tag-cloud">${parsed.uncategorized.map(renderItem).join("")}</div></div>` : "";
  list.innerHTML = rows + loose || `<div class="analysis-intro">没有识别到可拆分的标签，请补充更多画面细节。</div>`;
  const termCount = parsed.rawTerms.length;
  const allItems = [...categories.flatMap((category) => parsed.found[category.key]), ...parsed.uncategorized];
  const mappedCount = allItems.filter((item) => item.english && !item.unresolved).length;
  const unresolvedCount = allItems.filter((item) => item.unresolved || !item.english).length;
  const confidence = Math.min(98, Math.max(35, Math.round(58 + mappedCount * 5 + Math.min(termCount, 8) * 2 - unresolvedCount * 13)));
  $("#confidenceValue").textContent = `${confidence}%`;
  $("#confidenceBar").style.width = `${confidence}%`;
}

function tokenCount(value) { return value ? value.split(/[,\s]+/).filter(Boolean).length : 0; }

function showToast(message) {
  $("#toastText").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => $("#toast").classList.remove("show"), 2200);
}

function saveHistory(positive, negative) {
  history.unshift({ id: Date.now(), date: new Date().toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }), positive, negative });
  history = history.slice(0, 12);
  localStorage.setItem("prompt-atelier-history", JSON.stringify(history));
  updateHistoryCount();
}

function updateHistoryCount() { $("#historyCount").textContent = history.length; }

function translate() {
  const source = $("#sourceInput").value.trim();
  if (!source) { showToast("先输入一段画面描述"); $("#sourceInput").focus(); return; }
  const parsed = parsePrompt(source);
  const positive = buildPositive(parsed);
  $("#positiveOutput").value = positive;
  const profile = modelProfiles[currentModel()] || modelProfiles.sdxl;
  $("#negativeOutput").value = profile.negative ? defaultNegative : "";
  $("#positiveTokens").textContent = `${tokenCount(positive)} tokens`;
  $("#negativeTokens").textContent = `${tokenCount(profile.negative ? defaultNegative : "")} tokens`;
  renderAnalysis(parsed);
  $("#analysisState").textContent = "已完成";
  $(".analysis-state").classList.add("ready");
  lastResult = { positive, negative: profile.negative ? defaultNegative : "", model: currentModel() };
  saveHistory(positive, profile.negative ? defaultNegative : "");
  const allItems = [...categories.flatMap((category) => parsed.found[category.key]), ...parsed.uncategorized];
  const unresolved = allItems.filter((item) => item.unresolved || !item.english).length;
  const retained = allItems.filter((item) => item.english && !item.unresolved).length;
  const relationCount = allItems.filter((item) => /站在|跪在|坐在|躺在|走在|握着|拿着|插在|捂住|滴落|延伸进|交织|反射|映出|笼罩|穿过|倒映|洒进/.test(item.original)).length;
  $("#retentionStats").textContent = currentModel() === "krea2"
    ? `Krea 2 Mega-Stack · 7 层结构 · 已整理 ${retained} 个描述片段`
    : unresolved
    ? `已保留 ${retained} 个描述片段 · 已转换 ${relationCount} 个关系短语 · ${unresolved} 个待确认片段`
    : `已保留 ${retained} 个描述片段 · 已转换 ${relationCount} 个关系短语 · ${detailMode() === "complete" ? "完整模式" : "精炼模式"}`;
  if (unresolved) $("#tipText").textContent = `有 ${unresolved} 个描述片段待确认，已在分析区标出且不会混入提示词。`;
}

function copyText(value, label) {
  if (!value) { showToast("还没有可复制的提示词"); return; }
  const fallback = () => {
    const helper = document.createElement("textarea"); helper.value = value; document.body.appendChild(helper); helper.select(); document.execCommand("copy"); helper.remove(); showToast(`${label}已复制`);
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(value).then(() => showToast(`${label}已复制`)).catch(fallback);
  else fallback();
}

function downloadPrompt() {
  if (!lastResult.positive && !$("#positiveOutput").value) { showToast("请先生成提示词"); return; }
  const positive = $("#positiveOutput").value;
  const negative = $("#negativeOutput").value;
  const content = `MODEL\n${currentModel()}\n\nPROMPT\n${positive}${negative ? `\n\nNEGATIVE PROMPT\n${negative}` : ""}\n\nSTEPS ${$("#stepsInput").value} · CFG ${$("#cfgInput").value} · ${$("#sizeSelect").value}`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${currentModel()}-prompt.txt`; link.click(); URL.revokeObjectURL(link.href); showToast("提示词文件已下载");
}

function renderTemplates() {
  $("#templateGrid").innerHTML = templates.map((template) => `<article class="template-card"><span class="template-number">${template.number} / TEMPLATE</span><h3>${template.title}</h3><p>${template.desc}</p><div class="template-structure">${template.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><button class="use-template" data-template="${template.title}">载入这个结构 →</button></article>`).join("");
  $$(".use-template").forEach((button) => button.addEventListener("click", () => {
    const prompts = { 人物肖像: "一位有故事感的年轻女性，半身肖像，注视镜头，独特服装，柔和的侧光，浅景深，细腻皮肤质感", 电影场景: "雨后的老街，一位独行者站在路灯下，夜晚，湿润路面反射灯光，电影静帧，广角构图", 产品静物: "一只设计感玻璃香水瓶，放在黑色石材台面，微小水珠，戏剧性布光，商业产品摄影", 幻想世界: "漂浮在云海之上的古老图书馆，巨大拱门，魔法光尘，幻想艺术，细节丰富", 建筑空间: "极简主义混凝土住宅，落地窗，自然光，室内植物，建筑摄影，干净构图", 服装造型: "时装杂志封面，一位模特穿着结构感外套，布料纹理，工作室布光，editorial photography" };
    $("#sourceInput").value = prompts[button.dataset.template] || "";
    navigate("workspace"); translate();
  }));
}

function renderHistory() {
  const list = $("#historyList");
  if (!history.length) { list.innerHTML = `<div class="history-empty">这里还没有生成记录</div>`; return; }
  list.innerHTML = history.map((item) => `<article class="history-item"><span class="history-date">${item.date}</span><span class="history-preview">${item.positive}</span><button class="load-history" data-history-id="${item.id}">载入</button></article>`).join("");
  $$(".load-history").forEach((button) => button.addEventListener("click", () => {
    const item = history.find((entry) => String(entry.id) === button.dataset.historyId); if (!item) return;
    $("#positiveOutput").value = item.positive; $("#negativeOutput").value = item.negative; lastResult = item; navigate("workspace"); showToast("历史提示词已载入");
  }));
}

function navigate(viewName) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${viewName}View`));
  $("#topbarTitle").textContent = viewName === "workspace" ? "提示词翻译器" : viewName === "templates" ? "提示词模板" : "历史记录";
  if (viewName === "history") renderHistory();
}

$("#sourceInput").addEventListener("input", () => { $("#sourceChars").textContent = `${$("#sourceInput").value.length} 字符`; });
$("#translateButton").addEventListener("click", translate);
$("#modelSelect").addEventListener("change", () => { updateModelUI(); if ($("#sourceInput").value.trim()) translate(); });
$("#exampleButton").addEventListener("click", () => { $("#sourceInput").value = "雨后的东京街头，一位穿着红色风衣的年轻男人撑着透明雨伞，霓虹灯倒映在湿润的路面，电影感，35mm胶片摄影，浅景深"; $("#sourceInput").dispatchEvent(new Event("input")); translate(); });
$("#copyPositive").addEventListener("click", () => copyText($("#positiveOutput").value, "正向提示词"));
$("#downloadButton").addEventListener("click", downloadPrompt);
$("#resetNegative").addEventListener("click", () => { $("#negativeOutput").value = defaultNegative; $("#negativeTokens").textContent = `${tokenCount(defaultNegative)} tokens`; showToast("已恢复默认反向提示词"); });
$("#clearAllButton").addEventListener("click", () => { $("#sourceInput").value = ""; $("#positiveOutput").value = ""; $("#sourceInput").dispatchEvent(new Event("input")); $("#analysisState").textContent = "待翻译"; $(".analysis-state").classList.remove("ready"); $("#categoryList").innerHTML = ""; $("#confidenceValue").textContent = "—"; $("#confidenceBar").style.width = "0"; showToast("工作区已清空"); });
$("#clearHistory").addEventListener("click", () => { history = []; localStorage.removeItem("prompt-atelier-history"); updateHistoryCount(); renderHistory(); showToast("历史记录已清空"); });
$("#templateToWorkspace").addEventListener("click", () => navigate("workspace"));
$$('.nav-item').forEach((item) => item.addEventListener("click", () => navigate(item.dataset.view)));
$$('.choice-chip:not([data-detail-mode])').forEach((chip) => chip.addEventListener("click", () => chip.classList.toggle("selected")));
$$('[data-detail-mode]').forEach((chip) => chip.addEventListener("click", () => {
  $$('[data-detail-mode]').forEach((item) => item.classList.toggle("selected", item === chip));
}));
$$('[data-step]').forEach((button) => button.addEventListener("click", () => { const input = $(`#${button.dataset.step}Input`); const direction = Number(button.dataset.dir); const step = input.id === "cfgInput" ? .5 : 1; const next = Math.min(Number(input.max), Math.max(Number(input.min), Number(input.value) + direction * step)); input.value = next; }));
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); translate(); } });

$("#sourceInput").dispatchEvent(new Event("input"));
$("#negativeOutput").value = defaultNegative;
$("#negativeTokens").textContent = `${tokenCount(defaultNegative)} tokens`;
updateModelUI();
renderTemplates(); updateHistoryCount();
