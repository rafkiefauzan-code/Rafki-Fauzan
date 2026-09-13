import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { StudentProfile, UserProgress, LevelId, ActiveView } from './types';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LearningPath } from './components/LearningPath';
import { LevelDetail } from './components/LevelDetail';
import { LEVEL_LIST } from './data';

const PROFILE_KEY = 'histopath_student_profile';
const PROGRESS_KEY = 'histopath_learner_progress';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile | undefined>(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) return JSON.parse(saved);

    // Initial default progress state
    return {
      completedLevels: [],
      unlockedLevel: LevelId.LEVEL_1,
      quizScores: {},
      reflections: {},
      unlockedBadges: [],
      currentStreak: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
    };
  });

  const [activeView, setActiveView] = useState<ActiveView>({
    screen: 'landing',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Automatically update screen based on profile login status
  useEffect(() => {
    if (profile) {
      setActiveView(prev => 
        prev.screen === 'landing' ? { screen: 'dashboard' } : prev
      );
    } else {
      setActiveView({ screen: 'landing' });
    }
  }, [profile]);

  // Sync state to local storage
  const handleStartLearning = (newProfile: StudentProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
    
    // Process streak logic on login
    const today = new Date().toISOString().split('T')[0];
    let updatedStreak = progress.currentStreak;
    if (progress.lastLoginDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (progress.lastLoginDate === yesterday) {
        updatedStreak += 1;
      } else {
        updatedStreak = 1;
      }
    }

    const updatedProgress = {
      ...progress,
      currentStreak: updatedStreak,
      lastLoginDate: today,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
    setProgress(updatedProgress);
    
    setActiveView({ screen: 'dashboard' });
  };

  const handleUpdateProgress = (updatedProgressFields: Partial<UserProgress>) => {
    setProgress(prev => {
      const nextProgress = { ...prev, ...updatedProgressFields };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(nextProgress));
      return nextProgress;
    });
  };

  const handleNavigate = (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => {
    setActiveView({
      screen: view,
      selectedLevelId: levelId || progress.unlockedLevel,
    });
  };

  const handleResetProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    setProfile(undefined);
    setActiveView({ screen: 'landing' });
  };

  // 1. Landing View
  if (!profile || activeView.screen === 'landing') {
    return <LandingPage onStart={handleStartLearning} savedProfile={profile} />;
  }

  // Calculate dynamic header values
  const totalCompleted = progress.completedLevels.length;
  const globalPercentProgress = Math.round((totalCompleted / 10) * 100);
  const currentTitle = LEVEL_LIST.find(l => l.id === activeView.selectedLevelId)?.title || "LMS Dashboard";

  return (
    <div className="w-full h-screen bg-slate-50 flex font-sans text-slate-800 overflow-hidden" id="histo-path-app">
      
      {/* Semi-transparent Backdrop overlay for mobile menu drawer */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Left Sidebar navigation / customized profile drawer */}
      <Sidebar
        currentView={activeView.screen}
        profile={profile}
        completedLevels={progress.completedLevels}
        onNavigate={handleNavigate}
        onReset={handleResetProfile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right main workspace layout */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header container */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shrink-0 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 text-slate-500 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              title="Buka Menu"
            >
              <Menu size={20} />
            </button>
            <span className="text-lg sm:text-xl">🕌</span>
            <h2 className="text-xs sm:text-sm font-extrabold text-brand-blue uppercase tracking-wide truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
              {activeView.screen === 'dashboard' ? "Main Dashboard" : `SKI VII: ${currentTitle}`}
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                Keseluruhan Kurikulum Makkah
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/40">
                  <div 
                    className="h-full bg-brand-green transition-all duration-500" 
                    style={{ width: `${globalPercentProgress}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 font-mono">
                  {globalPercentProgress}%
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-brand-gold bg-brand-gold/5 border border-brand-gold/15 rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs">
              <span className="font-bold uppercase tracking-wider">Level 0{progress.unlockedLevel}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner views container */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {activeView.screen === 'dashboard' && (
            <Dashboard
              profile={profile}
              progress={progress}
              onNavigate={handleNavigate}
            />
          )}

          {activeView.screen === 'path' && (
            <LearningPath
              progress={progress}
              onNavigate={handleNavigate}
            />
          )}

          {activeView.screen === 'level' && activeView.selectedLevelId && (
            <LevelDetail
              levelId={activeView.selectedLevelId}
              progress={progress}
              onNavigate={handleNavigate}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

        </div>

      </main>

    </div>
  );
}
