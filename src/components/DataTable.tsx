import React, { useState } from "react";
import { Search, User } from "lucide-react";
import { assemblyData, AssemblyItem } from "../data";

interface DataTableProps {
  onSelectAssembly: (id: string) => void;
  activeId: string;
  isDark: boolean;
}

export default function DataTable({ onSelectAssembly, activeId, isDark }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to highlight matches with a glassmorphism style
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className={`font-extrabold rounded-xs px-0.5 border transition-all duration-200 ${
              isDark 
                ? "bg-amber-400/20 text-amber-300 border-amber-400/20" 
                : "bg-amber-100 text-amber-800 border-amber-200"
            }`}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Check if a half matches the search query
  const matchesQuery = (item: AssemblyItem, type: "first" | "second") => {
    const half = item.halves[type];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const speaker = half.speaker.toLowerCase();
    const motto = half.motto.toLowerCase();
    const slogan = half.slogan.toLowerCase();
    const policiesCombined = half.policies.join(" ").toLowerCase();
    const assemblyTitle = `${item.id}대 ${item.title} ${item.phase}`.toLowerCase();

    return (
      speaker.includes(query) ||
      motto.includes(query) ||
      slogan.includes(query) ||
      policiesCombined.includes(query) ||
      assemblyTitle.includes(query)
    );
  };

  // Pre-filter the assemblies that have at least one half matching the search
  const filteredAssemblies = assemblyData.filter(
    (item) => matchesQuery(item, "first") || matchesQuery(item, "second")
  );

  return (
    <section className="mb-14">
      {/* Table Title and Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className={`text-2xl font-black tracking-tight transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>
            역대 전·후반기 의정구조 종합 대장
          </h3>
          <p className={`text-xs mt-1 font-medium transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            제1대 전반기부터 제10대 전반기까지 통합 보존 데이터베이스
          </p>
        </div>

        {/* Search Field */}
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="의장명, 구호, 방침 검색..."
            className={`w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium backdrop-blur-md ${
              isDark 
                ? "border-white/10 bg-white/5 placeholder-slate-500 text-white" 
                : "border-slate-200 bg-white placeholder-slate-400 text-slate-800 shadow-xs"
            }`}
          />
        </div>
      </div>

      {/* Desktop View Table */}
      <div className={`hidden lg:block overflow-x-auto rounded-3xl shadow-2xl border transition-all duration-300 ${
        isDark 
          ? "border-white/10 glass-card-dark" 
          : "border-slate-200/80 glass-card-light shadow-slate-200/30"
      }`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`text-xs font-bold uppercase tracking-wider border-b transition-colors duration-300 ${
              isDark 
                ? "bg-white/10 text-white divide-x divide-white/5 border-white/10" 
                : "bg-slate-100/80 text-slate-700 divide-x divide-slate-200 border-slate-200"
            }`}>
              <th className="p-4 whitespace-nowrap text-center w-16">대수</th>
              <th className="p-4 whitespace-nowrap text-center w-16">구분</th>
              <th className="p-4 whitespace-nowrap w-44">임기 및 역대 의장</th>
              <th className="p-4 w-60">의정 구호 (Motto)</th>
              <th className="p-4 w-80">핵심 의정 방침</th>
              <th className="p-4">의장 슬로건</th>
            </tr>
          </thead>
          <tbody className={`text-xs divide-y transition-colors duration-300 ${
            isDark ? "text-slate-300 divide-white/5" : "text-slate-600 divide-slate-200"
          }`}>
            {filteredAssemblies.length === 0 ? (
              <tr>
                <td colSpan={6} className={`p-10 text-center font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  검색 결과와 매칭되는 의정 데이터가 존재하지 않습니다.
                </td>
              </tr>
            ) : (
              filteredAssemblies.map((item) => {
                const showFirst = matchesQuery(item, "first");
                const showSecond = matchesQuery(item, "second");

                const firstHalfEmpty = !item.halves.first.speaker && !item.halves.first.motto;
                const secondHalfEmpty = !item.halves.second.speaker && !item.halves.second.motto;

                return (
                  <React.Fragment key={item.id}>
                    {/* First Half Row */}
                    {showFirst && (
                      <tr 
                        onClick={() => onSelectAssembly(item.id)}
                        className={`hover:bg-opacity-50 cursor-pointer transition-colors ${
                          isDark 
                            ? `divide-x divide-white/5 hover:bg-white/5 ${item.id === activeId ? "bg-indigo-500/10" : ""}` 
                            : `divide-x divide-slate-200 hover:bg-slate-50 ${item.id === activeId ? "bg-indigo-50" : ""}`
                        }`}
                      >
                        <td
                          rowSpan={showSecond ? 2 : 1}
                          className={`p-4 text-center font-extrabold align-middle transition-all duration-300 ${
                            isDark ? "text-white bg-white/3" : "text-slate-800 bg-slate-50"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-sm">{item.title}</span>
                            <span className={`text-[9px] font-normal whitespace-nowrap ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                              {item.period.split(" ")[0]}
                            </span>
                          </div>
                        </td>
                        <td className={`p-4 text-center font-bold whitespace-nowrap transition-colors duration-300 ${
                          isDark ? "text-indigo-300 bg-indigo-500/5" : "text-indigo-700 bg-indigo-50/40"
                        }`}>
                          전반기
                        </td>
                        <td className={`p-4 font-bold whitespace-nowrap transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                          {firstHalfEmpty ? (
                            <span className="text-slate-400 italic font-normal">미정 (임기 전)</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <User className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                              <span>{highlightText(item.halves.first.speaker, searchQuery)}</span>
                            </div>
                          )}
                          <div className={`text-[10px] font-normal mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {item.halves.first.term}
                          </div>
                        </td>
                        <td className={`p-4 font-black leading-relaxed transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}>
                          {firstHalfEmpty ? (
                            <span className="text-slate-400 italic font-normal">의정구호 미수립</span>
                          ) : (
                            <span>&ldquo;{highlightText(item.halves.first.motto, searchQuery)}&rdquo;</span>
                          )}
                        </td>
                        <td className="p-4 leading-relaxed font-medium">
                          {firstHalfEmpty || item.halves.first.policies.length === 0 ? (
                            <span className="text-slate-400 italic font-normal">의정 방침 수립 예정</span>
                          ) : (
                            <ul className="list-disc pl-3.5 space-y-1">
                              {item.halves.first.policies.map((p, idx) => (
                                <li key={idx}>
                                  {highlightText(p, searchQuery)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className={`p-4 italic font-semibold leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {firstHalfEmpty || !item.halves.first.slogan ? (
                            <span className="text-slate-400 italic font-normal">-</span>
                          ) : (
                            <span>&ldquo;{highlightText(item.halves.first.slogan, searchQuery)}&rdquo;</span>
                          )}
                        </td>
                      </tr>
                    )}

                    {/* Second Half Row */}
                    {showSecond && (
                      <tr 
                        onClick={() => onSelectAssembly(item.id)}
                        className={`hover:bg-opacity-50 cursor-pointer transition-colors ${
                          isDark 
                            ? `divide-x divide-white/5 hover:bg-white/5 ${item.id === activeId ? "bg-indigo-500/10" : ""}` 
                            : `divide-x divide-slate-200 hover:bg-slate-50 ${item.id === activeId ? "bg-indigo-50" : ""}`
                        }`}
                      >
                        {/* Rowspan handles the assembly column if First row is also visible */}
                        {!showFirst && (
                          <td className={`p-4 text-center font-extrabold align-middle transition-all duration-300 ${
                            isDark ? "text-white bg-white/3" : "text-slate-800 bg-slate-50"
                          }`}>
                            <div className="flex flex-col items-center">
                              <span className="text-sm">{item.title}</span>
                              <span className={`text-[9px] font-normal whitespace-nowrap ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                {item.period.split(" ")[2]}
                              </span>
                            </div>
                          </td>
                        )}
                        <td className={`p-4 text-center font-bold whitespace-nowrap transition-colors duration-300 ${
                          isDark ? "text-emerald-300 bg-emerald-500/5" : "text-emerald-700 bg-emerald-50/40"
                        }`}>
                          후반기
                        </td>
                        <td className={`p-4 font-bold whitespace-nowrap transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                          {secondHalfEmpty ? (
                            <span className="text-slate-400 italic font-normal">미정 (임기 전)</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <User className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                              <span>{highlightText(item.halves.second.speaker, searchQuery)}</span>
                            </div>
                          )}
                          <div className={`text-[10px] font-normal mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {item.halves.second.term}
                          </div>
                        </td>
                        <td className={`p-4 font-black leading-relaxed transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}>
                          {secondHalfEmpty ? (
                            <span className="text-slate-400 italic font-normal">의정구호 미수립</span>
                          ) : (
                            <span>&ldquo;{highlightText(item.halves.second.motto, searchQuery)}&rdquo;</span>
                          )}
                        </td>
                        <td className="p-4 leading-relaxed font-medium">
                          {secondHalfEmpty || item.halves.second.policies.length === 0 ? (
                            <span className="text-slate-400 italic font-normal">의정 방침 수립 예정</span>
                          ) : (
                            <ul className="list-disc pl-3.5 space-y-1">
                              {item.halves.second.policies.map((p, idx) => (
                                <li key={idx}>
                                  {highlightText(p, searchQuery)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className={`p-4 italic font-semibold leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {secondHalfEmpty || !item.halves.second.slogan ? (
                            <span className="text-slate-400 italic font-normal">-</span>
                          ) : (
                            <span>&ldquo;{highlightText(item.halves.second.slogan, searchQuery)}&rdquo;</span>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card-list View (Optimal responsiveness) */}
      <div className="lg:hidden space-y-4">
        {filteredAssemblies.length === 0 ? (
          <div className={`p-10 text-center font-medium border rounded-3xl transition-all duration-300 ${
            isDark 
              ? "text-slate-400 bg-white/5 border-white/10" 
              : "text-slate-500 bg-slate-50 border-slate-200"
          }`}>
            검색 결과와 매칭되는 의정 데이터가 존재하지 않습니다.
          </div>
        ) : (
          filteredAssemblies.map((item) => {
            const showFirst = matchesQuery(item, "first");
            const showSecond = matchesQuery(item, "second");
            const firstHalfEmpty = !item.halves.first.speaker && !item.halves.first.motto;
            const secondHalfEmpty = !item.halves.second.speaker && !item.halves.second.motto;

            return (
              <div
                key={item.id}
                className={`rounded-3xl p-5 shadow-lg space-y-4 transition-all duration-300 ${
                  isDark 
                    ? `glass-card-dark border-white/10 ${item.id === activeId ? "ring-2 ring-indigo-500/40" : ""}` 
                    : `glass-card-light border-slate-200 ${item.id === activeId ? "ring-2 ring-indigo-500/30" : ""}`
                }`}
                onClick={() => onSelectAssembly(item.id)}
              >
                {/* Mobile Card Header */}
                <div className={`flex items-center justify-between border-b pb-3 transition-colors duration-300 ${
                  isDark ? "border-white/5" : "border-slate-100"
                }`}>
                  <div>
                    <span className={`text-base font-black transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>{item.title} 의회</span>
                    <span className={`text-[10px] font-medium block mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.period}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-300 ${
                    isDark 
                      ? "bg-white/5 text-slate-300 border-white/10" 
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {item.phase}
                  </span>
                </div>

                {/* Sub-cards for First and Second Halves */}
                <div className={`space-y-4 divide-y transition-colors duration-300 ${
                  isDark ? "divide-white/5" : "divide-slate-100"
                }`}>
                  {showFirst && (
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border transition-colors duration-300 ${
                          isDark 
                            ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" 
                            : "bg-indigo-50 text-indigo-700 border-indigo-100"
                        }`}>
                          전반기
                        </span>
                        <span className={`text-[10px] font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.halves.first.term}</span>
                      </div>
                      
                      {firstHalfEmpty ? (
                        <p className="text-xs text-slate-400 italic">임기 전 미정 상태</p>
                      ) : (
                        <div className="space-y-2">
                          <div className={`flex items-center gap-1 text-xs font-bold transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                            <User className={`w-3.5 h-3.5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                            <span>의장: {highlightText(item.halves.first.speaker, searchQuery)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block mb-0.5">의정 구호</span>
                            <p className={`text-xs font-black leading-relaxed transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}>
                              &ldquo;{highlightText(item.halves.first.motto, searchQuery)}&rdquo;
                            </p>
                          </div>
                          {item.halves.first.slogan && (
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 block mb-0.5">의장 슬로건</span>
                              <p className={`text-xs font-semibold italic transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                &ldquo;{highlightText(item.halves.first.slogan, searchQuery)}&rdquo;
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block mb-1">의정 방침</span>
                            <ul className="space-y-1">
                              {item.halves.first.policies.map((p, index) => (
                                <li key={index} className={`text-xs flex items-start gap-1.5 font-medium transition-colors duration-300 ${
                                  isDark ? "text-slate-300" : "text-slate-600"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                    isDark ? "bg-indigo-500" : "bg-indigo-600"
                                  }`} />
                                  <span>{highlightText(p, searchQuery)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {showSecond && (
                    <div className="pt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border transition-colors duration-300 ${
                          isDark 
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          후반기
                        </span>
                        <span className={`text-[10px] font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.halves.second.term}</span>
                      </div>

                      {secondHalfEmpty ? (
                        <p className="text-xs text-slate-400 italic">임기 전 미정 상태</p>
                      ) : (
                        <div className="space-y-2">
                          <div className={`flex items-center gap-1 text-xs font-bold transition-colors duration-300 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                            <User className={`w-3.5 h-3.5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                            <span>의장: {highlightText(item.halves.second.speaker, searchQuery)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block mb-0.5">의정 구호</span>
                            <p className={`text-xs font-black leading-relaxed transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}>
                              &ldquo;{highlightText(item.halves.second.motto, searchQuery)}&rdquo;
                            </p>
                          </div>
                          {item.halves.second.slogan && (
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 block mb-0.5">의장 슬로건</span>
                              <p className={`text-xs font-semibold italic transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                &ldquo;{highlightText(item.halves.second.slogan, searchQuery)}&rdquo;
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block mb-1">의정 방침</span>
                            <ul className="space-y-1">
                              {item.halves.second.policies.map((p, index) => (
                                <li key={index} className={`text-xs flex items-start gap-1.5 font-medium transition-colors duration-300 ${
                                  isDark ? "text-slate-300" : "text-slate-600"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                    isDark ? "bg-emerald-500" : "bg-emerald-600"
                                  }`} />
                                  <span>{highlightText(p, searchQuery)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
