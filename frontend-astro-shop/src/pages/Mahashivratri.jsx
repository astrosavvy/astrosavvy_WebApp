import React from 'react';
import { motion } from 'framer-motion';

function Mahashivratri() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="bg-white min-h-screen">
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-10 font-['Poppins'] text-[#1B2624]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BC6C25]/10 text-[#BC6C25] text-sm font-semibold border border-[#BC6C25]/20">
            ✦ Spiritual Guidance 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold leading-tight">
            महाशिवरात्रि 2026: <span className="text-[#BC6C25]">तिथि, पूजा का शुभ समय, व्रत विधि, अनुष्ठान और महत्व</span>
          </h1>
        </motion.div>

        {/* IMAGE SECTION */}
  <motion.div variants={itemVariants} className="relative w-full">
  <div className="relative w-full h-[420px] rounded-2xl  flex items-center justify-center">
    <img
      src="/images/maha-shivratri.png"
      alt="Maha Shivratri 2026"
      className="max-h-full max-w-full object-contain rounded-2xl shadow-xl border border-[#DDA158]/20"
    />
  </div>
</motion.div>



        {/* INTRO TEXT */}
        <motion.div variants={itemVariants} className="bg-[#F5EBE0]/40 p-6 md:p-8 rounded-2xl border-l-8 border-[#BC6C25]">
          <p className="text-lg leading-relaxed">
            महा शिवरात्रि 2026 हिंदू धर्म के सबसे पावन पर्वों में से एक है, जिसे भगवान शिव की आराधना के लिए समर्पित किया गया है। यह पर्व शिव और शक्ति के दिव्य मिलन, आत्मचिंतन, तपस्या और आध्यात्मिक जागरण का प्रतीक माना जाता है।
          </p>
        </motion.div>

        {/* DATE & MUHURAT SECTION */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624] border-b-2 border-[#DDA158]/30 pb-2">
            महा शिवरात्रि 2026 कब है? (Mahashivratri Date 2026)
          </h2>
          
          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#DDA158]/30 shadow-sm">
              <h3 className="font-bold text-[#BC6C25] mb-2 uppercase tracking-wide">महाशिवरात्रि तिथि</h3>
              <p>सनातन मान्यताओं के अनुसार महाशिवरात्रि हर वर्ष हिंदू कैलेंडर के फाल्गुन मास (Phalguna month) के कृष्ण पक्ष की चतुर्दशी तिथि को मनाई जाती है</p>
              
              <div className="mt-6 p-6 bg-[#1B2624] rounded-xl text-center">
                <p className="text-[#F2C078] mb-2">इस वर्ष 2026 में महाशिवरात्रि का पर्व</p>
                <p className="text-2xl md:text-3xl font-bold text-white">रविवार, 15 फरवरी 2026 को मनाया जाएगा</p>
              </div>

              <div className="mt-6 space-y-4 text-[#1B2624]/80">
                <p>इस महाशिवरात्रि पर सर्वार्थ सिद्ध योग एवं वरयान योग बन रहे हैं, जो की दान पुण्य के कार्यों के लिए, पूजा भक्ति के लिए और नए कार्यों की शुरुआत के लिए शुभ माने गए हैं</p>
                <p>इस दिन चंद्रमा उत्तराषाढ़ा नक्षत्र, जो सूर्या ग्रह का नक्षत्र है, और फिर स्व नक्षत्र श्रवण में रहेंगे जो भगवान भोलेनाथ और माँ पार्वती की आराधना के लिए अति उत्तम माना गया है</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PUJA TIMINGS */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624]">महा शिवरात्रि 2026 पूजा का शुभ समय</h2>
          <p>15 फ़रवरी की महाशिवरात्रि के दिन निशिता काल को शिव पूजा का सर्वोत्तम समय माना जाता है क्योंकि इसी समय भगवान शिव शिवलिंग के रूप में प्रकट हुए थे।</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#BC6C25] p-6 rounded-2xl text-white shadow-lg shadow-[#BC6C25]/20">
              <h3 className="font-bold text-[#F5EBE0] mb-4">निशिता काल पूजा समय (सबसे पवित्र समय)</h3>
              <ul className="space-y-2">
                <li>• रात 12:09 बजे से 1:01 बजे तक</li>
                <li>• दिनांक: 16 फरवरी 2026</li>
                <li>• अवधि: 51 मिनट</li>
              </ul>
            </div>
            <div className="bg-[#F5EBE0] p-6 rounded-2xl border border-[#DDA158]/40">
              <h3 className="font-bold text-[#BC6C25] mb-4">शिवरात्रि पारणा समय (व्रत तोड़ने का समय)</h3>
              <ul className="space-y-2">
                <li>• सुबह 6:59 बजे से दोपहर 3:24 बजे तक</li>
                <li>• दिनांक: 16 फरवरी 2026</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* FOUR PRAHAR SECTION */}
        <motion.div variants={itemVariants} className="space-y-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624]">चार प्रहर शिव पूजा का महत्व</h2>
          <p>जो भक्त चारों प्रहरों में शिव पूजा करते हैं, उन्हें विशेष पुण्य और दिव्य अनुग्रह प्राप्त होता है। यह पूजा आत्मसंयम, भक्ति और तपस्या का सर्वोच्च रूप मानी जाती है।</p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-4">
            <div>
              <h3 className="font-bold text-[#BC6C25] mb-4">चार प्रहर पूजा का समय</h3>
              <ul className="space-y-3 font-medium">
                <li className="flex justify-between border-b pb-1"><span>प्रथम प्रहर:</span> <span>06:11 PM – 09:23 PM</span></li>
                <li className="flex justify-between border-b pb-1"><span>द्वितीय प्रहर:</span> <span>09:23 PM – 12:35 AM</span></li>
                <li className="flex justify-between border-b pb-1"><span>तृतीय प्रहर:</span> <span>12:35 AM – 03:47 AM</span></li>
                <li className="flex justify-between pb-1"><span>चतुर्थ प्रहर:</span> <span>03:47 AM – 06:59 AM</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#DDA158]/20 shadow-sm">
              <h3 className="font-bold text-[#BC6C25] mb-4">चतुर्दशी तिथि</h3>
              <ul className="space-y-2">
                <li><span className="text-[#1B2624]/60">प्रारंभ:</span> 15 फरवरी 2026, शाम 5:04 बजे</li>
                <li><span className="text-[#1B2624]/60">समाप्ति:</span> 16 फरवरी 2026, शाम 5:34 बजे</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* SPIRITUAL SIGNIFICANCE */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624]">महा शिवरात्रि का धार्मिक और आध्यात्मिक महत्व</h2>
          <p>महाशिवरात्रि शिव और शक्ति के मिलन का पर्व है, जो ब्रह्मांडीय संतुलन और सृजन शक्ति का प्रतीक है। ऐसा माना जाता है कि इस पवित्र रात्रि में की गई साधना, मंत्र जाप और उपवास से व्यक्ति को:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['आध्यात्मिक शुद्धि', 'मानसिक शांति', 'प्रमाणिक भक्ति', 'कर्मों से मुक्ति'].map((item) => (
              <div key={item} className="p-4 bg-white border-2 border-[#F5EBE0] rounded-xl text-center font-bold text-sm hover:border-[#BC6C25] transition-colors">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-[#F5EBE0]/30 rounded-2xl border border-[#DDA158]/20">
            <h3 className="font-bold text-[#BC6C25] mb-4">कैलेंडर के अनुसार महाशिवरात्रि</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>दक्षिण भारतीय पंचांग: माघ मास कृष्ण पक्ष चतुर्दशी</li>
              <li>उत्तर भारतीय पंचांग: फाल्गुन मास कृष्ण पक्ष चतुर्दशी</li>
            </ul>
            <p className="mt-4 text-sm italic">नामों में अंतर होने के बावजूद, महाशिवरात्रि पूरे भारत में एक ही दिन मनाई जाती है।</p>
          </div>
        </motion.div>

        {/* VRAT VIDHI */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624]">महा शिवरात्रि व्रत विधि (Shivratri Vrat Vidhi)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-[#BC6C25]">शिवरात्रि से एक दिन पहले</h4>
              <ul className="space-y-2 bg-slate-50 p-4 rounded-xl">
                <li>• सात्विक भोजन करें</li>
                <li>• तामसिक भोजन से परहेज करें</li>
              </ul>
              <h4 className="font-bold text-[#BC6C25]">शिवरात्रि के दिन</h4>
              <ul className="space-y-2 bg-slate-50 p-4 rounded-xl">
                <li>• प्रातः स्नान कर स्वच्छ वस्त्र धारण करें</li>
                <li>• शिव मंदिर जाएं या घर पर पूजा स्थान तैयार करें</li>
                <li>• पूरे दिन उपवास का संकल्प लें</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#BC6C25]">रात्रि पूजा विधि</h4>
              <ul className="space-y-2 bg-slate-50 p-4 rounded-xl">
                <li>• सायंकाल पुनः स्नान करें</li>
                <li>• एक बार या चारों प्रहरों में शिव पूजा करें</li>
                <li>• शिवलिंग पर जल, दूध, बेलपत्र, फल, धतूरा अर्पित करें</li>
                <li>• “ॐ नमः शिवाय” मंत्र का जप पूरी रात करें</li>
              </ul>
              <h4 className="font-bold text-[#BC6C25]">पारणा (व्रत पारण की विधि)</h4>
              <ul className="space-y-2 bg-slate-50 p-4 rounded-xl">
                <li>• 16 फरवरी को सूर्योदय के बाद</li>
                <li>• चतुर्दशी तिथि समाप्त होने से पहले व्रत पारण श्रेष्ठ माना जाता है</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* FAQ SECTION */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1B2624]">महा शिवरात्रि 2026 से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
          <div className="space-y-4">
            {[
              { q: "महा शिवरात्रि 2026 कब है?", a: "रविवार, 15 फरवरी 2026।" },
              { q: "शिव पूजा का सबसे शुभ समय कौन सा है?", a: "निशिता काल (12:09 AM – 1:01 AM)।" },
              { q: "क्या चार प्रहर पूजा अनिवार्य है?", a: "नहीं, पूजा एक बार भी की जा सकती है।" },
              { q: "क्या उपवास करना जरूरी है?", a: "अनिवार्य नहीं, लेकिन अत्यंत फलदायी माना जाता है।" },
              { q: "शिवरात्रि व्रत कब तोड़ना चाहिए?", a: "16 फरवरी को सूर्योदय के बाद।" }
            ].map((faq, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-2xl hover:bg-[#F5EBE0]/20 transition-colors">
                <p className="font-bold text-[#BC6C25]">प्रश्न {i+1}: {faq.q}</p>
                <p className="mt-2 text-[#1B2624]/80">उत्तर: {faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CONCLUSION */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#1B2624] to-[#2D4A44] p-8 md:p-12 rounded-[40px] text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold">निष्कर्ष</h2>
            <p className="text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">
              महा शिवरात्रि 2026 भक्ति, आत्मशुद्धि और भगवान शिव से जुड़ने का अत्यंत पावन अवसर है। चाहे आप इसे Mahashivratri कहें, यह रात्रि साधना, उपवास और जागरण के माध्यम से जीवन में सकारात्मक परिवर्तन लाने का मार्ग खोलती है।
            </p>
            <p className="text-xl font-bold text-[#F2C078] pt-4">
              इस पवित्र रात्रि को पूर्ण श्रद्धा, अनुशासन और शिव भक्ति के साथ मनाएं।
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#BC6C25]/10 rounded-full blur-3xl"></div>
        </motion.div>

        

      </motion.div>
    </section>
  );
}

export default Mahashivratri;