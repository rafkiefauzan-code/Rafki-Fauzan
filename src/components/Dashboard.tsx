import React, { useState } from 'react';
import { Award, Compass, BookOpen, Clock, Heart, ArrowRight, Star, PencilLine, CheckCircle2 } from 'lucide-react';
import { StudentProfile, UserProgress, LevelId, Badge } from '../types';
import { LEVEL_LIST, ALL_BADGES } from '../data';

interface DashboardProps {
  profile: StudentProfile;
  progress: UserProgress;
  onNavigate: (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, progress, onNavigate }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Compute stats
  const completedCount = progress.completedLevels.length;
  const completionRate = Math.round((completedCount / 10) * 100);
  
  const scoreKeys = Object.keys(progress.quizScores);
  const avgScore = scoreKeys.length > 0 
    ? Math.round(scoreKeys.reduce((acc, key) => acc + progress.quizScores[parseInt(key)], 0) / scoreKeys.length)
    : 0;

  const currentLevelInfo = LEVEL_LIST.find(l => l.id === progress.unlockedLevel) || LEVEL_LIST[0];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6" id="dashboard-scrollable">
      
      {/* Top Welcome Title Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-brand-green font-bold text-xs uppercase tracking-widest">
            <span>📚</span>
            <span>PEMBELAJARAN SKI KELAS VII MTs</span>
          </div>
          <h1 className="text-2xl font-serif text-brand-blue font-bold mt-1">
            Assalamu'alaikum, <span className="text-brand-green italic">{profile.name}</span>!
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Mari asah ketajaman berpikir sejarah melalui peristiwa dakwah Rasulullah SAW di Makkah. Setiap level akan menuntut Anda menggali konteks, kronologi, serta meneladani akhlak perjuangan.
          </p>
        </div>
        
        {/* Dynamic Class ID */}
        <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl px-4 py-2 text-right shrink-0">
          <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Identitas Belajar</p>
          <p className="text-xs font-bold text-brand-blue">{profile.classroom}</p>
          <p className="text-[10px] text-slate-500">{profile.school}</p>
        </div>
      </div>

      {/* Highlights / Bento Grid Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Compass size={22} />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Progres Jalur</span>
            <span className="text-lg font-bold text-slate-800">{completionRate}% Selesai</span>
            <span className="text-[9.5px] text-slate-400 block">{completedCount} dari 10 Jenjang</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
            <Star size={22} />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Nilai Rata Kuis</span>
            <span className="text-lg font-bold text-slate-800">{avgScore}% Poin</span>
            <span className="text-[9.5px] text-slate-400 block">Dari {scoreKeys.length} Kuis Selesai</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
            <div className="text-lg">🔥</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Aktif Belajar</span>
            <span className="text-lg font-bold text-slate-800">{progress.currentStreak} Hari</span>
            <span className="text-[9.5px] text-slate-400 block">Pertahankan konsistensi!</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
            <Award size={22} />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Lencana Koleksi</span>
            <span className="text-lg font-bold text-slate-800">{progress.unlockedBadges.length} Terbuka</span>
            <span className="text-[9.5px] text-slate-400 block">Dari total 10 lencana</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Grid: Active Level Continue & Reflection Journeys */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Level Card */}
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            {/* Visual background badge accent */}
            <div className="absolute top-4 right-4 text-7xl opacity-10 font-bold text-brand-green select-none">
              Lvl {currentLevelInfo.id}
            </div>

            <div>
              <div className="flex items-center space-x-2 text-brand-green font-bold text-xs uppercase tracking-widest">
                <span className="animate-pulse">●</span>
                <span>JENJANG AKTIF SEKARANG • LEVEL {currentLevelInfo.id}</span>
              </div>
              <h3 className="text-2xl font-serif text-brand-blue font-extrabold mt-1">
                {currentLevelInfo.title}
              </h3>
              <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mt-0.5">
                Path: {currentLevelInfo.historicalThinkingFocus}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mt-2.5 max-w-md">
                {currentLevelInfo.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-brand-green/10 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Nilai Keterampilan: <strong className="text-brand-green">{currentLevelInfo.historicalThinkingFocus}</strong>
              </div>
              
              <button
                onClick={() => onNavigate('level', currentLevelInfo.id)}
                className="bg-brand-blue hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl text-[11px] uppercase tracking-wider hover:shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>Masuk Pembelajaran</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Reflections List block & Personal Journal */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider flex items-center">
              <PencilLine size={16} className="mr-2 text-brand-gold" />
              Catatan Jurnal Refleksi Siswa ({Object.keys(progress.reflections).length})
            </h3>
            
            <p className="text-xs text-slate-400 font-light">
              Refleksi etis yang Anda ketikkan dari setiap kriteria level yang diselesaikan terekam otomatis di bawah ini sebagai portofolio adab belajar Anda.
            </p>

            {Object.keys(progress.reflections).length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-slate-400 text-xs">
                <p>Belum ada catatan refleksi yang disubmit.</p>
                <button 
                  onClick={() => onNavigate('level', LevelId.LEVEL_1)}
                  className="text-brand-green underline font-bold mt-1 hover:text-emerald-700 block mx-auto"
                >
                  Mulai Level 1 & Isi Refleksi Pertama
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
                {Object.entries(progress.reflections).map(([levelNum, text]) => {
                  const level = LEVEL_LIST.find(l => l.id === parseInt(levelNum));
                  return (
                    <div key={levelNum} className="border-l-4 border-brand-gold bg-slate-50/70 p-3.5 rounded-r-xl space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-brand-blue">
                          Lvl {levelNum}: {level?.title || `Level ${levelNum}`}
                        </span>
                        <div className="flex items-center space-x-1 font-mono text-[9px] text-slate-400">
                          <CheckCircle2 size={10} className="text-brand-green" />
                          <span>Submitted</span>
                        </div>
                      </div>
                      <p className="text-xs italic text-slate-600 line-clamp-3">
                        "{text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Grid: Beautiful 10 Badge Collectors Matrix Grid */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider flex items-center">
                <Award size={16} className="mr-2 text-brand-gold" />
                Daftar 10 Lencana Sejarah
              </h3>
              <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full font-bold">
                {progress.unlockedBadges.length}/10
              </span>
            </div>
            
            <p className="text-xs text-slate-400 font-light mb-4">
              Selesaikan kuis kognitif dan evaluasi moral di setiap jenjang untuk membuka kunci lencana keahlian Anda. Klik lencana untuk melihat detail instruksi.
            </p>

            {/* Badges Matrix */}
            <div className="grid grid-cols-5 gap-3.5" id="badges-matrix">
              {ALL_BADGES.map((badge) => {
                const isUnlocked = progress.unlockedBadges.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge)}
                    className={`aspect-square flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 relative ${
                      isUnlocked 
                        ? `bg-slate-100 border-2 border-brand-gold shadow-xs hover:scale-105 cursor-pointer` 
                        : 'bg-slate-50 border border-gray-200 opacity-40 hover:opacity-60 cursor-pointer'
                    }`}
                    title={badge.name}
                  >
                    <span className="text-3xl filter drop-shadow-sm select-none">{badge.icon}</span>
                    <span className="text-[8px] font-bold text-center mt-1 truncate w-full text-slate-700">
                      Lvl {badge.unlockedAtLevel}
                    </span>
                    
                    {/* Tiny padlock indicator if locked */}
                    {!isUnlocked && (
                      <span className="absolute top-1 right-1 text-[8px] opacity-70">🔒</span>
                    )}

                    {isUnlocked && (
                      <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-blue rounded-full p-0.5 border border-white text-[8px] font-extrabold w-4 h-4 flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Badge Detailed overlay card */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-gray-200/60 relative overflow-hidden">
              {selectedBadge ? (
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-4xl">{selectedBadge.icon}</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-brand-blue uppercase">{selectedBadge.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Jenjang: Level {selectedBadge.unlockedAtLevel}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{selectedBadge.description}"</p>
                  
                  <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-brand-green">
                    <span>
                      {progress.unlockedBadges.includes(selectedBadge.id) 
                        ? "🟢 Keterampilan Terverifikasi" 
                        : "🔴 Belum Diperoleh - Selesaikan Level ini"}
                    </span>
                    <button
                      onClick={() => onNavigate('level', selectedBadge.unlockedAtLevel)}
                      className="text-brand-blue underline hover:text-brand-gold text-[10px]"
                    >
                      Buka Level {selectedBadge.unlockedAtLevel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-400 font-light italic">
                  Klik ikon lencana di atas untuk menelaah makna sejarah dan cara memilikinya.
                </div>
              )}
            </div>
            
          </div>

          {/* Quick Syllabus Box */}
          <div className="bg-brand-blue text-white rounded-2xl p-5 shadow-sm space-y-3.5 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 text-9xl opacity-5 font-serif select-none">
              📖
            </div>
            <h4 className="text-xs font-bold text-brand-gold uppercase tracking-widest">Sekilas Silabus & Target</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <BookOpen size={12} className="text-brand-gold shrink-0" />
                <span className="font-light text-slate-200">Materi Pokok: Perjuangan Nabi Muhammad SAW di Makkah</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Clock size={12} className="text-brand-gold shrink-0" />
                <span className="font-light text-slate-200">Durasi Silabus: 12 Pertemuan Akademik</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Heart size={12} className="text-brand-gold shrink-0" />
                <span className="font-light text-slate-200">Dimensi Profil Pelajar Pancasila & Rahmatan lil Alamin</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('path')}
              className="mt-2 w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold py-2 rounded-xl text-xs uppercase tracking-wide transition-all"
            >
              Lihat 10 Urutan Timeline Peta
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
