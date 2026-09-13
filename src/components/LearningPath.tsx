import React, { useState } from 'react';
import { Compass, Book, Lock, ArrowRight, Check, Award, Eye, Calendar } from 'lucide-react';
import { LevelData, LevelId, UserProgress } from '../types';
import { LEVEL_LIST } from '../data';

interface LearningPathProps {
  progress: UserProgress;
  onNavigate: (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({ progress, onNavigate }) => {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | null>(progress.unlockedLevel);

  const selectedLevel = LEVEL_LIST.find(l => l.id === selectedLevelId) || LEVEL_LIST[0];

  const getStatus = (levelId: LevelId) => {
    if (progress.completedLevels.includes(levelId)) return 'completed';
    if (progress.unlockedLevel === levelId) return 'active';
    if (levelId < progress.unlockedLevel) return 'completed'; // Safe fallback
    return 'locked';
  };

  // Makkah period chronological milestones
  const HISTORICAL_TIMELINE = [
    { year: "571 M", title: "Kelahiran Sang Nabi", desc: "Tahun Gajah, runtuhnya tentara gajah Abrahah." },
    { year: "610 M", title: "Wahyu Pertama", desc: "Turunnya QS. Al-Alaq 1-5 di Gua Hira saat Nabi berusia 40 tahun." },
    { year: "613 M", title: "Dakwah Terbuka", desc: "Seruan lantang di puncak Bukit Shafa memulai konfrontasi kultural." },
    { year: "615 M", title: "Hijrah ke Habasyah", desc: "Sahabat mengungsi pertama kali ke Ethiopia menghindari siksaan Quraisy." },
    { year: "616 M", title: "Pemboikotan Sosial", desc: "Isolasi ekonomi 3 tahun penuh terhadap klan Bani Hasyim." },
    { year: "619 M", title: "Amul Huzni & Isra Mi'raj", desc: "Tahun duka cita atas wafatnya Khadijah & Abu Thalib, dihibur perjalanan Mi'raj." },
    { year: "621 M", title: "Bai'at Aqabah I", desc: "Perjanjian sumpah setia awal penduduk Yatsrib kepada Nabi." },
    { year: "622 M", title: "Hijrah Agung", desc: "Kemigrasian puncak kaum muslimin ke Yatsrib (Madinah)." }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6" id="path-scrollable">
      
      {/* Upper header statistics */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
            <Compass size={14} />
            <span>PETA LEVEL KETERAMPILAN SEJARAH</span>
          </div>
          <h2 className="text-2xl font-serif text-brand-blue font-bold mt-1">
            Historical Thinking Path
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Selesaikan modul kognitif, tonton video visual, dan submit lembar refleksi moral Anda untuk membuka kunci (unlock) jenjang berikutnya secara tertib.
          </p>
        </div>

        {/* Unified progress bar */}
        <div className="w-full md:w-64 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/60 shrink-0">
          <div className="flex justify-between text-[11px] font-bold text-slate-700">
            <span>Status Kurikulum</span>
            <span className="text-brand-green">{progress.completedLevels.length} / 10 Selesai</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-green transition-all duration-500" 
              style={{ width: `${(progress.completedLevels.length / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Path visual maps on the left (7 cols) + Level description drawer on the right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Part: Connected 10-Level Map View */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3 mb-6 flex justify-between items-center">
            <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Lintasan Jurnal Belajar (10 Level)
            </h3>
            <span className="text-[10px] text-slate-400 font-medium italic">Klik salah satu level untuk meninjau pratinjau</span>
          </div>

          {/* Interactive Node Path representation */}
          <div className="relative flex flex-col items-center py-6 min-h-[480px]">
            {/* The Connecting Path Bar background */}
            <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1.5 bg-gray-100/90 z-0">
              <div 
                className="w-full bg-brand-green transition-all duration-500"
                style={{ 
                  height: `${Math.min(95, (Math.max(0, progress.unlockedLevel - 1) / 9) * 100)}%`,
                  top: 0 
                }}
              ></div>
            </div>

            {/* List of 10 circular checkpoints */}
            <div className="w-full relative z-15 flex flex-col items-center space-y-6">
              {LEVEL_LIST.map((lvl) => {
                const status = getStatus(lvl.id);
                const isSelected = selectedLevelId === lvl.id;
                
                let bubbleStyle = "";
                let badgeMarker = null;

                if (status === 'completed') {
                  bubbleStyle = "bg-brand-green text-white ring-4 ring-emerald-100 hover:ring-brand-green/30 cursor-pointer";
                  badgeMarker = <span className="absolute top-0 right-0 bg-brand-gold text-brand-blue font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center border border-white">✓</span>;
                } else if (status === 'active') {
                  bubbleStyle = "bg-brand-green text-white ring-8 ring-emerald-100 outline-2 outline-offset-2 outline-brand-green hover:ring-brand-green/45 cursor-pointer";
                  badgeMarker = <span className="absolute -top-1 bg-brand-gold text-brand-blue text-[7px] font-bold py-0.5 px-1.5 rounded-full border border-white shadow-xs tracking-wider uppercase">Active</span>;
                } else {
                  bubbleStyle = "bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-slate-50 cursor-pointer";
                }

                if (isSelected) {
                  bubbleStyle += " scale-110 shadow-md transition-transform border-brand-gold";
                }

                return (
                  <div key={lvl.id} className="relative w-full max-w-sm flex items-center justify-between px-4">
                    {/* Level title marker on left side if level is odd */}
                    <div className="w-5/12 text-right pr-4 text-[11px] font-bold text-slate-700 truncate select-none">
                      {lvl.id % 2 !== 0 && (
                        <span className={`${isSelected ? 'text-brand-green underline' : ''}`}>
                          {lvl.title}
                        </span>
                      )}
                    </div>

                    {/* Circular Bubble node */}
                    <button
                      onClick={() => setSelectedLevelId(lvl.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xs relative ${bubbleStyle} font-semibold transition-all duration-200`}
                    >
                      {status === 'locked' ? (
                        <Lock size={12} className="opacity-90" />
                      ) : (
                        <span className="text-sm font-bold">{lvl.id < 10 ? `0${lvl.id}` : lvl.id}</span>
                      )}
                      
                      {badgeMarker}
                    </button>

                    {/* Level title marker on right side if level is even */}
                    <div className="w-5/12 text-left pl-4 text-[11px] font-bold text-slate-700 truncate select-none">
                      {lvl.id % 2 === 0 && (
                        <span className={`${isSelected ? 'text-brand-green underline' : ''}`}>
                          {lvl.title}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Part: Dynamic selected level descriptions drawer & launcher card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
            <span className="text-[10px] bg-brand-gold/10 text-brand-gold font-bold tracking-widest uppercase py-1 px-2.5 rounded-lg border border-brand-gold/20 inline-block">
              INFO LEVEL {selectedLevel.id} PREVIEW
            </span>

            <div className="space-y-1 pb-3 border-b border-slate-100">
              <h3 className="text-xl font-serif text-brand-blue font-bold flex items-center">
                <span className="mr-2 text-2xl">{selectedLevel.emoji}</span>
                {selectedLevel.title}
              </h3>
              <p className="text-xs text-slate-500 font-light lowercase italic">{selectedLevel.subtitle}</p>
            </div>

            {/* Path description */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
              <p className="font-extrabold text-brand-green uppercase tracking-wider text-[10px]">
                Keterampilan Berpikir Sejarah:
              </p>
              <p className="font-bold text-slate-800 text-xs">
                {selectedLevel.historicalThinkingFocus}
              </p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {selectedLevel.historicalThinkingDesc}
              </p>
            </div>

            {/* Learning Objectives box */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Target Hasil Pembelajaran (Objectives):
              </p>
              <div className="space-y-1.5">
                {selectedLevel.objectives.map((obj, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-slate-600">
                    <span className="text-[#C5A059] shrink-0 font-bold">✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            {getStatus(selectedLevel.id) === 'locked' ? (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center space-x-2 text-xs">
                <Lock size={14} className="shrink-0" />
                <p>Status terkunci. Selesaikan level-level sebelumnya terlebih dahulu untuk masuk ke jenjang ini.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('level', selectedLevel.id)}
                  className="w-full bg-brand-green hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 border-l-4 border-brand-gold"
                >
                  <span>Mulai Belajar Level {selectedLevel.id}</span>
                  <ArrowRight size={14} />
                </button>
                <p className="text-[9.5px] text-slate-400 text-center font-light">
                  Kemajuan studi, jawaban kuis, dan data lencana akan disimpan di terminal profil Anda secara aman.
                </p>
              </div>
            )}
          </div>

          {/* Timeline Visual - historical dates summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center">
              <Calendar size={14} className="mr-2 text-brand-gold" />
              Garis Rentang Waktu (13 Tahun Makkah)
            </h3>
            <p className="text-[11px] text-slate-400 font-light block">
              Sekilas ikhtisar kronologi peradaban Islam masa perjuangan kerasulan di Makkah dari tahun gajah sampai masa hijrah:
            </p>

            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              {HISTORICAL_TIMELINE.map((evt, idx) => (
                <div key={idx} className="flex space-x-3 items-start text-xs border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                  <span className="font-mono bg-brand-blue/5 text-brand-blue font-bold px-2 py-0.5 rounded text-[10px] shrink-0">
                    {evt.year}
                  </span>
                  <div>
                    <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">{evt.title}</h5>
                    <p className="text-slate-500 text-[10px] leading-relaxed mt-0.5">{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
