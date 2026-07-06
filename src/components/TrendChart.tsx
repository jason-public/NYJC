import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Check } from "lucide-react";
import { assemblyData } from "../data";

interface TrendChartProps {
  activeAssemblyId: string;
  onSelectAssembly: (id: string) => void;
  isDark: boolean;
}

export default function TrendChart({ activeAssemblyId, onSelectAssembly, isDark }: TrendChartProps) {
  // Line Visibility States
  const [showSetup, setShowSetup] = useState(true);
  const [showWelfare, setShowWelfare] = useState(true);
  const [showSovereignty, setShowSovereignty] = useState(true);

  // Hovered Node State
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Map data into sequential points (1대 전반기 to 10대 전반기 - excluding 10대 후반기 which is null)
  const plotData: {
    assemblyId: string;
    label: string;
    shortLabel: string;
    setup: number;
    welfare: number;
    sovereignty: number;
  }[] = [];

  assemblyData.forEach((item) => {
    // First Half
    if (item.halves.first.chartData[0] !== null) {
      plotData.push({
        assemblyId: item.id,
        label: `${item.title} 전반기`,
        shortLabel: `${item.id}대 전`,
        setup: item.halves.first.chartData[0] as number,
        welfare: item.halves.first.chartData[1] as number,
        sovereignty: item.halves.first.chartData[2] as number,
      });
    }
    // Second Half (if not null)
    if (item.halves.second.chartData[0] !== null) {
      plotData.push({
        assemblyId: item.id,
        label: `${item.title} 후반기`,
        shortLabel: `${item.id}대 후`,
        setup: item.halves.second.chartData[0] as number,
        welfare: item.halves.second.chartData[1] as number,
        sovereignty: item.halves.second.chartData[2] as number,
      });
    }
  });

  // SVG dimensions
  const viewWidth = 800;
  const viewHeight = 350;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 45;

  const chartWidth = viewWidth - paddingLeft - paddingRight;
  const chartHeight = viewHeight - paddingTop - paddingBottom;

  // Indices limits
  const maxVal = 130; // Max index is 120 (Sovereignty at 10th half)

  // Coordinate Converters
  const getX = (index: number) => {
    return paddingLeft + (index / (plotData.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / maxVal) * chartHeight;
  };

  // Build SVG Paths for the Lines
  const buildPath = (key: "setup" | "welfare" | "sovereignty") => {
    let d = "";
    plotData.forEach((point, i) => {
      const x = getX(i);
      const y = getY(point[key]);
      if (i === 0) {
        d = `M ${x} ${y}`;
      } else {
        d += ` L ${x} ${y}`;
      }
    });
    return d;
  };

  const setupPath = buildPath("setup");
  const welfarePath = buildPath("welfare");
  const sovereigntyPath = buildPath("sovereignty");

  // Get active point if hovered, or default to current active assembly's first half
  const activePoint = hoveredIdx !== null ? plotData[hoveredIdx] : null;

  return (
    <section className={`mb-14 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 ${
      isDark 
        ? "glass-card-dark shadow-black/15" 
        : "glass-card-light shadow-slate-200/40"
    }`}>
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* Left Explanation Sidebar */}
        <div className="lg:col-span-2 space-y-5">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md transition-all duration-300 ${
            isDark 
              ? "text-indigo-300 bg-white/5 border-white/10" 
              : "text-indigo-600 bg-indigo-50 border-indigo-100"
          }`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>DATA TRENDS</span>
          </div>
          <div>
            <h3 className={`text-2xl font-black tracking-tight leading-snug transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>
              의정 기조 변천사 종합 분석
            </h3>
            <p className={`text-xs md:text-sm leading-relaxed mt-2.5 transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              남양주시의회는 시대적 상황과 시민 요구에 부응해 주요 기조를 가치 있게 변화시켰습니다.
              제도 수립기(1~3대)를 거쳐 민생 인프라 확장기(4~7대), 그리고 주권과 협치가 꽃피는 분권거버넌스기(8~10대)로 갈수록 시민 주권 및 양방향 소통 지수가 극적으로 상승하는 궤적을 확인하실 수 있습니다.
            </p>
          </div>

          {/* Interactive Legend Switches */}
          <div className="space-y-3">
            <button
              onClick={() => setShowSetup(!showSetup)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left duration-200 ${
                showSetup 
                  ? isDark 
                    ? "bg-blue-500/10 border-blue-500/20" 
                    : "bg-blue-50 border-blue-100/80"
                  : isDark 
                    ? "bg-transparent border-white/5 opacity-40 hover:opacity-60 text-slate-400" 
                    : "bg-transparent border-slate-200 opacity-40 hover:opacity-60 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/30" />
                <div className="text-xs">
                  <span className={`font-extrabold block transition-colors duration-300 ${isDark ? "text-blue-300" : "text-blue-800"}`}>제도 구축 지수</span>
                  <span className={`text-[10px] font-medium transition-colors duration-300 ${isDark ? "text-slate-500" : "text-slate-400"}`}>초기 조례·규범 수립 및 의정 체계 지표</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-white transition-all duration-200 ${
                showSetup 
                  ? "bg-blue-600 border-blue-600" 
                  : isDark 
                    ? "border-white/10 bg-white/5" 
                    : "border-slate-300 bg-slate-100"
              }`}>
                {showSetup && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              onClick={() => setShowWelfare(!showWelfare)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left duration-200 ${
                showWelfare 
                  ? isDark 
                    ? "bg-emerald-500/10 border-emerald-500/20" 
                    : "bg-emerald-50 border-emerald-100/80"
                  : isDark 
                    ? "bg-transparent border-white/5 opacity-40 hover:opacity-60 text-slate-400" 
                    : "bg-transparent border-slate-200 opacity-40 hover:opacity-60 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30" />
                <div className="text-xs">
                  <span className={`font-extrabold block transition-colors duration-300 ${isDark ? "text-emerald-300" : "text-emerald-800"}`}>민생 복지 지수</span>
                  <span className={`text-[10px] font-medium transition-colors duration-300 ${isDark ? "text-slate-500" : "text-slate-400"}`}>도시 성장기 정주 여건, 교통 및 복지 지표</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-white transition-all duration-200 ${
                showWelfare 
                  ? "bg-emerald-600 border-emerald-600" 
                  : isDark 
                    ? "border-white/10 bg-white/5" 
                    : "border-slate-300 bg-slate-100"
              }`}>
                {showWelfare && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              onClick={() => setShowSovereignty(!showSovereignty)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left duration-200 ${
                showSovereignty 
                  ? isDark 
                    ? "bg-purple-500/10 border-purple-500/20" 
                    : "bg-purple-50 border-purple-100"
                  : isDark 
                    ? "bg-transparent border-white/5 opacity-40 hover:opacity-60 text-slate-400" 
                    : "bg-transparent border-slate-200 opacity-40 hover:opacity-60 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-md shadow-purple-500/30" />
                <div className="text-xs">
                  <span className={`font-extrabold block transition-colors duration-300 ${isDark ? "text-purple-300" : "text-purple-800"}`}>시민주권 & 소통 지수</span>
                  <span className={`text-[10px] font-medium transition-colors duration-300 ${isDark ? "text-slate-500" : "text-slate-400"}`}>쌍방향 소통, 시민 참여 및 대의 거버넌스 지표</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-white transition-all duration-200 ${
                showSovereignty 
                  ? "bg-purple-600 border-purple-600" 
                  : isDark 
                    ? "border-white/10 bg-white/5" 
                    : "border-slate-300 bg-slate-100"
              }`}>
                {showSovereignty && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          </div>
        </div>

        {/* Right Chart Box */}
        <div className="lg:col-span-3">
          <div className={`p-4 md:p-6 rounded-2xl border shadow-inner relative backdrop-blur-md transition-all duration-300 ${
            isDark 
              ? "bg-white/3 border-white/10" 
              : "bg-slate-50/50 border-slate-200/80"
          }`}>
            <h4 className={`text-xs font-black mb-4 text-center transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              전·후반기 연동 의정 기조 지수 추이 (1대 ~ 10대 전반기)
            </h4>

            {/* Render Responsive SVG Chart */}
            <div className="w-full h-80 relative">
              <svg
                viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                className="w-full h-full overflow-visible select-none"
              >
                {/* Y-Axis Grid Lines & Labels */}
                {[0, 25, 50, 75, 100, 125].map((gridVal) => {
                  const y = getY(gridVal);
                  return (
                    <g key={gridVal} className="opacity-40">
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={viewWidth - paddingRight}
                        y2={y}
                        stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.08)"}
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 3}
                        fill={isDark ? "#94a3b8" : "#475569"}
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="end"
                      >
                        {gridVal}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Labels */}
                {plotData.map((point, i) => {
                  const x = getX(i);
                  // Only render every second label on desktop and even fewer on small viewports to avoid overlapping
                  const showLabel = i % 2 === 0;
                  return (
                    <g key={i}>
                      {showLabel && (
                        <text
                          x={x}
                          y={viewHeight - paddingBottom + 18}
                          fill={isDark ? "#94a3b8" : "#475569"}
                          fontSize="9"
                          fontWeight="700"
                          textAnchor="middle"
                          transform={`rotate(30, ${x}, ${viewHeight - paddingBottom + 18})`}
                        >
                          {point.shortLabel}
                        </text>
                      )}
                      {/* Interactive column hover overlay */}
                      <rect
                        x={x - chartWidth / plotData.length / 2}
                        y={paddingTop}
                        width={chartWidth / plotData.length}
                        height={chartHeight}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onClick={() => onSelectAssembly(point.assemblyId)}
                      />
                    </g>
                  );
                })}

                {/* Draw actual paths with standard stroke animations */}
                {showSetup && (
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                    d={setupPath}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {showWelfare && (
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    d={welfarePath}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {showSovereignty && (
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    d={sovereigntyPath}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Interactive vertical tracker line on hover */}
                {hoveredIdx !== null && (
                  <line
                    x1={getX(hoveredIdx)}
                    y1={paddingTop}
                    x2={getX(hoveredIdx)}
                    y2={viewHeight - paddingBottom}
                    stroke={isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(15, 23, 42, 0.15)"}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Highlights for nodes */}
                {plotData.map((point, i) => {
                  const x = getX(i);
                  const isHovered = hoveredIdx === i;
                  const isCurrentAssembly = point.assemblyId === activeAssemblyId;

                  return (
                    <g key={i}>
                      {showSetup && (
                        <circle
                          cx={x}
                          cy={getY(point.setup)}
                          r={isHovered ? 5 : isCurrentAssembly ? 4 : 3}
                          fill={isCurrentAssembly ? "#60a5fa" : "#3b82f6"}
                          stroke="#ffffff"
                          strokeWidth={isCurrentAssembly ? 2 : 1}
                        />
                      )}
                      {showWelfare && (
                        <circle
                          cx={x}
                          cy={getY(point.welfare)}
                          r={isHovered ? 5 : isCurrentAssembly ? 4 : 3}
                          fill={isCurrentAssembly ? "#34d399" : "#10b981"}
                          stroke="#ffffff"
                          strokeWidth={isCurrentAssembly ? 2 : 1}
                        />
                      )}
                      {showSovereignty && (
                        <circle
                          cx={x}
                          cy={getY(point.sovereignty)}
                          r={isHovered ? 6 : isCurrentAssembly ? 5 : 3.5}
                          fill={isCurrentAssembly ? "#c084fc" : "#a855f7"}
                          stroke="#ffffff"
                          strokeWidth={isCurrentAssembly ? 2.5 : 1}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Floating Tooltip Component */}
              <AnimatePresence>
                {activePoint && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`absolute top-2 left-1/2 -translate-x-1/2 text-[11px] p-3.5 rounded-xl shadow-2xl backdrop-blur-md border flex flex-col gap-1 w-52 z-30 transition-all duration-300 ${
                      isDark 
                        ? "bg-slate-950/95 border-white/10 text-white" 
                        : "bg-white/95 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className={`font-extrabold border-b pb-1.5 mb-1.5 flex justify-between items-center transition-colors duration-300 ${
                      isDark ? "border-white/10" : "border-slate-200"
                    }`}>
                      <span>{activePoint.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border transition-all duration-300 ${
                        isDark 
                          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" 
                          : "bg-indigo-50 text-indigo-600 border-indigo-200"
                      }`}>
                        선택가능
                      </span>
                    </div>
                    {showSetup && (
                      <div className="flex justify-between items-center">
                        <span className={isDark ? "text-slate-400" : "text-slate-500"}>제도 구축 지수:</span>
                        <span className="font-bold text-blue-500">{activePoint.setup}</span>
                      </div>
                    )}
                    {showWelfare && (
                      <div className="flex justify-between items-center">
                        <span className={isDark ? "text-slate-400" : "text-slate-500"}>민생 복지 지수:</span>
                        <span className="font-bold text-emerald-600">{activePoint.welfare}</span>
                      </div>
                    )}
                    {showSovereignty && (
                      <div className="flex justify-between items-center">
                        <span className={`font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>시민주권 & 소통 지수:</span>
                        <span className="font-black text-purple-600">{activePoint.sovereignty}</span>
                      </div>
                    )}
                    <span className={`text-[8px] mt-1 block text-center font-medium transition-colors duration-300 ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>
                      클릭 시 해당 대수로 이동합니다.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

