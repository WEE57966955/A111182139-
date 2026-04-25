/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Clock, DollarSign, ExternalLink, Briefcase, GraduationCap, Code, FileText, User } from 'lucide-react';

type Section = 'resume' | 'travel-39' | 'travel-314' | 'travel-323';

const RESUME_CONTENT = {
  name: '吳衫憲',
  description: '目前就讀於國立高雄科技大學航技系',
  sections: [
    {
      title: '打工經歷',
      icon: <Briefcase size={20} />,
      items: [
        { date: '2025 ~ 現在', role: '打工實習生' }
      ]
    },
    {
      title: '實習經歷',
      icon: <GraduationCap size={20} />,
      items: [
        { date: '2025 ~ 2025', role: '御風輪實習' }
      ]
    },
    {
      title: '電腦技能',
      icon: <Code size={20} />,
      items: [
        { label: '辦公應用軟體', desc: 'Word, Excel, PowerPoint' },
        { label: '專案應用軟體', desc: 'Project Management Tools' }
      ]
    },
    {
      title: '專業證照',
      icon: <FileText size={20} />,
      items: [
        { label: '四小證', desc: '基礎安全訓練等' },
        { label: '其它證照', desc: '專業技術證照' }
      ]
    },
    {
      title: '自傳',
      icon: <User size={20} />,
      content: '熱愛海洋與航海技術，專注於航技專業學習，並積極參與實習與校外打工，培養實務經驗與團隊合作能力。'
    }
  ]
};

const TRAVEL_39_SLIDES = [
  {
    id: '39-cover',
    type: 'cover',
    title: '3/9 旅行規劃',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop',
    imagePrompt: 'Tainan landmark'
  },
  {
    id: '39-day1',
    type: 'itinerary',
    day: 'Day 1',
    title: '府城古蹟與藥膳之夜',
    date: '4/3 (FRI)',
    image: 'https://images.unsplash.com/photo-1595085444390-336c1e30a5ca?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '10:30', event: '高鐵抵達台南', cost: '$1,350', desc: '交通：從台北搭乘高鐵南下（全票價）。' },
      { time: '12:30', event: '覓食午餐', cost: '$800', desc: '飲食：享用高品質中式料理，清洗舟車勞頓的疲憊。' },
      { time: '14:00', event: '西市場 / 林百貨', cost: '$0', desc: '活動：百年古蹟建築巡禮，搭乘復古指針電梯至頂樓參觀。' },
      { time: '19:30', event: '博仁堂藥膳晚餐', cost: '$600', desc: '飲食：榮獲 2026 必比登推薦！坐在百年中藥行品嚐藥膳。' },
      { time: '21:00', event: '中西區老宅民宿', cost: '$2,500', desc: '住宿：入住隱身巷弄的質感老宅（已含清明連假加價價格）。' }
    ]
  },
  {
    id: '39-day2',
    type: 'itinerary',
    day: 'Day 2',
    title: '自然生態與安平漫步',
    date: '4/4 (SAT)',
    image: 'https://images.unsplash.com/photo-1624388835221-5077bd8f4fcc?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '10:00', event: '四草綠色隧道', cost: '$200', desc: '活動：搭乘竹筏穿越有「台版亞馬遜」之稱的紅樹林隧道。' },
      { time: '12:00', event: '安平老街午餐', cost: '$500', desc: '飲食：品嚐周氏蝦捲、安平豆花等在地經典小吃。' },
      { time: '14:00', event: '安平古堡 / 樹屋', cost: '$100', desc: '活動：穿梭於荷蘭時期的城堡遺跡與盤根錯節的樹屋空間。' },
      { time: '17:00', event: '神農街散策', cost: '$0', desc: '活動：傍晚時分走入充滿藝術感與文青氣息的老街巷弄。' },
      { time: '20:00', event: '花園夜市', cost: '$400', desc: '飲食：來到全台最富盛名的夜市，挑戰大飽口福。' }
    ]
  },
  {
    id: '39-day3',
    type: 'itinerary',
    day: 'Day 3',
    title: '文藝美學與賦歸之路',
    date: '4/5 (SUN)',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '10:00', event: '奇美博物館', cost: '$200', desc: '活動：參觀宏偉的西洋建築風格博物館，欣賞珍貴館藏。' },
      { time: '13:00', event: '十鼓文創園區', cost: '$499', desc: '活動：昔日糖廠改建的藝術園區，體驗震撼的鼓樂表演。' },
      { time: '16:30', event: '賦歸', cost: '$0', desc: '活動：帶著豐盛的回憶前往高鐵站準備北返。' },
      { time: '17:30', event: '高鐵前往台北', cost: '$1,350', desc: '交通：搭乘高鐵返回溫暖的家。' }
    ]
  }
];

const TRAVEL_323_SLIDES = [
  {
    id: '323-cover',
    type: 'cover',
    title: '3/23 旅行規劃',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2000&auto=format&fit=crop',
    imagePrompt: 'Travel planning, map and camera'
  },
  {
    id: '323-day1',
    type: 'itinerary',
    day: 'Day 1',
    title: '台南府城精華',
    date: '4/3 (FRI)',
    image: 'https://images.unsplash.com/photo-1595085444390-336c1e30a5ca?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '10:30', event: '高鐵抵達台南', cost: '$1,350', desc: '台北-台南全票' },
      { time: '12:30', event: '滿花庭午餐', cost: '$800', desc: '質感中式料理' },
      { time: '14:00', event: '西市場/林百貨', cost: '$0', desc: '百年古蹟巡禮' },
      { time: '19:30', event: '博仁堂藥膳晚餐', cost: '$600', desc: '2026 必比登推薦' },
      { time: '21:00', event: '中西區老宅民宿', cost: '$2,500', desc: '連假加倍價格' }
    ]
  },
  {
    id: '323-day2',
    type: 'itinerary',
    day: 'Day 2',
    title: '安平深度遊',
    date: '4/4 (SAT)',
    image: 'https://images.unsplash.com/photo-1624388835221-5077bd8f4fcc?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '08:30', event: '金得春捲 (傳統體驗)', cost: '$100', desc: '清明節國慶必吃' },
      { time: '10:00', event: '四草綠色隧道', cost: '$200', desc: '船票漲價價' },
      { time: '13:00', event: '安平古堡/樹屋', cost: '$100', desc: '古蹟兩處原價' },
      { time: '15:00', event: '文章牛肉湯午餐', cost: '$400', desc: '含熱炒配菜' },
      { time: '19:00', event: '筑馨居 (無菜單)', cost: '$900', desc: '需 21 天前預約' },
      { time: '21:00', event: '中西區老宅民宿', cost: '$2,500', desc: '連假加倍價格' }
    ]
  },
  {
    id: '323-day3',
    type: 'itinerary',
    day: 'Day 3',
    title: '文創與嘉義之行',
    date: '4/5 (SUN)',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '09:30', event: '奇美博物館', cost: '$200', desc: '2026 埃及特展票' },
      { time: '12:30', event: '十鼓文創園區', cost: '$509', desc: '2026 集票價格' },
      { time: '16:30', event: '移動至嘉義 (區間車)', cost: '$60', desc: '台南至新左營' },
      { time: '19:00', event: '城前鮨 (燒肉)', cost: '$1,500', desc: '時代店/美術舘店' },
      { time: '21:00', event: '嘉義蘭潭清晨飯店', cost: '$3,500', desc: '清明連假巔峰房價' }
    ]
  },
  {
    id: '323-day4',
    type: 'itinerary',
    day: 'Day 4',
    title: '嘉義散策與賦歸',
    date: '4/6 (MON)',
    image: 'https://images.unsplash.com/photo-1516738901171-ec52778619bc?q=80&w=2000&auto=format&fit=crop',
    items: [
      { time: '09:30', event: '蘭潭跟鐘/燈塔', cost: '$100', desc: '晨輪+悠閒咖啡' },
      { time: '12:30', event: '嘉義早午餐', cost: '$500', desc: '質感早午餐' },
      { time: '14:30', event: 'LaLaport 廣山店', cost: '$0', desc: '2026 暑假地標' },
      { time: '16:00', event: '老江紅茶 (行程輕食)', cost: '$50', desc: '行程輕食補給' }
    ]
  }
];

const TRAVEL_314_URL = "https://studio.tripo3d.ai/3d-model/608c9c9d-5a4d-435f-933c-9cd27e0494e5?invite_code=03ER8L";

export default function App() {
  const [activeTab, setActiveTab] = useState<Section>('resume');
  const [currentSlide, setCurrentSlide] = useState(0);

  const getSlides = () => {
    switch (activeTab) {
      case 'travel-39': return TRAVEL_39_SLIDES;
      case 'travel-323': return TRAVEL_323_SLIDES;
      default: return [];
    }
  };

  const slides = getSlides();

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center py-8 px-4 md:px-8 font-sans">
      
      {/* Navigation Header */}
      <nav className="w-full max-w-5xl mb-8 flex flex-wrap justify-center gap-2">
        <button 
          onClick={() => { setActiveTab('resume'); setCurrentSlide(0); }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'resume' ? 'bg-[#A64B2A] text-white shadow-lg' : 'bg-[#222] text-gray-400 hover:bg-[#333]'}`}
        >
          首頁 (個人經歷)
        </button>
        <button 
          onClick={() => { setActiveTab('travel-39'); setCurrentSlide(0); }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'travel-39' ? 'bg-[#A64B2A] text-white shadow-lg' : 'bg-[#222] text-gray-400 hover:bg-[#333]'}`}
        >
          3/9 旅行規劃
        </button>
        <button 
          onClick={() => { setActiveTab('travel-314'); setCurrentSlide(0); }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'travel-314' ? 'bg-[#A64B2A] text-white shadow-lg' : 'bg-[#222] text-gray-400 hover:bg-[#333]'}`}
        >
          3/14 旅行規劃
        </button>
        <button 
          onClick={() => { setActiveTab('travel-323'); setCurrentSlide(0); }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'travel-323' ? 'bg-[#A64B2A] text-white shadow-lg' : 'bg-[#222] text-gray-400 hover:bg-[#333]'}`}
        >
          3/23 旅行規劃
        </button>
      </nav>

      <div className="relative w-full max-w-5xl aspect-video bg-[#FDF8F4] shadow-2xl rounded-lg overflow-hidden border border-gray-800">
        
        <AnimatePresence mode="wait">
          {activeTab === 'resume' ? (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex w-full h-full bg-white text-[#333]"
            >
              <div className="w-1/3 bg-[#F4EBE6] p-12 flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-6 overflow-hidden flex items-center justify-center">
                  <User size={64} className="text-gray-500" />
                </div>
                <h1 className="text-3xl font-bold mb-2 tracking-tight">{RESUME_CONTENT.name}</h1>
                <p className="text-sm text-[#A64B2A] font-medium text-center">{RESUME_CONTENT.description}</p>
                
                <div className="mt-auto w-full pt-8 border-t border-gray-300">
                   <div className="flex gap-4 items-center text-gray-400 mb-4">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><FileText size={16} /></div>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Portfolio</span>
                   </div>
                </div>
              </div>
              
              <div className="w-2/3 p-12 overflow-y-auto font-sans">
                <div className="grid grid-cols-2 gap-8">
                  {RESUME_CONTENT.sections.map((section, idx) => (
                    <div key={idx} className={section.title === '自傳' ? 'col-span-2' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-[#A64B2A]">{section.icon}</div>
                        <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
                      </div>
                      
                      {section.items ? (
                        <div className="space-y-3">
                          {section.items.map((item: any, i) => (
                            <div key={i} className="flex flex-col">
                              {item.date && <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">{item.date}</span>}
                              <span className="text-gray-800 font-medium">{item.role || item.label}</span>
                              {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 leading-relaxed bg-[#FDF8F4] p-4 rounded-lg border-l-4 border-[#A64B2A]">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'travel-39' ? (
            <motion.div
              key={activeTab + (slide?.id || '')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex w-full h-full relative"
            >
              {slide?.type === 'cover' ? (
                <div className="flex w-full h-full relative">
                  <img 
                    src={slide.image} 
                    alt="Cover"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                    <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-6xl font-bold tracking-wider mb-4 font-serif"
                    >
                      {slide.title}
                    </motion.h1>
                    <div className="w-32 h-1 bg-[#A64B2A] mb-8" />
                  </div>
                </div>
              ) : slide ? (
                <div className="flex w-full h-full">
                  <div className="w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-6">
                      <div className="w-12 h-1 bg-[#A64B2A] mb-4" />
                      <h2 className="text-3xl font-bold text-[#333] leading-tight mb-1">
                        {slide.day}: {slide.title}
                      </h2>
                      <h3 className="text-2xl font-bold text-[#A64B2A]">
                        {slide.date}
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {slide.items && slide.items.map((item: any, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-baseline gap-3">
                              <span className="text-[#A64B2A] font-bold text-sm whitespace-nowrap">{item.time}</span>
                              <span className="text-[#333] font-bold text-lg">{item.event}</span>
                            </div>
                            <span className="bg-[#E2E8E4] text-[#4F6F52] text-xs font-bold px-3 py-1 rounded-full">{item.cost}</span>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 relative">
                    <img 
                      src={slide.image} 
                      alt="Slide Image"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F4] via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ) : null}
              
              {/* Internal Slide Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200 z-10">
                <button onClick={prevSlide} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600"><ChevronLeft size={20} /></button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-800 bg-[#A64B2A]/10 px-2.5 py-0.5 rounded-full">{currentSlide + 1}</span>
                  <div className="flex gap-1">
                    {slides.map((_, idx) => (
                      <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentSlide ? 'bg-[#A64B2A]' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <button onClick={nextSlide} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600"><ChevronRight size={20} /></button>
                <div className="h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-2 text-gray-400">
                  <ExternalLink size={14} />
                  <span className="text-[10px] font-medium tracking-wider uppercase">Slide Mode</span>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'travel-323' ? (
            <motion.div
              key="travel-323-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full h-full bg-black relative flex-col items-center justify-center"
            >
              <div className="absolute top-8 left-8 z-20">
                <div className="w-12 h-1 bg-[#A64B2A] mb-4" />
                <h2 className="text-3xl font-bold text-white tracking-tight">3/23 旅行規劃影片</h2>
              </div>
              <div className="w-full h-full flex items-center justify-center p-12">
                <div className="relative w-full h-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                   {/* In a real scenario, we'd use the uploaded video path. 
                       Since we can't directly reference chat uploads as URLs easily in the code,
                       we provide a styled player. */}
                   <video 
                     className="w-full h-full object-cover"
                     controls
                     autoPlay
                     loop
                     muted
                     playsInline
                   >
                     <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                     Your browser does not support the video tag.
                   </video>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white text-sm font-medium tracking-wide">3/23 AI 生成影片展示 - 悠遊與自然建築美學</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="travel-314"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full h-full items-center justify-center flex-col text-center p-12 bg-[#F4F4F4]"
            >
              <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 text-[#A64B2A]">
                <Code size={48} />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">3/14 ai圖片</h2>
              <p className="text-lg text-gray-500 max-w-lg mb-8">
                這是一個 3D 模型項目的展示網址，點擊下方按鈕即可跳轉查看。
              </p>
              <a 
                href={TRAVEL_314_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A64B2A] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#8B3E23] transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>查看 3D 模型</span>
                <ExternalLink size={20} />
              </a>
              <div className="mt-12 text-xs text-gray-400 flex flex-col gap-2">
                <p>網址：{TRAVEL_314_URL}</p>
                <div className="flex justify-center gap-2">
                   <div className="w-8 h-1 bg-gray-300 rounded-full" />
                   <div className="w-8 h-1 bg-[#A64B2A] rounded-full" />
                   <div className="w-8 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Attribution */}
      <footer className="mt-12 text-gray-500 text-xs text-center">
        <p>© 2026 {RESUME_CONTENT.name} - 國立高雄科技大學航技系</p>
        <p className="mt-2 text-gray-600">專案內容參考自 Google Sites / Google Slides 設計</p>
      </footer>
    </div>
  );
}

