import { motion } from "motion/react";
import { AssemblyItem } from "../data";

interface AssemblyTabsProps {
  data: AssemblyItem[];
  activeId: string;
  onSelect: (id: string) => void;
  isDark: boolean;
}

export default function AssemblyTabs({ data, activeId, onSelect, isDark }: AssemblyTabsProps) {
  return (
    <div className="mb-10 text-center">
      <p className={`text-center text-xs font-bold mb-4 uppercase tracking-widest transition-colors duration-300 ${
        isDark ? "text-slate-500" : "text-slate-500/80"
      }`}>
        의회 대수 선택
      </p>
      
      {/* Scrollable container for mobile friendly tab navigation */}
      <div className="flex overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 justify-start sm:justify-center gap-2 no-scrollbar scroll-smooth">
        <div className={`flex sm:flex-wrap gap-2 min-w-max p-1 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300 ${
          isDark 
            ? "bg-white/5 border-white/10" 
            : "bg-slate-100/90 border-slate-200/80"
        }`}>
          {data.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`relative px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 focus:outline-none ${
                  isActive 
                    ? "text-white" 
                    : isDark 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {/* Smooth background sliding indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={`absolute inset-0 rounded-xl shadow-lg transition-all duration-300 ${
                      isDark 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/20" 
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-600/15"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
