import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  BookOpen, 
  Heart, 
  Award, 
  ArrowRight, 
  User, 
  MapPin, 
  School, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Clock, 
  Sparkles, 
  BookOpenCheck, 
  FileText, 
  CheckCircle2, 
  Send,
  Scroll,
  Brain,
  BarChart3,
  QrCode
} from 'lucide-react';
import { StudentProfile } from '../types';
import { LEVEL_LIST, ALL_BADGES } from '../data';

interface LandingPageProps {
  onStart: (profile: StudentProfile) => void;
  savedProfile?: StudentProfile;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, savedProfile }) => {
  // Setup Form states
  const [name, setName] = useState(savedProfile?.name || '');
  const [classroom, setClassroom] = useState(savedProfile?.classroom || 'VII-A');
  const [school, setSchool] = useState(savedProfile?.school || 'MTsN 2 Ponorogo');
  const [selectedAvatar, setSelectedAvatar] = useState(savedProfile?.avatarSeed || 'MJ');
  const [avatarColor, setAvatarColor] = useState<string>('emerald'); // emerald, blue, gold, indigo

  // Learning Path slider active index
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);

  // Features interactive Tab state
  const [activeFeatureTab, setActiveFeatureTab] = useState<'video' | 'quiz' | 'diary'>('video');

  // Interactive feedback state in Footer
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart({
      name: name.trim(),
      classroom: classroom,
      school: school.trim(),
      avatarSeed: selectedAvatar,
    });
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackName('');
      setFeedbackMsg('');
      setFeedbackSuccess(false);
    }, 4000);
  };

  const avatarOptions = [
    { seed: 'MJ', label: 'Mujahid', color: 'emerald', desc: 'Siswa Rajin' },
    { seed: 'FZ', label: 'Fauzan', color: 'blue', desc: 'Pemikir Kritis' },
    { seed: 'KH', label: 'Khadijah', color: 'gold', desc: 'Santri Cerdas' },
    { seed: 'AI', label: 'Aisyah', color: 'indigo', desc: 'Penulis Kreatif' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-brand-gold/20 selection:text-brand-blue" id="landing-root">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B2F5E] text-white shadow-md border-b border-[#C8941A]/20" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Left */}
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => scrollToId('beranda')}>
              <div className="p-1.5 bg-gradient-to-br from-[#C8941A] to-[#2E7D32] rounded-xl text-white shadow-inner flex items-center justify-center">
                <Compass className="w-6 h-6 animate-spin-slow text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-[#C8941A] text-lg tracking-wider leading-none">HISTO-PATH</span>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-widest mt-0.5">MTsN 2 PONOROGO</span>
              </div>
            </div>

            {/* Menu Items Center-Right */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToId('beranda')} className="text-white hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">Beranda</button>
              <button onClick={() => scrollToId('tentang')} className="text-slate-200 hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">Tentang</button>
              <button onClick={() => scrollToId('pilar')} className="text-slate-200 hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">Keunggulan</button>
              <button onClick={() => scrollToId('fitur')} className="text-slate-200 hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">Fitur</button>
              <button onClick={() => scrollToId('rute')} className="text-slate-200 hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">10 Rute Dakwah</button>
              <button onClick={() => scrollToId('panduan')} className="text-slate-200 hover:text-[#C8941A] font-medium text-xs uppercase tracking-wider transition-colors">Panduan</button>
            </div>

            {/* CTA Button Right */}
            <div>
              <button 
                onClick={() => scrollToId('onboarding')}
                className="bg-[#C8941A] hover:bg-[#b08013] text-white px-5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {savedProfile ? 'Buka Dashboard' : 'Mulai Belajar'}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Spacer to push content below fixed navigation bar */}
      <div className="h-16" id="beranda"></div>

      {/* 2. HERO SECTION */}
      <section className="relative bg-[#1B2F5E] text-white bg-islamic-pattern py-20 lg:py-28 overflow-hidden" id="beranda-hero">
        {/* Subtle dark-to-slightly-lighter navy background gradient to provide premium depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#101D3D] via-[#1B2F5E] to-[#223B75] opacity-90 mix-blend-multiply pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center space-x-2 bg-[#C8941A]/10 border border-[#C8941A]/30 text-[#C8941A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Untuk Siswa Kelas VII MTs
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-[48px] font-display font-bold text-white leading-[1.1] tracking-tight">
                Belajar Sejarah Islam Lebih Bermakna
              </h1>
              
              <p className="text-slate-200 text-[16px] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Jalur belajar bertahap, visual, dan interaktif untuk memahami perjuangan dakwah Nabi Muhammad SAW di Makkah.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => scrollToId('onboarding')}
                  className="bg-[#C8941A] hover:bg-[#b08013] text-white px-7 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  Mulai Belajar
                </button>
                <button 
                  onClick={() => scrollToId('rute')}
                  className="bg-transparent hover:bg-white/5 border border-white text-white px-7 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
                >
                  Lihat Learning Path
                </button>
              </div>
            </div>

            {/* Hero Right Graphic - Ancient Arabic Sunset Vector Art */}
            <div className="relative flex justify-center items-center w-full">
              <div className="relative w-full max-w-[500px] xl:max-w-[550px] aspect-[4/3] rounded-3xl border border-[#C8941A]/25 bg-[#132247]/50 p-3 shadow-2xl overflow-hidden backdrop-blur-xs">
                
                {/* SVG Container */}
                <svg 
                  viewBox="0 0 520 390" 
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle sunset sky - navy-only gradient from deep to slightly lighter */}
                  <defs>
                    <linearGradient id="sunset-sky" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#1B2F5E" />
                      <stop offset="100%" stopColor="#132247" />
                    </linearGradient>
                  </defs>
                  <rect width="520" height="390" fill="url(#sunset-sky)" rx="16" />

                  {/* Sunset sun disc background */}
                  <circle cx="260" cy="180" r="45" fill="none" stroke="#C8941A" strokeWidth="1.5" strokeOpacity="0.4" />
                  <circle cx="260" cy="180" r="35" fill="#C8941A" opacity="0.15" />
                  <circle cx="260" cy="180" r="20" fill="#FAF7F0" opacity="0.1" />

                  {/* Decorative compass rose overlay in gold at 30% opacity */}
                  <g transform="translate(260, 180)" stroke="#C8941A" strokeOpacity="0.3" strokeWidth="1" fill="none">
                    <circle cx="0" cy="0" r="120" strokeDasharray="3,3" />
                    <circle cx="0" cy="0" r="105" />
                    <circle cx="0" cy="0" r="90" strokeDasharray="5,5" />
                    <circle cx="0" cy="0" r="4" fill="#C8941A" fillOpacity="0.3" />
                    {/* Direction indicators */}
                    <line x1="0" y1="-135" x2="0" y2="135" />
                    <line x1="-135" y1="0" x2="135" y2="0" />
                    <line x1="-95" y1="-95" x2="95" y2="95" />
                    <line x1="-95" y1="95" x2="95" y2="-95" />

                    {/* Exquisite diamond pointers */}
                    <path d="M 0,0 L -8,-35 L 0,-125 L 8,-35 Z" fill="#C8941A" fillOpacity="0.12" stroke="#C8941A" strokeOpacity="0.3" />
                    <path d="M 0,0 L -8,35 L 0,125 L 8,35 Z" fill="#C8941A" fillOpacity="0.12" stroke="#C8941A" strokeOpacity="0.3" />
                    <path d="M 0,0 L 35,-8 L 125,0 L 35,8 Z" fill="#C8941A" fillOpacity="0.12" stroke="#C8941A" strokeOpacity="0.3" />
                    <path d="M 0,0 L -35,-8 L -125,0 L -35,8 Z" fill="#C8941A" fillOpacity="0.12" stroke="#C8941A" strokeOpacity="0.3" />

                    {/* Sub-cardinal pointers */}
                    <path d="M 0,0 L -6,-20 L -85,-85 L 20,6 Z" fill="#C8941A" fillOpacity="0.08" stroke="#C8941A" strokeOpacity="0.2" />
                    <path d="M 0,0 L 20,-6 L 85,-85 L -6,20 Z" fill="#C8941A" fillOpacity="0.08" stroke="#C8941A" strokeOpacity="0.2" />
                    <path d="M 0,0 L -6,20 L -85,85 L 20,-6 Z" fill="#C8941A" fillOpacity="0.08" stroke="#C8941A" strokeOpacity="0.2" />
                    <path d="M 0,0 L 20,6 L 85,85 L -6,-20 Z" fill="#C8941A" fillOpacity="0.08" stroke="#C8941A" strokeOpacity="0.2" />
                  </g>

                  {/* Ancient Arabic City Skyline background silhouettes */}
                  {/* Left Skyline domes and house shapes */}
                  <g transform="translate(15, 170)" fill="#132247" stroke="#C8941A" strokeWidth="0.75">
                    {/* Small minaret */}
                    <path d="M 10,120 L 10,50 L 15,45 L 15,120 Z" fill="#132247" />
                    <path d="M 15,120 L 15,45 L 20,50 L 20,120 Z" fill="#182A54" />
                    <path d="M 7,50 L 23,50 L 15,30 Z" fill="#C8941A" />
                    {/* Small Dome */}
                    <path d="M 30,120 A 25,25 0 0,1 80,120 Z" fill="#132247" />
                    <path d="M 55,95 L 55,80" stroke="#C8941A" strokeWidth="1" />
                    {/* House blocks */}
                    <rect x="80" y="80" width="45" height="40" fill="#132247" />
                    <rect x="110" y="90" width="30" height="30" fill="#182A54" />
                    <path d="M 80,80 L 102,65 L 125,80 Z" fill="#132247" stroke="#C8941A" />
                  </g>

                  {/* Right Skyline minarets and structures */}
                  <g transform="translate(370, 150)" fill="#132247" stroke="#C8941A" strokeWidth="0.75">
                    {/* Tall sleek minaret */}
                    <path d="M 50,140 L 50,40 L 58,35 L 58,140 Z" fill="#132247" />
                    <path d="M 58,140 L 58,35 L 66,40 L 66,140 Z" fill="#182A54" />
                    {/* Balconies */}
                    <rect x="46" y="60" width="24" height="4" fill="#C8941A" stroke="none" />
                    <rect x="48" y="95" width="20" height="4" fill="#C8941A" stroke="none" />
                    <path d="M 46,35 L 70,35 L 58,10 Z" fill="#C8941A" />
                    <circle cx="58" cy="6" r="1.5" fill="#FAF7F0" />
                    
                    {/* Medium Dome */}
                    <path d="M 0,140 A 30,30 0 0,1 60,140 Z" fill="#132247" />
                    <path d="M 30,110 L 30,95" stroke="#C8941A" strokeWidth="1" />
                    {/* Arch on the dome */}
                    <path d="M 22,140 L 22,125 A 8,8 0 0,1 38,125 L 38,140 Z" fill="#182A54" stroke="#C8941A" strokeWidth="0.5" />
                  </g>

                  {/* Center house fills */}
                  <path d="M 120,290 L 120,220 L 150,205 L 180,220 L 180,290 Z" fill="#132247" stroke="#C8941A" strokeWidth="0.75" />
                  <path d="M 180,290 L 180,240 L 210,230 L 210,290 Z" fill="#0D1936" stroke="#C8941A" strokeWidth="0.75" />
                  <path d="M 310,290 L 310,230 L 350,210 L 380,230 L 380,290 Z" fill="#132247" stroke="#C8941A" strokeWidth="0.75" />

                  {/* Kaaba Silhouette in Foreground with Gold/White patterns only */}
                  <g transform="translate(205, 195)">
                    {/* Left side face */}
                    <path d="M 0,45 L 54,68 L 54,135 L 0,118 Z" fill="#132247" stroke="#FAF7F0" strokeWidth="1.25" />
                    {/* Right side face */}
                    <path d="M 54,68 L 108,45 L 108,118 L 54,135 Z" fill="#0D1935" stroke="#FAF7F0" strokeWidth="1.25" />
                    {/* Roof of Kaaba */}
                    <path d="M 0,45 L 54,68 L 108,45 L 54,23 Z" fill="#1B2F5E" stroke="#FAF7F0" strokeWidth="1" />

                    {/* Gold Kiswah band (Golden Calligraphy border) */}
                    <path d="M 0,61 L 54,79 L 54,87 L 0,70 Z" fill="#C8941A" />
                    <path d="M 54,79 L 108,61 L 108,70 L 54,87 Z" fill="#C8941A" />
                    
                    {/* Calligraphy fine lines */}
                    <line x1="12" y1="67" x2="48" y2="78" stroke="#132247" strokeWidth="0.75" strokeDasharray="2,2" />
                    <line x1="60" y1="78" x2="98" y2="67" stroke="#132247" strokeWidth="0.75" strokeDasharray="2,2" />

                    {/* Golden Door (Bab al-Kaaba) with white border framing */}
                    <path d="M 72,75 L 94,65 L 94,110 L 72,122 Z" fill="#C8941A" stroke="#FAF7F0" strokeWidth="1" />
                    {/* Door divide */}
                    <line x1="83" y1="70" x2="83" y2="116" stroke="#0D1935" strokeWidth="1.25" />
                    {/* Door lock handle details */}
                    <circle cx="83" cy="94" r="2.5" fill="#FAF7F0" />
                    <circle cx="83" cy="94" r="1" fill="#C8941A" />
                  </g>

                  {/* Sand dunes overlay */}
                  {/* Back dune line */}
                  <path d="M-20,310 Q 140,265 310,320 T 540,295 L 540,410 L -20,410 Z" fill="#132247" opacity="0.95" />
                  <path d="M-20,310 Q 140,265 310,320 T 540,295" fill="none" stroke="#C8941A" strokeWidth="1.25" strokeOpacity="0.4" />

                  {/* Foreground dune line */}
                  <path d="M-20,340 Q 110,295 280,355 T 540,330 L 540,410 L -20,410 Z" fill="#1F356B" />
                  <path d="M-20,340 Q 110,295 280,355 T 540,330" fill="none" stroke="#C8941A" strokeWidth="2" strokeOpacity="0.75" />

                  {/* Tiny Silhouette Camel caravan crossing sand dunes */}
                  <g transform="translate(60, 315)" fill="#132247" stroke="#C8941A" strokeWidth="0.5" opacity="0.85">
                    <ellipse cx="14" cy="12" rx="4" ry="2" />
                    <path d="M 14,10 C 14,7 18,5 20,8 L 21,12" fill="none" stroke="#132247" strokeWidth="1.5" />
                    <line x1="12" y1="14" x2="10" y2="19" stroke="#132247" strokeWidth="1" />
                    <line x1="16" y1="14" x2="18" y2="19" stroke="#132247" strokeWidth="1" />
                    <circle cx="6" cy="12" r="1.5" fill="#C8941A" />
                    <line x1="6" y1="13.5" x2="6" y2="18" stroke="#FAF7F0" strokeWidth="0.75" />
                    <line x1="6" y1="15" x2="12" y2="15" stroke="#C8941A" strokeWidth="0.5" />
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gold Divider Line between major sections */}
      <div className="bg-[#C8941A] h-1.5 w-full"></div>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 bg-white" id="tentang">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Stylized Islamic Arched Frame mimicking manuscript */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                className="w-full max-w-[360px] bg-gradient-to-br from-[#FAF7F0] to-[#E8F5E9] border-4 border-dashed border-[#C8941A]/30 p-4 shadow-xl relative"
                style={{ borderRadius: '130px 130px 20px 20px' }}
              >
                <div 
                  className="w-full h-[380px] bg-white border border-[#2E7D32]/20 flex flex-col justify-between p-6 overflow-hidden bg-islamic-light-pattern"
                  style={{ borderRadius: '115px 115px 12px 12px' }}
                >
                  <div className="text-center pt-6">
                    <span className="text-4xl">📜</span>
                    <div className="w-12 h-0.5 bg-[#C8941A] mx-auto my-3"></div>
                  </div>

                  <div className="my-auto space-y-3 text-center px-2">
                    <h4 className="font-display font-extrabold text-[#1B2F5E] text-sm uppercase tracking-wide">
                      BELAJAR DARI JEJAK MASA LALU
                    </h4>

                    <div className="space-y-1 py-0.5">
                      <p className="text-xs font-serif italic text-slate-700 leading-snug">
                        &ldquo;Pada kisah-kisah mereka terdapat pelajaran bagi orang yang mempunyai akal.&rdquo;
                      </p>
                      <p className="text-[10px] font-bold text-[#C8941A] uppercase tracking-widest font-mono">
                        QS. YUSUF: 111
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Sejarah bukan sekadar menghafal masa lalu. Pahami peristiwanya, analisis maknanya, dan temukan pelajaran untuk hari ini.
                    </p>
                  </div>

                  <div className="text-center pb-2 text-[10px] font-mono font-bold text-[#2E7D32] uppercase tracking-wider">
                    - Kurikulum Integratif MTs -
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Information */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider block border-l-4 border-[#2E7D32] pl-3">
                Mengenal HISTO-PATH LMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B2F5E] tracking-tight">
                Apa itu HISTO-PATH LMS?
              </h2>
              
              <div className="w-16 h-1 bg-[#C8941A] my-4 rounded-full"></div>

              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>HISTO-PATH LMS (Historical Thinking Path Integrated Learning Management System)</strong> adalah platform pembelajaran digital interaktif yang dirancang khusus untuk siswa Kelas VII Madrasah Tsanawiyah (MTsN 2 Ponorogo). Media ini dirancang untuk mengubah paradigma pembelajaran sejarah Islam yang sering dinilai kering menjadi sebuah petualangan bernalar kronologis yang seru.
              </p>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                Melalui metode <em>Historical Thinking Path</em> (Jalur Berpikir Sejarah), siswa tidak sekadar menyerap informasi pasif, melainkan dilatih berperan layaknya sejarawan muda. Mereka akan diajak menganalisis sumber otentik, memikirkan motivasi sosiologis di balik peristiwa dakwah Makkah, menumbuhkan rasa empati sejarah yang mendalam, serta menuangkan komitmen refleksi moral atas keteladanan mulia Rasulullah SAW.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold text-xs text-[#1B2F5E]">Ramah Kelas VII MTs</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Bahasa, navigasi, dan visual yang disesuaikan dengan psikologi santri remaja.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold text-xs text-[#1B2F5E]">Fokus Keteladanan Moral</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Setiap level diakhiri dengan evaluasi moral pribadi untuk membentuk akhlakul karimah.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. UNIQUE VALUE SECTION */}
      <section className="py-24 bg-[#E8EDF5] bg-islamic-light-pattern border-y border-[#C8941A]/10 animate-fade-in" id="pilar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B2F5E] inline-block relative pb-4">
            Mengapa HISTO-PATH LMS Berbeda?
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#C8941A] rounded-full"></span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-xl mx-auto font-light">
            Inovasi model jalur belajar mandiri yang memicu pemikiran mendalam, analitis, dan pembentukan akhlakul karimah.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 text-left">
            
            {/* Card 1: Top-Left */}
            <div className="bg-white p-6 rounded-[16px] shadow-md hover:shadow-lg transition-all duration-300 border-b-[4px] border-[#C8941A] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#1B2F5E]/10 rounded-xl flex items-center justify-center text-[#1B2F5E] mb-4">
                  <Compass className="w-6 h-6 text-[#1B2F5E]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B2F5E] mb-1">
                  Learning Path Historis
                </h3>
                <h4 className="text-xs font-semibold text-[#C8941A]/90 uppercase tracking-wider mb-3">
                  Belajar Bertahap, Bukan Melompat
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  10 level tersusun sesuai urutan sejarah yang logis dan kronologis.
                </p>
              </div>
            </div>

            {/* Card 2: Top-Right */}
            <div className="bg-white p-6 rounded-[16px] shadow-md hover:shadow-lg transition-all duration-300 border-b-[4px] border-[#2E7D32] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#2E7D32]/10 rounded-xl flex items-center justify-center text-[#2E7D32] mb-4">
                  <Scroll className="w-6 h-6 text-[#2E7D32]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B2F5E] mb-1">
                  Historical Thinking Framework
                </h3>
                <h4 className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wider mb-3">
                  Bukan Hafalan, Tapi Pemahaman
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Setiap level melatih satu kemampuan berpikir historis yang berbeda.
                </p>
              </div>
            </div>

            {/* Card 3: Bottom-Left */}
            <div className="bg-white p-6 rounded-[16px] shadow-md hover:shadow-lg transition-all duration-300 border-b-[4px] border-[#C8941A] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#C8941A]/10 rounded-xl flex items-center justify-center text-[#C8941A] mb-4">
                  <BarChart3 className="w-6 h-6 text-[#C8941A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B2F5E] mb-1">
                  Smart Infographic Learning
                </h3>
                <h4 className="text-xs font-semibold text-[#C8941A]/90 uppercase tracking-wider mb-3">
                  Materi yang Mudah Dipahami
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Infografis visual merangkum materi tanpa memenuhi layar dengan teks.
                </p>
              </div>
            </div>

            {/* Card 4: Bottom-Right */}
            <div className="bg-white p-6 rounded-[16px] shadow-md hover:shadow-lg transition-all duration-300 border-b-[4px] border-[#1B2F5E] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#1B2F5E]/10 rounded-xl flex items-center justify-center text-[#1B2F5E] mb-4">
                  <QrCode className="w-6 h-6 text-[#1B2F5E]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B2F5E] mb-1">
                  QR-Assisted Learning
                </h3>
                <h4 className="text-xs font-semibold text-[#1B2F5E] uppercase tracking-wider mb-3">
                  Belajar Lebih Luas dengan Satu Scan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  QR Code di setiap level membuka video, peta interaktif, dan kuis digital.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section className="py-24 bg-white" id="fitur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">Alat Belajar Interaktif</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B2F5E]">Fitur Unggulan Pembelajaran</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-light">
              Mendorong keaktifan siswa di MTsN 2 Ponorogo dengan integrasi media audio visual, tantangan evaluatif, dan jurnal komitmen.
            </p>
            <div className="w-16 h-0.5 bg-[#C8941A] mx-auto my-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive feature selector tabs left (5-cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <button 
                onClick={() => setActiveFeatureTab('video')}
                className={`w-full p-4 rounded-2xl flex items-start space-x-4 text-left transition-all border ${
                  activeFeatureTab === 'video' 
                    ? 'bg-[#1B2F5E] text-white border-[#C8941A] shadow-lg' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeFeatureTab === 'video' ? 'bg-[#C8941A] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">01. Video Simulasi & Peta Konsep</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${activeFeatureTab === 'video' ? 'text-slate-200' : 'text-slate-500'}`}>
                    Menyajikan navigasi materi berkualitas, peta lokasi, sosiologis, silsilah klan, dan asbabun nuzul wahyu secara ringkas.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setActiveFeatureTab('quiz')}
                className={`w-full p-4 rounded-2xl flex items-start space-x-4 text-left transition-all border ${
                  activeFeatureTab === 'quiz' 
                    ? 'bg-[#1B2F5E] text-white border-[#C8941A] shadow-lg' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeFeatureTab === 'quiz' ? 'bg-[#C8941A] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">02. Kuis Berpikir Kritis & Lencana</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${activeFeatureTab === 'quiz' ? 'text-slate-200' : 'text-slate-500'}`}>
                    Uji pemahaman analitis siswa pasca-materi, peroleh skor real-time, dan raih tanda lencana kepintaran sejarah di setiap jenjang.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setActiveFeatureTab('diary')}
                className={`w-full p-4 rounded-2xl flex items-start space-x-4 text-left transition-all border ${
                  activeFeatureTab === 'diary' 
                    ? 'bg-[#1B2F5E] text-white border-[#C8941A] shadow-lg' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeFeatureTab === 'diary' ? 'bg-[#C8941A] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">03. Jurnal Refleksi Akhlak Mulia</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${activeFeatureTab === 'diary' ? 'text-slate-200' : 'text-slate-500'}`}>
                    Aspek evaluasi diri siswa. Merancang penyimpulan sikap, mencontoh kegigihan dakwah, kejujuran Al-Amin, dan mencatatkan di database lokal.
                  </p>
                </div>
              </button>

            </div>

            {/* Showcase Visual right (7-cols) */}
            <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#C8941A]/20 p-6 rounded-3xl shadow-md min-h-[350px] flex flex-col justify-between relative overflow-hidden bg-islamic-light-pattern">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8941A]/5 rounded-bl-[100px] border-l border-b border-[#C8941A]/15 z-0"></div>

              {activeFeatureTab === 'video' && (
                <div className="space-y-4 relative z-10 animate-fade-in">
                  <div className="flex items-center space-x-3 text-[#1B2F5E]">
                    <span className="text-3xl">🎥</span>
                    <div>
                      <h3 className="font-display font-extrabold text-sm uppercase">Simulasi Narasi Sejarah Makkah</h3>
                      <span className="text-[10px] text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Fokus Sosiokultural</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    Visualisasi letak demografi arab jahiliyyah kuno, melacak titik rahasia rumah arqam bin abi arqam, serta silsilah keluarga mulia Bani Hasyim. Disajikan dalam pemutar materi interaktif berdurasi singkat yang mengutamakan intisari pemahaman sejarah (SKI) yang asik.
                  </p>

                  <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[10px] text-slate-500 font-mono">Modul Konsep Digital Kelas VII</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#1B2F5E]">Video Media Interaktif</span>
                  </div>

                  {/* Mock Video player mockup */}
                  <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white relative overflow-hidden border border-[#C8941A]/30">
                    <div className="absolute top-2 left-3 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#C8941A]">LEVEL 02 : ARAB PRA-ISLAM</div>
                    <span className="text-3xl hover:scale-110 transition-transform cursor-pointer">▶️</span>
                    <div className="absolute bottom-2 right-3 text-[9px] text-[#2E7D32] font-semibold bg-white px-1.5 py-0.5 rounded">Simulasi Media MTs</div>
                  </div>
                </div>
              )}

              {activeFeatureTab === 'quiz' && (
                <div className="space-y-4 relative z-10 animate-fade-in">
                  <div className="flex items-center space-x-3 text-[#2E7D32]">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <h3 className="font-display font-extrabold text-sm uppercase">Kuis Evaluatif Berpikir Kritik</h3>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Perolehan Lencana Kelulusan</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    Bukan kuis hafalan mati! Kami menyusun butir soal analitis menantang (HOTS) yang memancing siswa memposisikan pemikiran logis. Jawab kuis untuk membuka level selanjutnya secara otomatis serta memperoleh badge di Dashboard pribadi.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                      <span className="block text-lg font-display font-bold text-[#1B2F5E]">100%</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest">Akurasi Nilai</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                      <span className="block text-lg font-display font-bold text-[#2E7D32]">Lencana</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest">Otomatis Disimpan</span>
                    </div>
                  </div>

                  {/* Badge Preview line */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="p-1 bg-yellow-500/10 rounded text-base">💎</span>
                      <p className="font-bold text-slate-700 text-[11px]">Lencana Al-Amin (Integritas)</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Tersedia</span>
                  </div>
                </div>
              )}

              {activeFeatureTab === 'diary' && (
                <div className="space-y-4 relative z-10 animate-fade-in">
                  <div className="flex items-center space-x-3 text-[#C8941A]">
                    <span className="text-3xl">📝</span>
                    <div>
                      <h3 className="font-display font-extrabold text-sm uppercase">Jurnal Komitmen Reflektif</h3>
                      <span className="text-[10px] text-slate-100 bg-[#1B2F5E] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Pembentukan Karakter Akhlak</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    Setiap level mengharuskan siswa terhubung secara batin. Mereka akan ditanya: <em>"Bentuk keteladanan kejujuran apa yang bisa kamu lakukan hari ini meniru sifat mulia nabi?"</em> Jurnal ini dicatat dalam Buku Refleksi digital yang bisa ditinjau guru atau orang tua.
                  </p>

                  {/* Refleksi visual teaser box */}
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 bg-amber-50/20 italic text-[11px] text-slate-600 space-y-2">
                    <span className="text-xs font-bold font-display uppercase tracking-widest text-[#2E7D32] not-italic block">Contoh Refleksi Siswa:</span>
                    "Saya berkomitmen untuk bersikap jujur dan berbicara apa adanya saat berdagang membantu orang tua di pasar, meniru integritas mulia Rasulullah SAW sewaktu masih remaja..."
                  </div>
                </div>
              )}

              {/* MTsN 2 Ponorogo integration tag */}
              <div className="border-t border-[#C8941A]/10 pt-4 mt-4 flex items-center justify-between text-[11px] text-[#1B2F5E]/60 font-semibold">
                <span className="flex items-center space-x-1">
                  <School className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Konteks Akademik MTsN 2 Ponorogo</span>
                </span>
                <span>Kemajuan Belajar Nyata</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. LEARNING PATH PREVIEW (10 Levels Interactive Stepper) */}
      <section className="py-24 bg-[#E8F5E9]/80 border-y border-[#2E7D32]/10" id="rute">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider bg-emerald-100/50 px-3.5 py-1.5 rounded-full inline-block">
              Peta Kurikulum Terstruktur
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B2F5E]">
              10 Rute Perjuangan Dakwah Makkah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light">
              Mulai petualangan sejarah dengan alur kronologis terstruktur. Klik angka tahapan di bawah untuk melihat ringkasan materi yang akan Anda kaji!
            </p>
            <div className="w-20 h-0.5 bg-[#C8941A] mx-auto my-3"></div>
          </div>

          {/* Stepper Circles Controls */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto mb-10">
            {LEVEL_LIST.map((lvl, index) => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevelIdx(index)}
                className={`w-10 h-10 rounded-xl font-display text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                  activeLevelIdx === index 
                    ? 'bg-[#2E7D32] text-white ring-4 ring-[#2E7D32]/20 scale-110 shadow-md border border-[#C8941A]' 
                    : 'bg-white text-[#1B2F5E] hover:bg-emerald-50 hover:text-[#2E7D32] border border-slate-200'
                }`}
                id={`level-step-btn-${index}`}
              >
                <span>{index + 1}</span>
                {/* Micro active dot marker */}
                {activeLevelIdx === index && (
                  <span className="absolute -top-1 right-0 w-2.5 h-2.5 bg-[#C8941A] rounded-full border border-white"></span>
                )}
              </button>
            ))}
          </div>

          {/* Active Level Content Display Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden bg-islamic-light-pattern">
            
            {/* Architectural accent frame */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-[100px] pointer-events-none"></div>

            {/* Level metadata left (including earned Badge) */}
            <div className="w-full md:w-1/3 space-y-4 md:border-r border-slate-100 md:pr-8">
              <div className="flex items-center space-x-3">
                <span className="text-4xl p-2 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                  {LEVEL_LIST[activeLevelIdx].emoji}
                </span>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-[#C8941A] tracking-widest font-mono">Tahapan 0{activeLevelIdx + 1}</h4>
                  <span className="text-xs text-slate-400 font-semibold font-mono">Grade VII SKI</span>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center space-x-2 text-[#2E7D32] text-[11px] font-bold">
                  <Award className="w-4 h-4 text-[#C8941A]" />
                  <span>Lencana yang Diperoleh:</span>
                </div>
                <p className="text-xs text-slate-700 font-display font-semibold mt-1 bg-white border border-slate-100 px-2.5 py-1 rounded-xl text-center shadow-xs">
                  {(() => {
                    const foundBadge = ALL_BADGES.find(b => b.unlockedAtLevel === LEVEL_LIST[activeLevelIdx].id);
                    return foundBadge ? `${foundBadge.icon} ${foundBadge.name}` : '🏆 Lencana';
                  })()}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <Clock className="w-3.5 h-3.5 text-[#1B2F5E]" />
                <span>Estimasi: 30-45 Menit</span>
              </div>
            </div>

            {/* Level details right */}
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#1B2F5E]">
                  {LEVEL_LIST[activeLevelIdx].title}
                </h3>
                <p className="text-xs text-slate-500 font-medium font-mono text-[#2E7D32] mt-0.5">
                  {LEVEL_LIST[activeLevelIdx].subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {LEVEL_LIST[activeLevelIdx].description}
              </p>

              {/* Historical Thinking Pillar Highlight */}
              <div className="border border-[#C8941A]/20 bg-[#FAF7F0] p-3 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-[#C8941A] tracking-wider flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Fokus Berpikir Sejarah:</span>
                </p>
                <h5 className="font-display font-bold text-xs text-[#1B2F5E] mt-0.5">{LEVEL_LIST[activeLevelIdx].historicalThinkingFocus}</h5>
                <p className="text-[11px] text-slate-500 mt-0.5 italic leading-relaxed">{LEVEL_LIST[activeLevelIdx].historicalThinkingDesc}</p>
              </div>

              {/* Objectives List */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-slate-400 tracking-wider font-extrabold block">Tujuan Pembelajaran Khusus:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LEVEL_LIST[activeLevelIdx].objectives.map((obj, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                      <span className="text-[#2E7D32] mt-0.5 shrink-0">🟢</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation button inside the card for prompt login */}
              <div className="pt-2 text-right">
                <button 
                  onClick={() => scrollToId('onboarding')}
                  className="inline-flex items-center space-x-1.5 bg-[#2E7D32] hover:bg-emerald-800 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  <span>Mulai Uji Level {activeLevelIdx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Stepper simple arrows helper */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button 
              onClick={() => setActiveLevelIdx(prev => Math.max(0, prev - 1))}
              disabled={activeLevelIdx === 0}
              className="p-2 bg-white rounded-full border border-slate-200 text-[#1B2F5E] hover:text-[#2E7D32] disabled:opacity-30 transition-all shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500">LEVEL {activeLevelIdx + 1} DARI 10</span>
            <button 
              onClick={() => setActiveLevelIdx(prev => Math.min(LEVEL_LIST.length - 1, prev + 1))}
              disabled={activeLevelIdx === LEVEL_LIST.length - 1}
              className="p-2 bg-white rounded-full border border-slate-200 text-[#1B2F5E] hover:text-[#2E7D32] disabled:opacity-30 transition-all shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. HOW TO USE (Langkah Mudah Belajar) */}
      <section className="py-24 bg-white" id="panduan">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-bold text-[#C8941A] uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full inline-block">Panduan Belajar Cerdas</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B2F5E]">
              Langkah Mudah Belajar di HISTO-PATH
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-light">
              Ikuti rute taktis berikut untuk memaksimalkan kognisi sejarah dan penyerapan nilai keteladanan dengan mudah.
            </p>
            <div className="w-16 h-0.5 bg-[#C8941A] mx-auto my-3"></div>
          </div>

          <div className="relative">
            {/* Floating vertical progress line */}
            <div className="absolute top-8 bottom-8 left-4 sm:left-12 w-1 bg-gradient-to-b from-[#1B2F5E] via-[#2E7D32] to-[#C8941A] rounded-full z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex items-start space-x-6 sm:space-x-12 mb-12">
              <div className="w-9 h-9 rounded-xl bg-[#1B2F5E] border-2 border-[#C8941A] text-white flex items-center justify-center font-display font-extrabold text-xs shrink-0 shadow-md">
                1
              </div>
              <div className="bg-slate-50 hover:bg-slate-100/50 p-5 rounded-2xl border border-slate-200/40 shadow-xs flex-1 transition-all">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1B2F5E] block font-mono">Persiapan Akun Siswa</span>
                <h4 className="font-display font-bold text-sm text-[#1B2F5E] mt-0.5">Buat Profil Pendakwah Muda</h4>
                <p className="text-xs text-slate-600 mt-1 pb-1 leading-relaxed">
                  Isi formulir registrasi data diri di bagian bawah halaman ini. Masukkan nama lengkap, pilih kelas VII MTsN 2 Ponorogo Anda, dan sesuaikan karakter avatar pendakwah muda impianmu.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex items-start space-x-6 sm:space-x-12 mb-12">
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32] border-2 border-[#C8941A] text-white flex items-center justify-center font-display font-extrabold text-xs shrink-0 shadow-md">
                2
              </div>
              <div className="bg-slate-50 hover:bg-slate-100/50 p-5 rounded-2xl border border-slate-200/40 shadow-xs flex-1 transition-all">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#2E7D32] block font-mono">Navigasi Peta Rute</span>
                <h4 className="font-display font-bold text-sm text-[#2E7D32] mt-0.5">Mulai Menelusuri Peta Kronologis</h4>
                <p className="text-xs text-slate-600 mt-1 pb-1 leading-relaxed">
                  Buka Peta Pembelajaran. Mulailah dari Level 1 (Orientasi) untuk melihat visual peta konsep utama, kemudian navigasikan level demi level yang secara bertahap terkunci demi menjaga kronologi.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex items-start space-x-6 sm:space-x-12 mb-12">
              <div className="w-9 h-9 rounded-xl bg-[#C8941A] border-2 border-white text-white flex items-center justify-center font-display font-extrabold text-xs shrink-0 shadow-md">
                3
              </div>
              <div className="bg-slate-50 hover:bg-slate-100/50 p-5 rounded-2xl border border-slate-200/40 shadow-xs flex-1 transition-all">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#C8941A] block font-mono">Critical Quiz Assessment</span>
                <h4 className="font-display font-bold text-sm text-[#1B2F5E] mt-0.5">Jawab Kuis Sejarah & Selesaikan Tantangan</h4>
                <p className="text-xs text-slate-600 mt-1 pb-1 leading-relaxed">
                  Tuntaskan video pelajaran pendek, pelajari materi, lalu klik "Mulai Kuis". Jawab tantangan berpikir sejarah (HOTS) hingga melampaui nilai Kriteria Ketuntasan Minimal Anda.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex items-start space-x-6 sm:space-x-12">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C8941A] to-[#2E7D32] border-2 border-white text-white flex items-center justify-center font-display font-extrabold text-xs shrink-0 shadow-md animate-pulse">
                4
              </div>
              <div className="bg-slate-50 hover:bg-slate-100/50 p-5 rounded-2xl border border-slate-200/40 shadow-xs flex-1 transition-all">
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-600 block font-mono">Buku Harian Akhlak</span>
                <h4 className="font-display font-bold text-sm text-[#2E7D32] mt-0.5">Tuangkan Jurnal Refleksi & Dapatkan Lencana</h4>
                <p className="text-xs text-slate-600 mt-1 pb-1 leading-relaxed">
                  Terakhir, ketikkan komitmen aplikatif akhlak mulia Anda di kolom Refleksi Moral. Sukses menyelesaikan level akan menghadiahi Anda lencana sejarah yang terkumpul di beranda prestasi.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. TARGET USER SECTION */}
      <section className="py-24 bg-[#FFFDF7] border-y border-[#C8941A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="bg-white border-2 border-[#C8941A] shadow-xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden" 
            style={{ borderRadius: '48px 48px 24px 24px' }}
          >
            {/* Background pattern overlay within target card */}
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-[#1B2F5E] via-[#C8941A] to-[#2E7D32]"></div>
            <div className="absolute top-6 left-6 text-2xl opacity-10">🕌</div>
            <div className="absolute bottom-6 right-6 text-2xl opacity-10">📖</div>

            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-[#C8941A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>MADRASAH TSANAWIYAH NEGERI (MTsN)</span>
            </div>

            <h3 className="font-display font-display font-black text-[#1B2F5E] text-xl sm:text-2xl tracking-tight">
              Dirancang Khusus untuk Kelas VII <br />
              <span className="text-[#C8941A] uppercase tracking-wider">MTsN 2 Ponorogo</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
              Menghubungkan standar kurikulum Kementerian Agama RI Mata Pelajaran Sejarah Kebudayaan Islam (SKI) Makkah dengan tata nilai luhur pondok pesantren Ponorogo. Kami berkomitmen menyajikan konten edukasi sejarah yang valid, religius, sekaligus mengasyikkan bagi dinamika belajar siswa kelas VII.
            </p>

            {/* Ponorogo Values tags list */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <span className="text-[10px] font-bold font-mono text-[#1B2F5E] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                🌟 Prestasi Tinggi
              </span>
              <span className="text-[10px] font-bold font-mono text-[#2E7D32] bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                💚 Berakhlakul Karimah
              </span>
              <span className="text-[10px] font-bold font-mono text-[#C8941A] bg-amber-50/70 border border-amber-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                🕌 Teguh Keyakinan
              </span>
            </div>

            {/* Quick guideline helper */}
            <div className="border-t border-slate-100 pt-6 text-left max-w-lg mx-auto">
              <h5 className="text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-2">Petunjuk Belajar Siswa MTs:</h5>
              <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4">
                <li>Selesaikan setiap tahapan secara berurutan agar alur logika sejarahnya utuh.</li>
                <li>Siapkan buku catatan SKI Anda untuk kata kunci asbabun nuzul yang berharga.</li>
                <li>Setiap lencana diakumulasikan secara offline pada browser pc/tablet Anda.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CTA SECTION & ONBOARDING / REGISTRATION FORM */}
      <section className="py-24 bg-[#1B2F5E] text-white bg-islamic-pattern relative" id="onboarding">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C3264]/90 via-[#1B2F5E]/95 to-[#122144] pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          
          <span className="text-xs font-bold text-[#C8941A] block uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/10 mb-4 animate-pulse">
            🔑 AKSES PORTAL ACADEMY SISWA
          </span>
          <h2 className="text-3xl font-display font-extrabold text-white">
            Siap Menjadi Ilmuwan Sejarah Islam Muda?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light">
            Isi atau sesuaikan profil akademis Kelas VII MTs Anda di bawah ini untuk mensimulasikan kemajuan belajar, mencatatkan nilai kuis, serta mewariskan keteladanan moral mulia.
          </p>
          <div className="w-16 h-0.5 bg-[#C8941A] mx-auto my-6"></div>

          {/* Registration form block */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#C8941A]/20 max-w-2xl mx-auto mt-10 text-left">
            
            <div className="border-b border-slate-100 pb-5 mb-6">
              <h4 className="font-display font-bold text-[#1B2F5E] text-sm uppercase tracking-wide tracking-wider flex items-center space-x-2">
                <User className="w-5 h-5 text-[#2E7D32]" />
                <span>Kartu Profil Pembelajar SKI</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Data profil akan dienkripsi dan disimpan lokal di browser tablet / komputer belajar Anda.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Name field */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono mb-1.5">
                  Nama Lengkap Siswa:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim() && selectedAvatar === 'MJ') {
                        // Keep a nice hook
                      }
                    }}
                    placeholder="Masukkan nama lengkap Anda... (Contoh: Ahmad Mujahid)"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#C8941A] focus:ring-1 focus:ring-[#C8941A] transition-all text-slate-800 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Class & Madrasah row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono mb-1.5">
                    Kelas VII MTs:
                  </label>
                  <select 
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#C8941A] text-slate-800 font-medium"
                  >
                    <option value="VII-A">Kelas VII-A (MTsN 2)</option>
                    <option value="VII-B">Kelas VII-B (MTsN 2)</option>
                    <option value="VII-C">Kelas VII-C (MTsN 2)</option>
                    <option value="VII-D">Kelas VII-D (MTsN 2)</option>
                    <option value="VII-E">Kelas VII-E</option>
                    <option value="VII-F">Kelas VII-F</option>
                    <option value="VII-Unggulan">Kelas VII-Unggulan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono mb-1.5">
                    Nama Sekolah/Madrasah:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <School className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Contoh: MTsN 2 Ponorogo"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#C8941A] text-slate-800 font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Character Avatar selector */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono mb-2">
                  Pilih Karakter Avatar Belajar:
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {avatarOptions.map((opt) => (
                    <button
                      key={opt.seed}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(opt.seed);
                        setAvatarColor(opt.color);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedAvatar === opt.seed 
                          ? 'border-[#2E7D32] bg-emerald-50/70 ring-2 ring-[#2E7D32]/20' 
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-display font-black text-xs text-white uppercase shadow-sm ${
                        opt.color === 'emerald' ? 'bg-emerald-600' :
                        opt.color === 'blue' ? 'bg-blue-600' :
                        opt.color === 'gold' ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}>
                        {opt.seed}
                      </div>
                      <span className="block font-display font-bold text-[11px] text-slate-700 mt-2">{opt.label}</span>
                      <span className="block text-[9px] text-slate-400 font-medium">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bullet benefits before starting */}
              <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-600">🛡️</span>
                  <p className="text-[11px] text-slate-500 font-medium">Buku moral harian, pre-test & lencana siap diklaim.</p>
                </div>
                <span className="text-[10px] text-[#2E7D32] font-extrabold tracking-wider uppercase bg-[#2E7D32]/10 px-2.5 py-0.5 rounded-full inline-block">Sistem Terintegrasi</span>
              </div>

              {/* Submit CTA button */}
              <button 
                type="submit"
                className="w-full bg-[#2E7D32] hover:bg-emerald-800 text-white font-display font-bold py-4 px-6 rounded-2xl text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border-b-4 border-[#C8941A] flex items-center justify-center space-x-2"
              >
                <span>Mulai Petualangan Sejarah Islam</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0A1224] text-white py-16 border-t border-[#C8941A]/20" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Left Column: HISTO-PATH compass logo, copyright */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#C8941A] rounded-xl text-white">
                  <Compass className="w-5 h-5 text-white animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-[#C8941A] tracking-wider text-base leading-none">HISTO-PATH</h4>
                  <p className="text-[9px] text-[#2E7D32] font-bold tracking-widest uppercase mt-0.5">E-Learning MTsN 2 Ponorogo</p>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-light leading-relaxed max-w-sm space-y-3">
                <p>
                  Aplikasi prototype pendidikan digital berbasis <strong>Historical Thinking Path (Keterampilan Berpikir Sejarah)</strong> untuk tingkat Madrasah Tsanawiyah (MTs) pada materi Perjuangan Dakwah Nabi Muhammad SAW di Makkah.
                </p>
                <div className="border-[#C8941A]/20 border p-3.5 rounded-xl bg-slate-900/50 space-y-1">
                  <p className="text-[10px] text-[#C8941A] font-bold uppercase tracking-wider">Identitas Akademis R&D:</p>
                  <p className="text-[11px] text-slate-200 font-medium leading-tight">Dikembangkan melalui Penelitian dan Pengembangan (R&D)</p>
                  <p className="text-[11px] text-slate-300 font-light">Program Studi Pendidikan Agama Islam</p>
                  <p className="text-[11px] text-[#C8941A] font-semibold">Universitas Darussalam Gontor</p>
                  <p className="text-[11px] text-slate-300 font-light">MTsN 2 Ponorogo</p>
                </div>
              </div>

              <div className="text-slate-500 text-[11px] leading-relaxed pt-1 space-y-1">
                <p>© 1447 H / 2026 HISTO-PATH LMS. All Rights Reserved.</p>
                <p>Dikembangkan khusus untuk kebutuhan pengajaran interaktif SKI Kelas VII MTsN 2 Ponorogo, Jawa Timur, Indonesia.</p>
              </div>
            </div>

            {/* Middle Column: Navigation links */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase text-[#C8941A]">Navigasi Utama</h5>
              <div className="flex flex-col space-y-2 text-xs text-slate-300">
                <button onClick={() => scrollToId('beranda')} className="text-left hover:text-[#C8941A] transition-colors">Beranda Utama</button>
                <button onClick={() => scrollToId('tentang')} className="text-left hover:text-[#C8941A] transition-colors">Tentang Platform</button>
                <button onClick={() => scrollToId('pilar')} className="text-left hover:text-[#C8941A] transition-colors">4 Pilar Kemampuan</button>
                <button onClick={() => scrollToId('fitur')} className="text-left hover:text-[#C8941A] transition-colors">Fitur Pembelajaran</button>
                <button onClick={() => scrollToId('rute')} className="text-left hover:text-[#C8941A] transition-colors">10 Rute Dakwah Makkah</button>
                <button onClick={() => scrollToId('panduan')} className="text-left hover:text-[#C8941A] transition-colors">Panduan Belajar Siswa</button>
              </div>
            </div>

            {/* Right Column: Feedback input form */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase text-[#C8941A]">Kirim Saran / Masukan Guru</h5>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Punya saran perbaikan materi asbabun nuzul atau penyesuaian kuis? Silakan ketik masukan berhargamu di bawah ini:
              </p>

              <form onSubmit={handleSendFeedback} className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda..."
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#C8941A] text-slate-200"
                />
                
                <div className="flex space-x-1.5">
                  <input
                    type="text"
                    required
                    maxLength={300}
                    placeholder="Tulis kritik/saran..."
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#C8941A] text-slate-200"
                  />
                  <button
                    type="submit"
                    className="bg-[#2E7D32] hover:bg-emerald-700 p-2 rounded-lg text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {feedbackSuccess && (
                <div className="text-[10px] text-[#2E7D32] bg-emerald-900/20 border border-emerald-900/40 p-2 rounded-md animate-fade-in">
                  ✓ Terima kasih! Masukan Anda telah disimulasikan ke database akademis lokal.
                </div>
              )}
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};
