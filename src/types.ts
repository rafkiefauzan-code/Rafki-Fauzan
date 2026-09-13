export enum LevelId {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6,
  LEVEL_7 = 7,
  LEVEL_8 = 8,
  LEVEL_9 = 9,
  LEVEL_10 = 10,
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or lucide icon name
  unlockedAtLevel: LevelId;
  color: string; // e.g. 'amber', 'emerald', 'sky'
}

export interface LevelData {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  historicalThinkingFocus: string; // e.g. "Historical Significance", "Chronological Thinking", "Empathy"
  historicalThinkingDesc: string;
  objectives: string[];
  emoji: string;
  badgeToEarn?: string;
}

export interface UserProgress {
  completedLevels: LevelId[];
  unlockedLevel: LevelId;
  quizScores: Record<number, number>; // levelId -> score %
  reflections: Record<number, string>; // levelId -> reflection text
  unlockedBadges: string[]; // badgeIds
  currentStreak: number;
  lastLoginDate: string; // YYYY-MM-DD
}

export interface StudentProfile {
  name: string;
  classroom: string;
  school: string;
  avatarSeed: string;
}

export interface ActiveView {
  screen: 'landing' | 'dashboard' | 'path' | 'level';
  selectedLevelId?: LevelId;
}
