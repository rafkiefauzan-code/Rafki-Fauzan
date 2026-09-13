import React from 'react';
import { LayoutDashboard, Compass, Trophy, Library, RefreshCw, LogOut, X } from 'lucide-react';
import { StudentProfile, LevelId } from '../types';

interface SidebarProps {
  currentView: 'landing' | 'dashboard' | 'path' | 'level';
  profile: StudentProfile;
  completedLevels: LevelId[];
  onNavigate: (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  profile,
  completedLevels,
  onNavigate,
  onReset,
  isOpen = false,
  onClose,
}) => {
  const completionPercentage = Math.round((completedLevels.length / 10) * 100);

  const handleItemClick = (view: 'dashboard' | 'path' | 'level', levelId?: LevelId) => {
    onNavigate(view, levelId);
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-blue text-white flex flex-col justify-between shrink-0 h-full select-none transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} 
      id="sidebar-container"
    >
      
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div 
              onClick={() => handleItemClick('dashboard')}
              className="flex items-center text-brand-gold font-bold text-xl tracking-tight cursor-pointer hover:scale-102 transition-transform"
            >
              <span className="mr-2 text-2xl">🕌</span> 
              <span className="font-serif tracking-widest text-[#C5A059]">HISTO-PATH</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">
              Learning Management System
            </p>
          </div>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              title="Tutup Menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Options list */}
        <nav className="py-6 px-4 space-y-2">
          {/* Dashboard Button */}
          <button
            onClick={() => handleItemClick('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
              currentView === 'dashboard'
                ? 'bg-white/10 text-white border-l-4 border-brand-gold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} className="opacity-80" />
            <span>Dashboard</span>
          </button>

          {/* Learning Path Map */}
          <button
            onClick={() => handleItemClick('path')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
              currentView === 'path'
                ? 'bg-white/10 text-white border-l-4 border-brand-gold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Compass size={18} className="opacity-80" />
            <span>Learning Path (10 Jenjang)</span>
          </button>

          {/* Badges and milestones */}
          <button
            onClick={() => handleItemClick('dashboard')} // Scrolls down to badges, or goes to dashboard and flags it
            className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-xl text-left text-sm font-medium transition-all duration-200"
          >
            <Trophy size={18} className="opacity-80" />
            <div className="flex-1 flex justify-between items-center">
              <span>Badges & Penghargaan</span>
              <span className="bg-brand-gold/20 text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-gold/30">
                Lvl {completedLevels.length + 1}
              </span>
            </div>
          </button>

          {/* Library of resources */}
          <div className="pt-4 mt-4 border-t border-white/5 px-4">
            <p className="text-[9px] uppercase font-bold text-white/40 tracking-wider">Sumber Tambahan</p>
          </div>

          <button
            onClick={() => {
              handleItemClick('level', LevelId.LEVEL_2);
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white/50 hover:bg-white/5 hover:text-white rounded-xl text-left text-xs font-light transition-all"
          >
            <Library size={14} className="opacity-60" />
            <span>Masyarakat Pra-Islam (lvl 2)</span>
          </button>

          <button
            onClick={() => {
              handleItemClick('level', LevelId.LEVEL_1);
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white/50 hover:bg-white/5 hover:text-white rounded-xl text-left text-xs font-light transition-all"
          >
            <Library size={14} className="opacity-60" />
            <span>Orientasi & Konsep (lvl 1)</span>
          </button>
        </nav>
      </div>

      {/* Footer Student Branding & Reset triggers */}
      <div className="flex flex-col bg-black/15">
        {/* Dynamic User Profile info */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center border-2 border-brand-gold font-extrabold text-sm text-white select-none">
              {profile.avatarSeed}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">{profile.name}</div>
              <div className="text-[9px] text-white/60 uppercase tracking-tighter truncate">
                {profile.classroom} • {profile.school}
              </div>
            </div>
          </div>
        </div>

        {/* Reset and Logout triggers */}
        <div className="p-3 grid grid-cols-2 gap-2 text-center text-xs">
          <button
            onClick={onReset}
            className="flex items-center justify-center space-x-1 py-2 rounded-lg bg-black/20 hover:bg-black/35 text-white/60 hover:text-white transition-all cursor-pointer text-[10px]"
            title="Ganti Profil Siswa"
          >
            <LogOut size={12} />
            <span>Keluar</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Reset seluruh nilai kuis, pencapaian level, dan catatan refleksi?")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="flex items-center justify-center space-x-1 py-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-300 hover:text-red-200 transition-all cursor-pointer text-[10px]"
            title="Reset Seluruh Kemajuan Belajar"
          >
            <RefreshCw size={12} />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
