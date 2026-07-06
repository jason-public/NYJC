import { motion } from "motion/react";
import { Landmark, CalendarDays, Users, Sun, Moon } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="mb-12 text-center relative overflow-hidden py-6">
      {/* Dynamic Background radial accent */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl -z-10 transition-all duration-500 ${
        isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"
      }`} />

      {/* Floating Theme Toggle Switch */}
      <div className="absolute top-0 right-2 md:right-4 flex justify-end">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          className={`relative p-2 rounded-2xl border transition-all duration-300 flex items-center gap-1.5 shadow-md ${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/10 text-yellow-400" 
              : "bg-white/80 border-slate-200/80 hover:bg-slate-100 text-indigo-600"
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 animate-spin-slow" />
              <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-semibold tracking-wider uppercase rounded-full border shadow-md transition-all duration-300 ${
          isDark 
            ? "text-indigo-300 bg-white/5 border-white/10" 
            : "text-indigo-600 bg-indigo-50/80 border-indigo-100"
        }`}
      >
        <Landmark className={`w-3.5 h-3.5 animate-pulse ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
        <span>100만 메가시티 남양주 - 시민주권과 지방의회 4.0</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl md:text-5xl font-black mb-5 tracking-tight leading-tight transition-all duration-300 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        남양주시의회 <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-300 ${
          isDark 
            ? "from-indigo-300 via-purple-400 to-emerald-400" 
            : "from-indigo-600 via-purple-600 to-emerald-600"
        }`}>역대 의정 아카이브</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`max-w-3xl mx-auto leading-relaxed text-sm md:text-base px-2 transition-all duration-300 ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        1991년 지방자치 재개 원년부터 2026년 새롭게 출범하는 <strong className={`font-bold transition-all duration-300 ${
          isDark ? "text-indigo-300" : "text-indigo-600"
        }`}>제10대 시민주권시대 의회</strong>까지,
        <br className="hidden md:inline" /> 남양주시의회의 전반기·후반기 의정구조, 의정구호, 의장슬로건의 역사적 변천을 체계적으로 조망합니다.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 flex justify-center items-center gap-4 sm:gap-6 text-xs font-medium"
      >
        <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
          isDark 
            ? "bg-white/5 border-white/10 text-slate-300" 
            : "bg-white/80 border-slate-200 text-slate-600 shadow-sm"
        }`}>
          <CalendarDays className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
          <span>총 35개년 기록</span>
        </div>
        <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
          isDark 
            ? "bg-white/5 border-white/10 text-slate-300" 
            : "bg-white/80 border-slate-200 text-slate-600 shadow-sm"
        }`}>
          <Users className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
          <span>전·후반기 의장단 완벽 복원</span>
        </div>
      </motion.div>
    </header>
  );
}
