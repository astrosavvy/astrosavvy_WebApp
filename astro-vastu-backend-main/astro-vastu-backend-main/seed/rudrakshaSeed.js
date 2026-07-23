import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const rudraksha = [
  {
    name: "1 Mukhi Rudraksha (Nepali)",
    slug: "1-mukhi-rudraksha-nepali",
    category: "rudraksha",
    mukhi: 1,
    origin: "Nepali",
    price: 8999,
    images: [
      "/images/rudraksha/1mukhi-1.jpeg",
      "/images/rudraksha/1mukhi-2.jpeg",
    
    ],
    title: "Natural 1 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
    subtitle: "For Spiritual Awakening, Clarity & Divine Blessings | Lab Certified | Energized for Use",
    about: "This Natural 1 Mukhi Rudraksha is sourced from Nepal and represents the supreme power of Lord Shiva. It is considered one of the most powerful and sacred Rudrakshas, ideal for deep meditation, spiritual growth, and attaining higher consciousness.",
    benefits: [
      "Brings clarity of thoughts and enhances decision-making ability.",
      "Supports spiritual awakening and deep meditation practices.",
      "Helps reduce stress, fear, and emotional instability.",
      "Attracts prosperity, success, and leadership qualities.",
      "Provides protection from negative energies and strengthens inner confidence."
    ],
    icons: [
      "100% Authentic",
      "Certificate Verified",
      "Secure Transaction",
      "Energized Product"
    ]
  },

  {
    name: "2 Mukhi Rudraksha (Nepali)",
    slug: "2-mukhi-rudraksha-nepali",
    category: "rudraksha",
    mukhi: 2,
    origin: "Nepali",
    price: 37999,
    images: [
      "/images/rudraksha/2mukhi--nepali-2.jpeg",
      "/images/rudraksha/2mukhi-nepali-1.jpeg",
  
      
    ],
    title: "Natural 2 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
    subtitle: "For Harmony, Relationships & Emotional Balance | Lab Certified | Energized for Use",
    about: "This Natural 2 Mukhi Rudraksha is sourced from Nepal and symbolizes the united form of Lord Shiva and Goddess Parvati. It promotes harmony in relationships, emotional balance, and strengthens bonds between partners, family members, and loved ones.",
    benefits: [
      "Promotes harmony and understanding in relationships.",
      "Helps reduce conflicts and emotional stress.",
      "Strengthens marital bonds and partnership stability.",
      "Encourages emotional balance and inner peace.",
      "Supports self-love, compassion, and positive communication."
    ],
    icons: [
      "100% Authentic",
      "Certificate Verified",
      "Secure Transaction",
      "Energized Product"
    ]
  },

  {
    name: "2 Mukhi Rudraksha (Indian)",
    slug: "2-mukhi-rudraksha-indian",
    category: "rudraksha",
    mukhi: 2,
    origin: "Indian",
    price: 2500,
    images: [  
     
        "/images/rudraksha/2mukhi-indian-1.jpeg",
      "/images/rudraksha/2mukhi-indian-2.jpeg"
    
      
     
    ],
    title: "Natural 2 Mukhi Rudraksha (Indian) – Abhimantrit, Energized & Certified Bead",
    subtitle: "For Relationship Harmony & Emotional Balance | Lab Certified | Energized for Use",
    about: "This Natural 2 Mukhi Rudraksha (Indian) symbolizes the divine form of Lord Shiva and Goddess Parvati. It is known for strengthening relationships, promoting unity, and balancing emotions.",
    benefits: [
      "Promotes harmony and understanding in relationships.",
      "Reduces conflicts and emotional stress.",
      "Strengthens marital bonds and partnerships.",
      "Encourages compassion and emotional stability.",
      "Brings peace and unity within the family."
    ],
    icons: [
      "100% Authentic",
      "Certificate Verified",
      "Secure Transaction",
      "Energized Product"
    ]
  },

  {
    name: "3 Mukhi Rudraksha (Nepali)",
    slug: "3-mukhi-rudraksha-nepali",
    category: "rudraksha",
    mukhi: 3,
    origin: "Nepali",
    price: 1400,
    images: [
      "/images/rudraksha/3mukhi-1.jpeg",
      "/images/rudraksha/3mukhi-2.jpeg",
     
    ],
    title: "Natural 3 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
    subtitle: "For Confidence, Energy & Past Karma Cleansing | Lab Certified | Energized for Use",
    about: "This Natural 3 Mukhi Rudraksha is sourced from Nepal and represents Lord Agni (Fire God). It is believed to burn past karmas and bring renewed energy.",
    benefits: [
      "Helps release past emotional trauma and guilt.",
      "Boosts self-confidence and personal power.",
      "Promotes positive energy and enthusiasm.",
      "Supports emotional healing and mental strength.",
      "Encourages growth, transformation, and new beginnings."
    ],
    icons: [
      "100% Authentic",
      "Certificate Verified",
      "Secure Transaction",
      "Energized Product"
    ]
  },
  {
  name: "4 Mukhi Rudraksha (Nepali)",
  slug: "4-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 4,
  origin: "Nepali",
  price: 1199,
  images: [
    "/images/rudraksha/4mukhi-1.jpeg",
    "/images/rudraksha/4mukhi-2.jpeg",
  
  ],
  title: "Natural 4 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Intelligence, Creativity & Communication Skills | Lab Certified | Energized for Use",
  about: "This Natural 4 Mukhi Rudraksha is sourced from Nepal and represents Lord Brahma, the creator. It is associated with wisdom, knowledge, and enhanced communication skills.",
  benefits: [
    "Enhances memory, intelligence, and learning ability.",
    "Improves communication and self-expression skills.",
    "Boosts creativity and innovative thinking.",
    "Helps reduce confusion and mental blockages.",
    "Supports academic and professional success."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "5 Mukhi Rudraksha (Nepali)",
  slug: "5-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 5,
  origin: "Nepali",
  price: 700,
  images: [
    "/images/rudraksha/5mukhi-1.jpeg",
    "/images/rudraksha/5mukhi-2.jpeg",
   
  ],
  title: "Natural 5 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Peace, Protection & Focus | Lab Certified | Energized for Use",
  about: "This Natural 5 Mukhi Rudraksha is sourced from Nepal and symbolizes the five elements and Lord Shiva’s divine energy.",
  benefits: [
    "Brings mental peace and reduces stress.",
    "Improves focus and concentration.",
    "Supports spiritual growth.",
    "Traditionally believed to help regulate blood pressure.",
    "Provides protection from negative energies."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "6 Mukhi Rudraksha (Nepali)",
  slug: "6-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 6,
  origin: "Nepali",
  price: 999,
  images: [
    "/images/rudraksha/6mukhi-1.jpeg",
    "/images/rudraksha/6mukhi-2.jpeg",
   
  ],
  title: "Natural 6 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Confidence, Communication & Career Growth | Lab Certified | Energized for Use",
  about: "This Natural 6 Mukhi Rudraksha represents Lord Kartikeya and enhances confidence, leadership, and communication skills.",
  benefits: [
    "Boosts confidence and leadership qualities.",
    "Improves communication skills.",
    "Supports career growth.",
    "Helps control anger and emotional imbalance.",
    "Promotes discipline and focused thinking."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "7 Mukhi Rudraksha (Nepali)",
  slug: "7-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 7,
  origin: "Nepali",
  price: 1100,
  images: [
    "/images/rudraksha/7mukhi-1.jpeg",
    "/images/rudraksha/7mukhi-2.jpeg",
   
  ],
  title: "Natural 7 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Wealth, Stability & Financial Growth | Lab Certified | Energized for Use",
  about: "This Natural 7 Mukhi Rudraksha is associated with Goddess Mahalakshmi and attracts prosperity and financial stability.",
  benefits: [
    "Attracts wealth and prosperity.",
    "Removes financial obstacles.",
    "Promotes career stability.",
    "Encourages emotional strength.",
    "Supports overall well-being."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "8 Mukhi Rudraksha (Nepali)",
  slug: "8-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 8,
  origin: "Nepali",
  price: 7000,
  images: [
    "/images/rudraksha/8mukhi-1.jpeg",
    "/images/rudraksha/8mukhi-2.jpeg",
   
  ],
  title: "Natural 8 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Obstacle Removal, Success & Protection | Lab Certified | Energized for Use",
  about: "This Natural 8 Mukhi Rudraksha represents Lord Ganesha and removes obstacles from life.",
  benefits: [
    "Removes obstacles from career and life.",
    "Attracts success.",
    "Protects from negative energies.",
    "Enhances intelligence.",
    "Promotes smooth progress."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "9 Mukhi Rudraksha (Nepali)",
  slug: "9-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 9,
  origin: "Nepali",
  price: 8500,
  images: [
    "/images/rudraksha/9mukhi-1.jpeg",
    "/images/rudraksha/9mukhi-2.jpeg",
   
  ],
  title: "Natural 9 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Strength, Courage & Divine Protection | Lab Certified | Energized for Use",
  about: "This Natural 9 Mukhi Rudraksha represents Goddess Durga and enhances strength and courage.",
  benefits: [
    "Enhances courage and inner strength.",
    "Protects from fear and negativity.",
    "Encourages determination.",
    "Supports spiritual growth.",
    "Helps overcome challenges."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "10 Mukhi Rudraksha (Nepali)",
  slug: "10-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 10,
  origin: "Nepali",
  price: 7899,
  images: [
    "/images/rudraksha/10mukhi-2.jpeg",
    "/images/rudraksha/10mukhi-1.jpeg",
    
  ],
  title: "Natural 10 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Protection, Peace & Freedom from Negativity | Lab Certified | Energized for Use",
  about: "This Natural 10 Mukhi Rudraksha is associated with Lord Vishnu and provides strong protection from negativity.",
  benefits: [
    "Protects from harmful influences.",
    "Promotes emotional stability.",
    "Removes sudden obstacles.",
    "Encourages confidence.",
    "Supports balanced life."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "11 Mukhi Rudraksha (Nepali)",
  slug: "11-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 11,
  origin: "Nepali",
  price: 9000,
  images: [
    "/images/rudraksha/11mukhi-2.jpeg",
    "/images/rudraksha/11mukhi-1.jpeg",
 
  ],
  title: "Natural 11 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Courage, Protection & Spiritual Power | Lab Certified | Energized for Use",
  about: "This Natural 11 Mukhi Rudraksha represents Lord Hanuman and blesses the wearer with courage and protection.",
  benefits: [
    "Enhances courage and strength.",
    "Protects from negative influences.",
    "Improves focus and determination.",
    "Supports spiritual growth.",
    "Brings success in challenges."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},
{
  name: "12 Mukhi Rudraksha (Nepali)",
  slug: "12-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 12,
  origin: "Nepali",
  price: 10100,
  images: [
    "/images/rudraksha/12mukhi-1.jpeg",
    "/images/rudraksha/12mukhi-2.jpeg",
   
  ],
  title: "Natural 12 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Leadership, Confidence & Radiant Energy | Lab Certified | Energized for Use",
  about: "This Natural 12 Mukhi Rudraksha represents Lord Surya (Sun God) and enhances leadership qualities and confidence.",
  benefits: [
    "Boosts confidence and authority.",
    "Enhances leadership and decision-making skills.",
    "Promotes vitality and positive energy.",
    "Helps overcome fear and self-doubt.",
    "Supports success in career and public life."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "13 Mukhi Rudraksha (Nepali)",
  slug: "13-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 13,
  origin: "Nepali",
  price: 14000,
  images: [
   
    "/images/rudraksha/13mukhi-1.jpeg",
    "/images/rudraksha/13mukhi-2.jpeg"
  
  ],
  title: "Natural 13 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Attraction, Fulfillment & Divine Blessings | Lab Certified | Energized for Use",
  about: "This Natural 13 Mukhi Rudraksha is sourced from Nepal and is associated with Lord Kamadeva and Lord Indra. It is believed to fulfill desires and attract prosperity.",
  benefits: [
    "Enhances attraction and personal charm.",
    "Helps fulfill desires and ambitions.",
    "Attracts prosperity and growth opportunities.",
    "Supports relationship harmony.",
    "Encourages creativity and positive thinking."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "14 Mukhi Rudraksha (Nepali)",
  slug: "14-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 14,
  origin: "Nepali",
  price: 46000,
  images: [
      "/images/rudraksha/14mukhi-2.jpeg",
      "/images/rudraksha/14mukhi-1.jpeg"
  
   
  ],
  title: "Natural 14 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Intuition, Protection & Powerful Decision-Making | Lab Certified | Energized for Use",
  about: "This Natural 14 Mukhi Rudraksha is sourced from Nepal and is associated with Lord Shiva. It is believed to awaken intuition and enhance foresight.",
  benefits: [
    "Enhances intuition and foresight.",
    "Supports powerful decision-making.",
    "Protects from negative energies.",
    "Promotes spiritual awakening.",
    "Brings stability and confidence."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
}
,
{
  name: "15 Mukhi Rudraksha (Nepali)",
  slug: "15-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 15,
  origin: "Nepali",
  price: 37000,
  images: [
    "/images/rudraksha/15mukhi-2.jpeg",
    "/images/rudraksha/15mukhi-1.jpeg"
   
  ],
  title: "Natural 15 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Emotional Healing, Love & Inner Peace | Lab Certified | Energized for Use",
  about: "This Natural 15 Mukhi Rudraksha is sourced from Nepal and is associated with Lord Pashupatinath. It supports emotional healing and relationship strength.",
  benefits: [
    "Promotes emotional healing and stability.",
    "Strengthens relationships and love bonds.",
    "Helps release past emotional pain.",
    "Encourages compassion and understanding.",
    "Supports spiritual calmness."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},
{
  name: "16 Mukhi Rudraksha (Nepali)",
  slug: "16-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 16,
  origin: "Nepali",
  price: 105000,
  images: [
        "/images/rudraksha/16mukhi-2.jpeg",
    "/images/rudraksha/16mukhi-1.jpeg"
   
  ],
  title: "Natural 16 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Victory, Protection & Fearlessness | Lab Certified | Energized for Use",
  about: "This Natural 16 Mukhi Rudraksha is sourced from Nepal and represents Lord Mahamrityunjaya Shiva. It provides protection and courage.",
  benefits: [
    "Provides protection from fear.",
    "Promotes victory in difficult situations.",
    "Enhances confidence and courage.",
    "Supports mental strength.",
    "Encourages resilience and stability."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "17 Mukhi Rudraksha (Nepali)",
  slug: "17-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 17,
  origin: "Nepali",
  price: 235000,
  images: [
      "/images/rudraksha/17mukhi-2.jpeg",
    "/images/rudraksha/17mukhi-1.jpeg"
   
  ],
  title: "Natural 17 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Prosperity, Success & Divine Blessings | Lab Certified | Energized for Use",
  about: "This Natural 17 Mukhi Rudraksha is sourced from Nepal and is associated with Goddess Katyayani. It is believed to attract prosperity, success, and fulfillment of goals.",
  benefits: [
    "Attracts prosperity and financial growth.",
    "Helps achieve goals and ambitions.",
    "Enhances leadership and confidence.",
    "Removes obstacles from career path.",
    "Supports spiritual and material success."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "18 Mukhi Rudraksha (Nepali)",
  slug: "18-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 18,
  origin: "Nepali",
  price: 395000,
  images: [
    "/images/rudraksha/18mukhi-1.jpeg",
    "/images/rudraksha/18mukhi-2.jpeg"
    
  ],
  title: "Natural 18 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Stability, Wealth & Earth Energy Blessings | Lab Certified | Energized for Use",
  about: "This Natural 18 Mukhi Rudraksha is sourced from Nepal and represents Mother Earth (Bhumi Devi). It is believed to bring stability, abundance, and grounding energy.",
  benefits: [
    "Brings stability in life and career.",
    "Attracts abundance and material success.",
    "Strengthens grounding and emotional balance.",
    "Supports long-term prosperity.",
    "Protects from instability and sudden losses."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "19 Mukhi Rudraksha (Nepali)",
  slug: "19-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 19,
  origin: "Nepali",
  price: null,
  isCallForPrice: true,
  images: [
    "/images/rudraksha/19mukhi-2.jpeg",
    "/images/rudraksha/19mukhi-1.jpeg"
  
  ],
  title: "Natural 19 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Abundance, Success & Divine Protection | Lab Certified | Energized for Use",
  about: "This Natural 19 Mukhi Rudraksha is sourced from Nepal and is associated with Lord Vishnu. It is believed to bless the wearer with abundance, fulfillment, and divine protection.",
  benefits: [
    "Attracts wealth and prosperity.",
    "Supports business and career growth.",
    "Protects from negative influences.",
    "Enhances confidence and clarity.",
    "Promotes overall life stability."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "20 Mukhi Rudraksha (Nepali)",
  slug: "20-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 20,
  origin: "Nepali",
  price: null,
  isCallForPrice: true,
  images: [
       "/images/rudraksha/20mukhi-2.jpeg",
    "/images/rudraksha/20mukhi-1.jpeg"
   
  ],
  title: "Natural 20 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Supreme Knowledge, Wisdom & Divine Guidance | Lab Certified | Energized for Use",
  about: "This Natural 20 Mukhi Rudraksha is sourced from Nepal and represents divine wisdom and higher consciousness. It is ideal for spiritual seekers and leaders.",
  benefits: [
    "Enhances higher wisdom and awareness.",
    "Supports deep meditation practices.",
    "Promotes clarity and right decisions.",
    "Strengthens divine connection.",
    "Brings peace and spiritual fulfillment."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "21 Mukhi Rudraksha (Nepali)",
  slug: "21-mukhi-rudraksha-nepali",
  category: "rudraksha",
  mukhi: 21,
  origin: "Nepali",
  price: null,
  isCallForPrice: true,
  images: [
      "/images/rudraksha/21mukhi-2.jpeg",
    "/images/rudraksha/21mukhi-1.jpeg"
   
  ],
  title: "Natural 21 Mukhi Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Supreme Prosperity, Authority & Complete Success | Lab Certified | Energized for Use",
  about: "This Natural 21 Mukhi Rudraksha is sourced from Nepal and is extremely rare and powerful. It is believed to bless the wearer with supreme prosperity and authority.",
  benefits: [
    "Attracts supreme wealth and abundance.",
    "Enhances authority and leadership power.",
    "Supports large-scale success and ventures.",
    "Provides strong protection from negativity.",
    "Brings overall prosperity and fulfillment."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},


{
  name: "Gauri Shankar Rudraksha (Nepali)",
  slug: "gauri-shankar-rudraksha-nepali",
  category: "rudraksha",
  origin: "Nepali",
  price: 21000,
  images: [
    "/images/rudraksha/gauri-1.jpeg",
    "/images/rudraksha/gauri-2.jpeg",
   
  ],
  title: "Natural Gauri Shankar Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Divine Union, Marital Harmony & Spiritual Growth | Lab Certified | Energized for Use",
  about: "Represents divine union of Shiva and Parvati.",
  benefits: [
    "Strengthens marital harmony.",
    "Attracts life partner.",
    "Promotes emotional balance.",
    "Supports spiritual growth.",
    "Removes relationship obstacles."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "Garbh Gauri Rudraksha (Nepali)",
  slug: "garbh-gauri-rudraksha-nepali",
  category: "rudraksha",
  origin: "Nepali",
  price: 19999,
  images: [
    "/images/rudraksha/garbh-1.jpeg",
    "/images/rudraksha/garbh-2.jpeg",
   
  ],
  title: "Natural Garbh Gauri Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Motherhood Blessings, Child Protection & Family Happiness | Lab Certified | Energized for Use",
  about: "Symbolizes Goddess Parvati with Lord Ganesha.",
  benefits: [
    "Blesses with motherhood.",
    "Protects children.",
    "Strengthens mother-child bond.",
    "Promotes family harmony.",
    "Removes pregnancy obstacles."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
},

{
  name: "Ganesh Rudraksha (Nepali)",
  slug: "ganesh-rudraksha-nepali",
  category: "rudraksha",
  origin: "Nepali",
  price: 4100,
  images: [
    "/images/rudraksha/ganesh-1.jpeg",
    
  
  ],
  title: "Natural Ganesh Rudraksha (Nepali) – Abhimantrit, Energized & Certified Bead",
  subtitle: "For Obstacle Removal, Success & Wisdom | Lab Certified | Energized for Use",
  about: "This Natural Ganesh Rudraksha is identified by a natural trunk-like formation resembling Lord Ganesha. It symbolizes wisdom and removal of obstacles.",
  benefits: [
    "Removes obstacles from career and personal life.",
    "Attracts success in new beginnings.",
    "Enhances intelligence and wisdom.",
    "Protects from negative influences.",
    "Promotes stability and growth."
  ],
  icons: [
    "100% Authentic",
    "Certificate Verified",
    "Secure Transaction",
    "Energized Product"
  ]
}



];

const importData = async () => {
  try {
    await Product.deleteMany({ category: "rudraksha" });
    await Product.insertMany(rudraksha);

    console.log("✅ Rudraksha inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();