import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, ChevronRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { LevelData, LevelId, UserProgress, Question, Badge } from '../types';
import { LEVEL_LIST, QUIZ_QUESTIONS, ALL_BADGES } from '../data';

interface LevelDetailProps {
  levelId: LevelId;
  progress: UserProgress;
  onNavigate: (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => void;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
}

export const LevelDetail: React.FC<LevelDetailProps> = ({
  levelId,
  progress,
  onNavigate,
  onUpdateProgress,
}) => {
  // Find current level structural data
  const levelData = LEVEL_LIST.find(l => l.id === levelId) || LEVEL_LIST[0];
  const questions = QUIZ_QUESTIONS[levelId] || [];

  // Local state managers
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 100
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({}); // questionId -> answerIndex
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState(progress.reflections[levelId] || '');
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);

  // Guidance and validation states
  const [missingSteps, setMissingSteps] = useState<string[] | null>(null);
  const [shakeChecklist, setShakeChecklist] = useState(false);

  // Sync state if level changes
  useEffect(() => {
    setIsPlaying(false);
    const hasCompleted = progress.completedLevels.includes(levelId);
    setVideoProgress(hasCompleted ? 100 : 0);
    setSelectedAnswers({});
    const savedScore = progress.quizScores[levelId];
    if (savedScore !== undefined) {
      setQuizSubmitted(true);
      setQuizScore(savedScore);
    } else {
      setQuizSubmitted(hasCompleted);
      setQuizScore(null);
    }
    setReflectionText(progress.reflections[levelId] || '');
    setShowCelebration(false);
    setEarnedBadge(null);
    setMissingSteps(null);
    setShakeChecklist(false);

    // Auto-scroll scrollable container of level detail to top when changing level
    const container = document.getElementById('level-detail-scrollable');
    if (container) {
      container.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [levelId]);

  // Video interval simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && videoProgress < 100) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 5;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoProgress]);

  // Handle option select
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    if (questions.length === 0) return;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalPercent = Math.round((correctCount / questions.length) * 100);
    setQuizScore(finalPercent);
    setQuizSubmitted(true);

    // Save score inside progress
    const updatedScores = {
      ...progress.quizScores,
      [levelId]: finalPercent
    };
    onUpdateProgress({ quizScores: updatedScores });
  };

  // Submit Reflection Journal
  const handleSubmitReflection = () => {
    const errors: string[] = [];
    if (videoProgress < 100) {
      errors.push("Video Pembelajaran belum selesai ditonton. Silakan ketuk tombol 'Tandai Selesai Menonton' pada panel video di bawah.");
    }
    if (questions.length > 0 && !quizSubmitted) {
      errors.push("Kuis pemahaman kognitif belum dikirim. Jawab semua soal kuis lalu ketuk tombol 'Kirim Jawaban Kuis'.");
    }
    if (reflectionText.trim().length < 10) {
      errors.push("Jurnal refleksi moral terlalu singkat (minimal 10 karakter). Harap tuliskan keteladanan luhur yang Anda cerna.");
    }

    if (errors.length > 0) {
      setMissingSteps(errors);
      setShakeChecklist(true);
      setTimeout(() => setShakeChecklist(false), 500);

      // Scroll to guidance checkboard smoothly
      const checklistEl = document.getElementById('bimbingan-checklist-card');
      if (checklistEl) {
        checklistEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setMissingSteps(null);

    // 1. Persist reflection text
    const updatedReflections = {
      ...progress.reflections,
      [levelId]: reflectionText.trim()
    };

    // 2. Identify and unlock level logic
    const nextLevelId = levelId + 1;
    const completedLevelsSet = new Set(progress.completedLevels);
    completedLevelsSet.add(levelId);

    let unlockedLevel = progress.unlockedLevel;
    if (levelId === progress.unlockedLevel && nextLevelId <= 10) {
      unlockedLevel = nextLevelId as LevelId;
    }

    // 3. Unlock badge associated with this level
    let unlockedBadgesList = [...progress.unlockedBadges];
    const targetBadge = ALL_BADGES.find(b => b.unlockedAtLevel === levelId);
    
    if (targetBadge && !unlockedBadgesList.includes(targetBadge.id)) {
      unlockedBadgesList.push(targetBadge.id);
      setEarnedBadge(targetBadge);
      setShowCelebration(true); // Triggers reward lightbox
    } else {
      // Show generic confirmation celebration for sub levels if badge already exists
      setShowCelebration(true);
    }

    onUpdateProgress({
      reflections: updatedReflections,
      completedLevels: Array.from(completedLevelsSet),
      unlockedLevel,
      unlockedBadges: unlockedBadgesList
    });
  };

  // Infographic database
  const getInfographicData = (lvlId: LevelId) => {
    switch (lvlId) {
      case LevelId.LEVEL_3:
        return [
          { emoji: "🕊️", title: "Kehancuran Abrahah", desc: "Penyerangan tentara gajah Raja Abrahah dihancurkan berkeping-keping oleh burung Ababil pelindung Ka'bah mulia (QS. Al-Fil)." },
          { emoji: "👶", title: "Kelahiran Agung", desc: "Lahirnya Nabi Muhammad SAW pada 12 Nabiul Awal membawa rahmat bagi semesta alam di tengah tahun penuh kegejolakan." },
          { emoji: "🧬", title: "Nasab Mulia", desc: "Silsilah keturunan terhormat dari klan Bani Hasyim, keluarga luhur penjaga kesucian sumur zam-zam." }
        ];
      case LevelId.LEVEL_4:
        return [
          { emoji: "🐫", title: "Asuhan Gurun", desc: "Disusui oleh Halimah as-Sa'diyah di padang pasir untuk membentuk lisaniyah Arab murni dan fisik yang tangguh." },
          { emoji: "⚖️", title: "Mata Air Keunggulan", desc: "Keadilan nabi menengahi perseteruan peletakan kembali batu Hajar Aswad secara adil menggunakan sorban." },
          { emoji: "💎", title: "Gelar Al-Amin", desc: "Kejujuran mutlak dan reputasi terpercaya dalam berdagang ke pasar Syam mengukuhkan karakter mulianya." }
        ];
      case LevelId.LEVEL_5:
        return [
          { emoji: "⛰️", title: "Gua Hira", desc: "Tempat tenang berkontemplasi untuk menjauhi kebobrokan moral kemunduran akidah Makkah pra-Islam." },
          { emoji: "📖", title: "QS. Al-Alaq 1-5", desc: "Turunnya wahyu pertama lewat perantara Jibril berupa perintah Iqra' (membaca) sebagai dasar pencerahan." },
          { emoji: "💍", title: "Pendampingan Khadijah", desc: "Kehangatan, dekapan, serta seliimut keteguhan yang diberikan Sayyidah Khadijah RA menenangkan psikologis nabi." }
        ];
      case LevelId.LEVEL_6:
        return [
          { emoji: "🔐", title: "Secara Sembunyi", desc: "Dakwah terbatas dilakukan secara sembunyi-sembunyi demi melatih keteguhan akidah angkatan kader pertama." },
          { emoji: "🏫", title: "Darul Arqam", desc: "Rumah Arqam bin Abi Arqam menjadi sekolah rahasia rintisan dakwah yang super kokoh dan terencana." },
          { emoji: "👥", title: "Kader Pelopor", desc: "Assabiqunal Awwalun yang memegang teguh iman: Khadijah, Abu Bakar, Ali bin Abi Thalib, dan Zaid bin Haritsah." }
        ];
      case LevelId.LEVEL_7:
        return [
          { emoji: "📣", title: "Seruan Bukit Shafa", desc: "Langkah dakwah terbuka perdana nabi menyampaikan keesaan Allah di ketinggian Shafa mengikuti adat darurat Arab." },
          { emoji: "⚡", title: "Kemurkaan Abu Lahab", desc: "Egoisme paman nabi yang menentang keras seruan dakwah demi melestarikan status quo keuntungan ekonomi berhala." },
          { emoji: "🛡️", title: "Ekskalasi Boikot", desc: "Oligarki Quraisy mulai mengonsolidasikan permusuhan sosial untuk meredam laju pengaruh dakwah nabi." }
        ];
      case LevelId.LEVEL_8:
        return [
          { emoji: "⚔️", title: "Penyiksaan Budak", desc: "Penyiksaan luar biasa didaratkan kepada Bilal bin Rabah, Yasir, Sumayyah, namun iman mereka tidak pernah bergeser sedikit pun." },
          { emoji: "⛵", title: "Hijrah Habasyah", desc: "Sahabat teraniaya diinstruksikan mengungsi ke Ethiopia demi suaka perlindungan dari Raja Najasyi yang sangat adil." },
          { emoji: "🌾", title: "Isolasi Tiga Tahun", desc: "Pemboikotan total klan Bani Hasyim di Syi'ib Abu Thalib hingga terpaksa merebus daun kering untuk bertahan hidup." }
        ];
      case LevelId.LEVEL_9:
        return [
          { emoji: "🕊️", title: "Amul Huzni", desc: "Wafatnya paman pelindung Abu Thalib & istri mulia Khadijah RA melahirkan tahun duka cita menguras emosi batin nabi." },
          { emoji: "🏜️", title: "Duka Kota Thaif", desc: "Pelemparan batu sadis saat nabi mencoba mencari suaka dakwah baru, dibalas ketulusan doa pengampunan dari nabi." },
          { emoji: "🌌", title: "Isra' Mi'raj", desc: "Penghiburan mulia perjalanan spiritual satu malam menjemput pensyariatan agung shalat fardhu 5 waktu." }
        ];
      case LevelId.LEVEL_10:
      default:
        return [
          { emoji: "🤝", title: "Pakta Aqabah", desc: "Ikrar perjanjian kesetiaan penduduk Yathrib (Madinah) membentangkan peta politik perlindungan dakwah." },
          { emoji: "🏹", title: "Strategi Hijrah", desc: "Persiapan matang berpindah tatanan peradaban meninggalkan tanah kelahiran Makkah demi kedaulatan tauhid." },
          { emoji: "🏆", title: "HISTO-PATH Master", desc: "Kesimpulan utuh 13 tahun fondasi tauhid, adab, dan kepemimpinan taktis Rasulullah siap diamalkan kini." }
        ];
    }
  };



  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6" id="level-detail-scrollable">
      
      {/* Upper breadcrumb header & continue navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('path')}
          className="flex items-center space-x-2 text-xs font-semibold text-brand-blue hover:text-brand-gold transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Jalur Belajar</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Fase Makkah • MTs Kelas VII
        </span>
      </div>

      {/* Intro Banner: Custom themed emerald or brand style */}
      <div className="bg-brand-green rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/15 rounded-full blur-xl -mr-10 -mt-10"></div>
        <div className="max-w-xl space-y-1">
          <div className="text-xs uppercase tracking-widest text-emerald-200 font-bold">
            Jenjang Keahlian 0{levelId} • Keterampilan Sejarah
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
            {levelData.title}
          </h2>
          <p className="text-xs text-emerald-100 font-light leading-relaxed">
            {levelData.description}
          </p>
        </div>

        <div className="mt-4 md:mt-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-brand-gold shrink-0 select-none">
          <span className="text-3xl">{levelData.emoji}</span>
        </div>
      </div>

      {/* Target Objectives & Skill Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objectives Box */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center">
            <BookOpen size={14} className="mr-1.5 text-brand-green" />
            Target Kompetensi Belajar
          </h4>
          <ul className="space-y-2">
            {levelData.objectives.map((obj, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                <span className="text-brand-gold font-bold">✓</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Path Focus Box */}
        <div className="bg-brand-blue text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">Pilar Berpikir Sejarah</span>
            <h4 className="text-sm font-bold">{levelData.historicalThinkingFocus}</h4>
            <p className="text-[11px] text-slate-200 font-light leading-relaxed">
              {levelData.historicalThinkingDesc}
            </p>
          </div>
          <div className="text-[10px] text-brand-gold font-bold uppercase tracking-wider mt-4">
            Metodologi Pembelajaran Aktif
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP PROGRESS GUIDANCE BOARD (BIOMETER) */}
      {(() => {
        const videoDone = videoProgress === 100;
        const quizDone = quizSubmitted;
        const reflectionDone = reflectionText.trim().length >= 10;
        const completedStepsCount = (videoDone ? 1 : 0) + (quizDone ? 1 : 0) + (reflectionDone ? 1 : 0);
        const progressPercentage = Math.round((completedStepsCount / 3) * 100);

        return (
          <div 
            id="bimbingan-checklist-card"
            className={`bg-white rounded-2xl border p-5 shadow-sm transition-all duration-300 ${
              shakeChecklist ? 'animate-bounce border-red-500 bg-red-50/10' : 'border-gray-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[9px] bg-brand-blue/10 text-brand-blue font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bimbingan Belajar Histo-Path
                </span>
                <h3 className="text-sm font-serif font-bold text-brand-blue flex items-center space-x-1.5 mt-1">
                  <span>🧭 Petunjuk Kelulusan Pembelajaran Level 0{levelId}</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-light mt-0.5">
                  Selesaikan 3 pilar materi interaktif di bawah ini untuk mengunci kelulusan & berhak klaim lencana:
                </p>
              </div>

              {/* Real-time Indicator Circle */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Progress Level</p>
                  <p className="text-xs font-mono font-bold text-brand-blue">{completedStepsCount} dari 3 langkah ({progressPercentage}%)</p>
                </div>
                <div className="relative w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full border border-slate-200">
                  <span className="text-sm font-mono font-black text-brand-blue">{completedStepsCount}</span>
                </div>
              </div>
            </div>

            {/* Dynamic visual slider */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-brand-green transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Steps checklists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {/* Step 1: Video */}
              <div className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                videoDone ? 'bg-emerald-50/30 border-emerald-100' : 'bg-slate-50/50 border-slate-100'
              }`}>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">Langkah 1</span>
                  {videoDone ? (
                    <span className="text-emerald-600 bg-emerald-100/80 p-0.5 rounded-full"><CheckCircle2 size={14} /></span>
                  ) : (
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <h5 className="text-xs font-bold text-slate-700">Tonton Video Ceramah</h5>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed">Pahami kronologi kajian secara lisan hingga indikator 100%.</p>
                </div>
              </div>

              {/* Step 2: Quiz */}
              <div className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                quizDone ? 'bg-emerald-50/30 border-emerald-100' : 'bg-slate-50/50 border-slate-100'
              }`}>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">Langkah 2</span>
                  {quizDone ? (
                    <span className="text-emerald-600 bg-emerald-100/80 p-0.5 rounded-full"><CheckCircle2 size={14} /></span>
                  ) : (
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <h5 className="text-xs font-bold text-slate-700">Kirim Evaluasi Kuis</h5>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed">Kerjakan seluruh soal pilihan ganda di panel kuis sebagai nilai kognitif.</p>
                </div>
              </div>

              {/* Step 3: Reflection */}
              <div className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                reflectionDone ? 'bg-emerald-50/30 border-emerald-100' : 'bg-slate-50/50 border-slate-100'
              }`}>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">Langkah 3</span>
                  {reflectionDone ? (
                    <span className="text-emerald-600 bg-emerald-100/80 p-0.5 rounded-full"><CheckCircle2 size={14} /></span>
                  ) : (
                    <span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <h5 className="text-xs font-bold text-slate-700">Esai Refleksi Moral</h5>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed">Ketikan lembar jurnal untuk evaluasi afektif keteladanan budi pekerti.</p>
                </div>
              </div>
            </div>

            {/* ERROR/MISSING ALERTS: Show exactly what is missed as requested by user */}
            {missingSteps && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs space-y-2 mt-4 animate-fade-in">
                <span className="font-extrabold text-red-700 flex items-center space-x-1.5">
                  <span>⚠️ Ada Materi Pembelajaran Yang Terlewat:</span>
                </span>
                <p className="text-[10px] text-red-600 font-medium leading-relaxed">
                  Agar lencana keahlian Anda sah diklaim dan kurikulum dapat dibuka seutuhnya, harap selesaikan poin berikut di bawah ini:
                </p>
                <ul className="list-disc list-inside space-y-1 text-red-600 font-light mt-1">
                  {missingSteps.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
                <div className="bg-red-100/50 p-2.5 rounded-md text-[10px] text-red-700 font-normal mt-2 leading-relaxed italic">
                  <strong>💡 Tips Bimbingan:</strong> Putar video dan ketuk &apos;Tandai Selesai&apos;, selesaikan pilihan jawaban kuis, dan isi komentar jurnal Anda sebelum ketuk kirim kembali.
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* INFOGRAPHIC MODULE (Dynamic based on selected level) */}
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-2">
          <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center space-x-2">
            <span>📊 Visual Infografis Rangkuman Kajian</span>
          </h4>
          <p className="text-xs text-slate-400 font-light mt-0.5">
            Pahami tiga fondasi utama kronologi perjuangan sebelum masuk materi:
          </p>
        </div>

        {levelId === LevelId.LEVEL_1 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-amber-500 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">Fase I: Pra-Kerasulan</span>
                <h5 className="font-bold text-xs text-brand-blue">Lapis Latar Belakang (Lvl 1 - 4)</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                  Mempelajari letak geografis, kegelapan moral krisis Jahiliyyah, kelahiran Rasulullah, asuhan gurun, perkawinan, hingga reputasi Al-Amin.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-emerald-500 space-y-2">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">Fase II: Rintisan Wahyu & Sembunyi</span>
                <h5 className="font-bold text-xs text-brand-blue">Dua Strategi Awal (Lvl 5 - 6)</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                  Peristiwa agung Gua Hira Al-Alaq, pelantikan kerasulan, konsolidasi kader bersahabat di Rumah Arqam bin Abi Arqam secara super tertutup.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500 space-y-2">
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase">Fase III: Terbuka & Konfrontasi</span>
                <h5 className="font-bold text-xs text-brand-blue">Ujian & Komitmen (Lvl 7 - 10)</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                  Seruan Bukit Shafa, penyiksaan budak, boikot total 3 tahun, Tahun Kesedihan, perjalanan agung langit Mi'raj, hingga kesiapan Hijrah Yatsrib.
                </p>
              </div>
            </div>
          </div>
        ) : levelId === LevelId.LEVEL_2 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="infographics-grid">
            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200/60 border-b-4 border-amber-500 space-y-2">
              <div className="text-3xl">🛐</div>
              <h5 className="font-bold text-sm text-brand-blue">1. Kepercayaan (Spiritual)</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Deviasi dari ajaran tauhid Nabi Ibrahim AS menjadi penyembahan berhala polities. Di sekeliling Ka'bah bertengger 360 berhala buatan manusia, dengan berhala raksasa seperti Hubal, Lata, Uzza, dan Manat.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200/60 border-b-4 border-emerald-500 space-y-2">
              <div className="text-3xl">⚔️</div>
              <h5 className="font-bold text-sm text-brand-blue">2. Sosial Kemasyarakatan</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Pengagungan martabat klan di atas segalanya (fanatisme kesukuan). Kaum wanita berada di hierarki terendah (bayi perempuan sering dikubur hidup-hidup), eksploitasi budak yang bengis, serta hukum rimba.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200/60 border-b-4 border-brand-blue space-y-2">
              <div className="text-3xl">🐫</div>
              <h5 className="font-bold text-sm text-brand-blue">3. Ekonomi & Niaga</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Makkah berdiri sebagai pusat transit perdagangan Yaman-Syam. Kehidupan ekonomi didominasi monopoli oligarki borjuis Quraisy di pasar berkala seperti Souq Ukaz, terikat jerat riba yang mencekik kaum papa.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getInfographicData(levelId).map((info, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow-xs border border-gray-200/60 border-b-4 border-brand-green space-y-2">
                <div className="text-3xl">{info.emoji}</div>
                <h5 className="font-bold text-sm text-brand-blue">{info.title}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                  {info.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* THREE LAYOUT COLUMNS: Video, Quiz & Reflection in a cohesive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Learning Video, Activities (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Video Lecture / Interactive Media Box */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <div>
                <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                  🎥 Media Interaktif Video Ceramah
                </h4>
                <p className="text-[10px] text-slate-400">Putar materi visual berdurasi singkat untuk merangkum pelajaran</p>
              </div>
              <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded">
                MP4 AUDIO-VISUAL
              </span>
            </div>

            {/* Visual simulation of player */}
            <div 
              className="aspect-video bg-slate-900 rounded-xl relative overflow-hidden flex flex-col justify-between p-4 group select-none shadow-inner"
              style={{
                backgroundImage: `radial-gradient(ellipse at center, rgba(0,33,71,0.95), rgba(0,0,0,1))`
              }}
            >
              <div className="flex justify-between items-start text-white/30 text-[9px] font-mono">
                <span>HISTO-PATH SEVERE LMS_V1</span>
                <span>LEVEL {levelId} MODULE</span>
              </div>

              <div className="text-center space-y-1.5 py-4">
                <span className="text-4xl filter drop-shadow-md">{levelData.emoji}</span>
                <h5 className="text-sm font-serif font-bold text-emerald-100 tracking-wide">
                  {levelData.title}
                </h5>
                <p className="text-[10px] text-amber-200/80 uppercase tracking-widest">{levelData.historicalThinkingFocus}</p>
                
                {videoProgress > 0 && videoProgress < 100 && (
                  <span className="text-[9px] font-mono text-white/40 block">Progress: {videoProgress}%</span>
                )}
              </div>

              <div className="space-y-2 relative z-10">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-green transition-all duration-300" 
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 bg-brand-green hover:bg-emerald-700 text-white rounded-full transition-all focus:outline-none cursor-pointer"
                      title={isPlaying ? "Jeda" : "Putar"}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                    <span className="text-[10px] font-mono text-white/60">
                      {isPlaying ? "Memutar Audio..." : isPlaying === false && videoProgress >= 100 ? "Selesai" : "Jeda"}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/40">
                    {Math.floor((videoProgress / 100) * 8)}:{(videoProgress % 3 === 0) ? "15" : "40"} / 8:00 m
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 text-center pt-2">
              <button
                onClick={() => {
                  setVideoProgress(100);
                  setIsPlaying(false);
                }}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2 px-3 rounded-lg text-xs tracking-wider transition-colors"
              >
                Tandai Selesai Menonton
              </button>
              
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setVideoProgress(0);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-brand-blue font-bold py-2 px-3 rounded-lg text-xs tracking-wider transition-colors"
              >
                Putar Dari Awal
              </button>
            </div>
          </div>



          {/* Core Interactive Practice/Activities */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest">
              📝 Kriteria Rubrik Kajian Sejarah VII MTs
            </h4>
            <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-light">
              <p>
                Sebelum Anda melangkah ke kuis analitis di bagian kanan, lengkapi tuntutan penugasan kecil berikut:
              </p>
              
              <div className="p-3 bg-brand-gold/5 rounded-lg border border-brand-gold/15 space-y-1">
                <strong>Tugas Mengamati (Observasi Kritis):</strong>
                <p className="text-[11px] text-slate-500 font-normal">
                  Sebutkan 3 implikasi dari pilar berpikir <span className="text-brand-green font-bold">{levelData.historicalThinkingFocus}</span> dalam melihat peristiwa &quot;{levelData.title}&quot; pada kotak lembar refleksi Anda di bawah.
                </p>
              </div>

              <div className="p-3 bg-brand-green/5 rounded-lg border border-brand-green/15 space-y-1">
                <strong>Anjuran Akhlak (Moral Outcome):</strong>
                <p className="text-[11px] text-slate-500 font-normal">
                  Bagaimana nilai keteladanan akhlak Rasulullah SAW di level ini dapat Anda adaptasi secara nyata di sekolah (MTs) atau rumah tangga saat ini?
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Quiz Console and Journal Reflection Drawer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic Quiz Console Box */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                📝 Evaluasi Kuis Pemahaman Sejarah
              </h4>
              <span className="text-[9px] bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-bold px-2 py-0.5 rounded uppercase">
                {questions.length} Soal
              </span>
            </div>

            {/* Form list of questions */}
            {questions.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                Tidak ada kuis tersedia untuk jenjang ini.
              </div>
            ) : (
              <div className="space-y-5">
                {questions.map((q, idx) => (
                  <div key={q.id} className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      {idx + 1}. {q.questionText}
                    </p>

                    {/* Radio Options List */}
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrectAnswer = optIdx === q.correctAnswerIndex;
                        
                        let optStyle = "border-gray-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100";
                        if (isSelected) {
                          optStyle = "border-brand-blue bg-blue-50/70 text-slate-800 font-semibold";
                        }
                        if (quizSubmitted) {
                          if (isCorrectAnswer) {
                            optStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                          } else if (isSelected && !isCorrectAnswer) {
                            optStyle = "border-red-500 bg-red-50 text-red-800";
                          } else {
                            optStyle = "border-gray-100 bg-slate-50/50 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start space-x-2 ${optStyle}`}
                          >
                            <span className="font-mono font-bold shrink-0">
                              {['A', 'B', 'C', 'D'][optIdx]}.
                            </span>
                            <span className="leading-normal">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Show explanation if evaluated */}
                    {quizSubmitted && (
                      <div className="bg-slate-100/80 p-3 rounded-lg border border-slate-200/40 text-[10.5px] text-slate-600 leading-relaxed italic">
                        <strong>Keterangan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {/* Score and CTAs */}
                {!quizSubmitted ? (
                  <button
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                    onClick={handleSubmitQuiz}
                    className={`w-full font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 ${
                      Object.keys(selectedAnswers).length < questions.length
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                        : 'bg-brand-blue hover:bg-slate-900 text-white shadow-md'
                    }`}
                  >
                    Kirim Jawaban Kuis
                  </button>
                ) : (
                  <div className="p-3 bg-brand-gold/10 rounded-lg border border-brand-gold/30 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-brand-blue">Lulus Evaluasi Kuis</p>
                      <p className="text-[10px] text-slate-500">Skor diperoleh: {quizScore}% Poin kognitif</p>
                    </div>
                    <span className="text-2xl font-black text-brand-green select-none">
                      {quizScore === 100 ? "🌟" : "👍"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ethics Reflection Journal Pad */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-50 pb-2">
              <Sparkles size={14} className="text-brand-gold" />
              <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                Jurnal Lembar Refleksi Moral
              </h4>
            </div>

            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              Ketikkan minimal satu kalimat rangkuman pemikiran atau keteladanan yang paling menyentuh hati Anda dari peristiwa ini:
            </p>

            <textarea
              required
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Contoh: Saya meneladani kejujuran Rasulullah SAW... Ini menginspirasi saya untuk bersikap jujur saat ulangan di kelas VII..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold transition-colors text-slate-800 font-light leading-relaxed resize-none"
            />

            <div className="space-y-2">
              <button
                onClick={handleSubmitReflection}
                className="w-full font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center justify-center space-x-1.5 bg-brand-green hover:bg-emerald-700 text-white shadow-md cursor-pointer"
              >
                <span>Submit Refleksi & Klaim Lencana</span>
                <ChevronRight size={14} />
              </button>
              
              <p className="text-[9.5px] text-slate-400 block text-center italic">
                💡 Tekan tombol di atas untuk memeriksakan seluruh kelengkapan kognitif & afektif level ini.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* REWARDS LIGHTBOX CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in animate-duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 relative border-t-8 border-brand-gold shadow-2xl scale-in">
            <div className="absolute top-4 left-6 text-xl animate-bounce">✨</div>
            <div className="absolute top-6 right-8 text-xl animate-pulse">🎉</div>

            <div className="space-y-2">
              <span className="text-7xl filter drop-shadow-md select-none block animate-wiggle">
                {earnedBadge ? earnedBadge.icon : "🏆"}
              </span>
              <span className="text-[10px] bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-bold px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
                Level 0{levelId} Selesai &amp; Dipahami
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-serif text-brand-blue font-extrabold uppercase">
                Hore! Kamu Berhasil Mendapatkan Lencana! 🎉
              </h3>
              {earnedBadge && (
                <p className="text-xs font-semibold text-brand-green">
                  Lencana Baru: &quot;{earnedBadge.name}&quot;
                </p>
              )}
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                {earnedBadge ? earnedBadge.description : "Anda telah berhasil memahami materi kajian dan mengisi lembar refleksi dengan baik."} <br />
                Keterampilan berpikir sejarah Anda di pilar <strong>{levelData.historicalThinkingFocus}</strong> dinyatakan lulus kriteria bimbingan.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowCelebration(false);
                  if (levelId < 10) {
                    onNavigate('level', (levelId + 1) as LevelId);
                  } else {
                    onNavigate('dashboard');
                  }
                }}
                className="w-full bg-brand-blue hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {levelId < 10 ? "Lanjutkan Ke Level Berikutnya" : "Tutup & Lihat Dashboard"}
              </button>

              <button
                onClick={() => setShowCelebration(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Tetap Di Halaman Ini
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
