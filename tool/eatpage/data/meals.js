// English comments: Sample meal list
const MEALS = [
  {
    "name": "🥮豪友点心楼",
    "meal": ["早餐"],
    "type": ["包点"],
    "location": "Johor Jaya",
    "note": "大包，点心，粥，咖啡都不错，还有炒粿条",
    "tags": [""]
  },
  {
    "name": "🫓Restoran Ameer",
    "meal": ["早餐"],
    "type": ["Roti Prata"],
    "location": "Mutiara Rini",
    "note": "Roti够脆不过要等",
    "tags": [""]
  },
  {
    "name": "🍜鱼片米粉",
    "meal": ["午餐"],
    "type": ["米粉"],
    "location": "Impian Emas",
    "note": "咖喱鱼片 赞，配饭也不错",
    "tags": ["饭"]
  },
  {
    "name": "🍚伟伟鸡饭",
    "meal": ["午餐"],
    "type": ["鸡饭"],
    "location": "Taman U",
    "note": "没有冷气,白鸡嫩，饭香，辣椒ok，没有冷气",
    "tags": ["饭"]
  },
  {
    "name": "🍚成記雞飯",
    "meal": ["午餐"],
    "type": ["鸡饭"],
    "location": "皇后",
    "note": "大排档皇后招牌鸡饭，没有冷气",
    "tags": ["饭"]
  },
  {
    "name": "☕炭咖啡",
    "meal": ["早餐","午餐"],
    "type": ["咖啡","Nasi Lemak","饭","面包","米粉","小吃","甜品"],
    "location": "Sutera",
    "note": "大分量，咖啡有送饼干，很多面包和小吃选择，Nasi Lemak和Mee Siam也不错",
    "tags": ["饭"]
  },
  {
    "name": "🍲安记酿豆腐",
    "meal": ["早餐","午餐"],
    "type": ["面"],
    "location": "皇后",
    "note": "有冷气，酿豆腐很多选择，很干净，咖喱面不错，招牌咖啡也不错",
    "tags": [""]
  },
  {
    "name": "🍗美国喜爱鸡",
    "meal": ["午餐","晚餐"],
    "type": ["炸鸡","汉堡"],
    "location": "皇后",
    "note": "经典炸鸡，有冷气",
    "tags": [""]
  },
  {
    "name": "🍲哥打肉骨茶",
    "meal": ["早餐","午餐"],
    "type": ["肉骨茶"],
    "location": "哥打",
    "note": "没有冷气，猪肚汤和猪脚也不错",
    "tags": ["饭"]
  },
  {
    "name": "🦆新海珍 鸭肉",
    "meal": ["午餐","晚餐"],
    "type": ["鸭肉","饭"],
    "location": "公主",
    "note": "鸭肉够味有嚼劲 好吃",
    "tags": [""]
  },
  {
    "name": "🍜炒虾面 SUN & sun 96 Restaurant",
    "meal": ["午餐","晚餐"],
    "type": ["面"],
    "location": "Taman U",
    "note": "档口在旁边，面向tayar店。配上他的酱 nice",
    "tags": [""]
  },
  {
    "name": "🍜萬記吉隆坡福建面",
    "meal": ["午餐"],
    "type": ["面"],
    "location": "皇后",
    "note": "主打黑黑福建面，滑蛋生面和鱼饼也是不错",
    "tags": [""]
  },
  {
    "name": "🍲🍚新皇庭",
    "meal": ["午餐","晚餐"],
    "type": ["汤饭"],
    "location": "Mount Austin",
    "note": "浓汤配饭 shiok",
    "tags": [""]
  },
  {
    "name": "🍱🍜和乐屋 日式料理",
    "meal": ["午餐","晚餐"],
    "type": ["日式","寿司","拉面"],
    "location": "Sutera",
    "note": "泡菜拉面不错，寿司选择多，也有很多主食，高档日式料理",
    "tags": [""]
  },
  {
    "name": "🍖食客 韩国烤肉",
    "meal": ["午餐","晚餐"],
    "type": ["韩国烤肉"],
    "location": "Sutera",
    "note": "Rib Eye 不错，通常单点1个肉会送6~7样配菜",
    "tags": [""]
  },
  {
    "name": "🫕🍨食在霸道",
    "meal": ["晚餐"],
    "type": ["砂煲","甜品","小食"],
    "location": "Sutera",
    "note": "主打沙煲和冰，也有很多的Topping和小食选择",
    "tags": [""]
  },
  {
    "name": "🍖Gangnam BBQ 韩国烤肉",
    "meal": ["午餐","晚餐"],
    "type": ["韩国烤肉"],
    "location": "Kulai",
    "note": "很像食客，蛋饼不错，菜给比较多",
    "tags": [""]
  },
  {
    "name": "🍜🍨半唐水",
    "meal": ["午餐"],
    "type": ["面","汉堡","甜品"],
    "location": "Impian Emas",
    "note": "并不错，也有出前一丁，日本咖喱饭和burger",
    "tags": [""]
  },
  {
    "name": "🍳🔥Number One 泰式煮炒",
    "meal": ["晚餐"],
    "type": ["炒饭"],
    "location": "Taman U",
    "note": "Kampung 炒饭必点",
    "tags": [""]
  },
  {
    "name": "🍝🍗Der' Cabin Bistro",
    "meal": ["晚餐"],
    "type": ["西餐","鸡扒"],
    "location": "Taman U",
    "note": "户外，鸡扒好吃",
    "tags": [""]
  },
  {
    "name": "🍗肯德基 宽柔中学对面",
    "meal": ["午餐","晚餐"],
    "type": ["炸鸡","汉堡"],
    "location": "Stulang Laut",
    "note": "风景不错，炸鸡juicy",
    "tags": [""]
  },
  {
    "name": "🦐🐟鐥洺海鲜楼",
    "meal": ["晚餐"],
    "type": ["海鲜","煮炒"],
    "location": "Impian Emas",
    "note": "菜色特别，环境不错，有点度假村的感觉，有冷气包厢但有最低消费的要求",
    "tags": [""]
  },
  {
    "name": "🦐🐟億家海鲜",
    "meal": ["晚餐"],
    "type": ["海鲜","煮炒"],
    "location": "Bukit Indah",
    "note": "海鲜价钱ok, 也很新鲜",
    "tags": [""]
  },
  {
    "name": "🍝🍗Meet House Cafe",
    "meal": ["午餐","晚餐"],
    "type": ["西餐","鸡扒"],
    "location": "Bukit Indah",
    "note": "油站楼上的主题餐厅，环境不错，很舒服，适合聚会",
    "tags": [""]
  },
  {
    "name": "🍱🍝Sushi Mentai",
    "meal": ["午餐","晚餐"],
    "type": ["日式","寿司"],
    "location": "Taman U",
    "note": "旋转寿司，价钱合理，选择多，也有主食",
    "tags": [""]
  },
];
