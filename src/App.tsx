import { useState } from "react";
import { Landmark } from "lucide-react";
import { assemblyData } from "./data";
import Header from "./components/Header";
import AssemblyTabs from "./components/AssemblyTabs";
import AssemblyDetail from "./components/AssemblyDetail";
import TrendChart from "./components/TrendChart";
import DataTable from "./components/DataTable";

export default function App() {
  const [activeAssemblyId, setActiveAssemblyId] = useState("10"); // Default to 10th Assembly
  const [isDark, setIsDark] = useState(false); // Start in Light Mode by default, toggleable to dark

  const activeAssembly = assemblyData.find((item) => item.id === activeAssemblyId) || assemblyData[9];

  const handleSelectAssembly = (id: string) => {
    setActiveAssemblyId(id);
    // Smooth scroll up to the selected details card on mobile
    const element = document.getElementById("main-display-area");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-indigo-600 selection:text-white relative overflow-hidden font-sans transition-colors duration-300 ${
      isDark ? "bg-[#0c0e14] text-slate-200" : "bg-[#f8fafc] text-slate-700"
    }`}>
      {/* Background Mesh Gradients */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full blur-[120px] pointer-events-none transition-all duration-300 ${
        isDark ? "bg-indigo-500/10" : "bg-indigo-500/4"
      }`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full blur-[140px] pointer-events-none transition-all duration-300 ${
        isDark ? "bg-emerald-500/5" : "bg-emerald-500/3"
      }`} />
      <div className={`absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[100px] pointer-events-none transition-all duration-300 ${
        isDark ? "bg-purple-600/5" : "bg-purple-600/3"
      }`} />

      {/* Top Premium Color Accent Bar */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-500 shrink-0 opacity-80" />

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full flex-grow relative z-10">
        {/* Header Section */}
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        {/* Assembly Tabs selector */}
        <AssemblyTabs
          data={assemblyData}
          activeId={activeAssemblyId}
          onSelect={handleSelectAssembly}
          isDark={isDark}
        />

        {/* Selected Assembly Dual Grid and background summary info */}
        <main id="main-display-area" className="scroll-mt-6">
          <AssemblyDetail assembly={activeAssembly} isDark={isDark} />
        </main>

        {/* Interactive SVG Trend Chart Analytics Section */}
        <TrendChart
          activeAssemblyId={activeAssemblyId}
          onSelectAssembly={handleSelectAssembly}
          isDark={isDark}
        />

        {/* Master Database Search Table / Mobile Card Grid */}
        <DataTable
          activeId={activeAssemblyId}
          onSelectAssembly={handleSelectAssembly}
          isDark={isDark}
        />
      </div>

      {/* Footer Section */}
      <footer className={`py-12 border-t mt-10 shrink-0 backdrop-blur-md relative z-10 transition-all duration-300 ${
        isDark 
          ? "bg-slate-950/80 text-slate-400 border-white/5" 
          : "bg-slate-100/90 text-slate-500 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className={`flex justify-center items-center gap-2 transition-colors duration-300 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
            <Landmark className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <span className={`font-extrabold tracking-widest text-sm uppercase transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Namyangju City Council Historical Archive
            </span>
          </div>
          <p className={`text-xs max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            본 아카이브는 남양주시의회 역대 자치 입법 기록 및 2026년 지방선거 후 정립된 민선 9기 최현덕 남양주시장의 **&apos;시민주권시대&apos;** 자치 철학을 반영하여 공식 데이터를 전·후반기 단위로 수집 및 재구성한 정밀 보고서 애플리케이션입니다.
          </p>
          <div className="text-[10px] text-slate-500 font-medium tracking-wide">
            &copy; 2026 남양주시의회 의정 정보 서비스 시스템. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
