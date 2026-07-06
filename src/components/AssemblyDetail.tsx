import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Hourglass, 
  User, 
  Info, 
  CalendarCheck,
  Award,
  FileText,
  Check,
  Search,
  Layers,
  Lightbulb,
  FileDown
} from "lucide-react";
import { AssemblyItem } from "../data";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface AssemblyDetailProps {
  assembly: AssemblyItem;
  isDark: boolean;
}

interface Submission {
  no: number;
  author: string;
  dept: string;
  motto: string;
  policies: string;
  slogan: string;
  memo?: string;
}

const submissions10th: Submission[] = [
  {
    no: 1,
    author: "신상민",
    dept: "의정팀 · 행정6급",
    motto: "시민의 / 시민에 의한 / 시민을 위한",
    policies: "오직 시민만을 위한 생활 밀착 정치 구현",
    slogan: "시민으로부터 주어진 권한 시민의 뜻에 따라 시민을 위해 쓰는 의회가 되겠습니다.",
    memo: "시민이 주인이 되는 의회"
  },
  {
    no: 2,
    author: "이관원",
    dept: "비서실 · 시설7",
    motto: "시민과 함께 만드는 행복 미래, 남양주의 내일을 여는 의회",
    policies: "• 시민행복을 키우는 동행 의회\n• 진심으로 실천하는 책임 의정\n• 함께 높여가는 남양주의 가치",
    slogan: "시민행복 최우선, 책임 의정으로 더 나은 남양주의 내일을 열겠습니다.",
    memo: "제외 검토 표시"
  },
  {
    no: 3,
    author: "김원철",
    dept: "정책지원팀 · 행정7급",
    motto: "시민과 함께, 남양주의 미래를 여는 의회!",
    policies: "시민중심 의회, 현장중심 의회, 미래중심 의회",
    slogan: "시민 곁에서 듣고, 현장에서 답하며, 남양주의 더 큰 내일을 열겠습니다!"
  },
  {
    no: 4,
    author: "김지혜",
    dept: "정책지원팀 · 행정7급",
    motto: "정책으로 답하고 실천으로 증명하는 의회",
    policies: "현장 중심 · 정책 중심 · 시민 중심 의정",
    slogan: "시민의 뜻을 정책으로!!"
  },
  {
    no: 5,
    author: "우정민",
    dept: "정책지원팀 · 행정7급",
    motto: "젊은 생각, 열린 의회, 빛나는 남양주!",
    policies: "• 혁신하는 젊은 의회\n• 소통하는 열린 의회\n• 신뢰받는 민생 의회",
    slogan: "1. 역동적 성장을 이끄는 젊은 엔진, 신뢰할 수 있는 열린 의회\n2. 시민의 목소리에서 변화를 찾는 의회"
  },
  {
    no: 6,
    author: "이승민",
    dept: "정책지원팀 · 행정7급",
    motto: "시민을 잇고, 미래를 여는 의회",
    policies: "시민의 목소리와 정책의 변화를 연결하겠습니다.",
    slogan: "사람을 잇고, 지역을 연결하며, 미래를 여는 남양주시의회"
  },
  {
    no: 7,
    author: "조민기",
    dept: "정책지원팀 · 행정7급",
    motto: "시민과 동행하며, 지역과 함께 변화하는 의회!",
    policies: "• 일(10)심히 발로 뛰는 '민생의정'\n• 쉽(10)게 문턱을 낮춘 '소통의정'\n• 미래를 향한 도약 '넥스트 텐'",
    slogan: "시민의 앞에서 더 일(10)심히! 시민이 이해하기 더 쉽(10)게!\n* 숫자 활용 언어유희"
  },
  {
    no: 8,
    author: "지은주",
    dept: "정책지원팀 · 행정7급",
    motto: "일하는 의회, 신뢰받는 의회",
    policies: "시민 중심 의회, 현장 중심 의회, 책임 중심 의회",
    slogan: "시민과 함께 일하고, 성과로 신뢰받는 남양주시의회가 되겠습니다."
  },
  {
    no: 9,
    author: "양범석",
    dept: "의사팀 · 행정7급",
    motto: "시민의 삶을 먼저, 변화와 미래를 만드는 남양주시의회",
    policies: "행동하는 의회, 경청하는 의회, 신뢰받는 의회!",
    slogan: "시민의 삶을 위한, 미래로 나아가는 남양주시의회!"
  },
  {
    no: 10,
    author: "박영현",
    dept: "홍보팀 · 임기제라급",
    motto: "시민의 목소리를 듣는 의회, 책임 있게 실천하는 의회",
    policies: "시민 경청 의회, 책임 실천 의회, 신뢰받는 의회",
    slogan: "시민의 목소리를 경청하고 책임 있는 실천으로 신뢰받는 남양주시의회"
  },
  {
    no: 11,
    author: "박준완",
    dept: "(공란) · 행정6급",
    motto: "• 시민을 향한 진심, 결과로 증명하는 의회\n• 든든한 동행, 실력 있는 의회",
    policies: "진심으로 소통하고, 책임 있게 실천하며, 감동으로 보답하는 의회",
    slogan: "• 공명정대! 믿고 맡길 수 있는 남양주시의회\n• 시민 자부심의 회복! 앞장서겠습니다."
  },
  {
    no: 12,
    author: "임소나",
    dept: "(공란) · 행정7급",
    motto: "신뢰받는 의정, 행복한 남양주",
    policies: "• 시민의 뜻을 담아 미래를 여는 의회\n• 시민과 함께 여는 새로운 남양주시의회",
    slogan: "• 시민을 향한 진심, 의정 실천\n• 오늘을 살피고 내일을 준비하는 의회"
  },
  {
    no: 13,
    author: "조재형",
    dept: "운영지원팀 · 전산6급",
    motto: "시민의 삶에 힘이 되는 의회",
    policies: "소통의정(경청), 현장의정(민생), 책임의정(실질적 변화)",
    slogan: "시민을 듣고, 삶을 바꾸다"
  },
  {
    no: 14,
    author: "김강연",
    dept: "운영지원팀 · 공업7급",
    motto: "변화와 성장의 중심, 남양주를 여는 의회",
    policies: "실천하는 의정, 공감하는 의정, 신뢰받는 의정 실현",
    slogan: "성장하는 남양주, 함께 뛰는 의회"
  },
  {
    no: 15,
    author: "권희진",
    dept: "의정팀 · 행정8급",
    motto: "시민의 오늘을 듣는 의회, 내일을 여는 의회",
    policies: "시민 소통, 책임 의정",
    slogan: "시민의 목소리를 듣고 시민의 미래를 여는 남양주시의회"
  },
  {
    no: 16,
    author: "최정인",
    dept: "의사팀 · 행정6급",
    motto: "1. 소통으로 여는 의회, 신뢰 미래\n2. 신뢰받는 의회, 행동하는 의회",
    policies: "[1안] 현장/소통공감/정책실천/미래준비\n[2안] 실천/신뢰/미래준비",
    slogan: "더 가까이, 더 새롭게, 더 힘차게 일하는 의회 / 시민과 함께 미래를 여는 의회"
  }
];

export default function AssemblyDetail({ assembly, isDark }: AssemblyDetailProps) {
  // Mobile filter: 'all', 'first', 'second'
  const [filterMode, setFilterMode] = useState<"all" | "first" | "second">("all");
  
  // Vision Mode for 10th Assembly: "report" (Vision Report) or "default" (Default Comparison)
  const [visionMode, setVisionMode] = useState<"report" | "default">("report");
  
  // Tab ID inside Vision Report: 1, 2, 3, 4
  const [activeProposalTab, setActiveProposalTab] = useState<number>(1);
  const [proposalSearchQuery, setProposalSearchQuery] = useState<string>("");

  // Reset states when assembly changes
  useEffect(() => {
    setFilterMode("all");
    if (assembly.id === "10") {
      setVisionMode("report");
      setActiveProposalTab(1);
      setProposalSearchQuery("");
    }
  }, [assembly.id]);

  const { title, period, phase, context, halves } = assembly;

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      
      const element = document.getElementById("printable-assembly-report");
      if (!element) {
        throw new Error("PDF 템플릿 요소를 찾을 수 없습니다.");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `${assembly.title}_남양주시의회_의정활동_요약보고서.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      alert("PDF 파일 저장 중 오류가 발생했습니다. 다시 한번 시도해 주세요.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Highlight helper for Proposal Search
  const highlightProposalText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className={`font-extrabold rounded px-0.5 border ${
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

  // Convert linebreaks to <br/> tags
  const renderMultilineText = (text: string, query?: string) => {
    return text.split("\n").map((line, idx) => (
      <span key={idx} className="block">
        {query ? highlightProposalText(line, query) : line}
      </span>
    ));
  };

  // Render standard half card (for non-10th assembly or when switching default)
  const renderHalfCard = (
    type: "first" | "second",
    data: typeof halves.first | typeof halves.second,
    themeColor: "indigo" | "emerald"
  ) => {
    const isFirst = type === "first";
    
    const bgBadge = isDark
      ? isFirst 
        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" 
        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
      : isFirst
        ? "bg-indigo-50 text-indigo-700 border-indigo-100"
        : "bg-emerald-50 text-emerald-700 border-emerald-100";

    const bgIcon = isDark
      ? isFirst ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
      : isFirst ? "bg-indigo-100 text-indigo-700 border border-indigo-200/50" : "bg-emerald-100 text-emerald-700 border border-emerald-200/50";

    const accentBorder = isDark
      ? isFirst ? "border-l-4 border-indigo-500 bg-white/3" : "border-l-4 border-emerald-500 bg-white/3"
      : isFirst ? "border-l-4 border-indigo-500 bg-indigo-50/20" : "border-l-4 border-emerald-500 bg-emerald-50/20";

    const bulletColor = isDark
      ? isFirst ? "bg-indigo-400 shadow-indigo-400/30" : "bg-emerald-400 shadow-emerald-400/30"
      : isFirst ? "bg-indigo-500 shadow-indigo-500/15" : "bg-emerald-500 shadow-emerald-500/15";

    const isEmpty = !data.speaker && !data.motto;

    if (isEmpty) {
      return (
        <div className={`p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[350px] transition-all duration-300 ${
          isDark ? "bg-white/3" : "bg-slate-50/30"
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border transition-all duration-300 ${
            isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200/80"
          }`}>
            <CalendarCheck className={`w-8 h-8 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
          </div>
          <h3 className={`text-base font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-slate-700"}`}>후반기 임기 예정</h3>
          <p className={`text-xs max-w-xs leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            해당 기수의 후반기 의정 활동은 <strong className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>2028년 7월</strong> 개원 후 개시될 예정이며, 의장단 선출 및 의정 방침 조율에 맞추어 실시간으로 아카이브 대장에 등재됩니다.
          </p>
        </div>
      );
    }

    return (
      <div className={`p-6 md:p-8 space-y-7 transition-colors duration-200 ${
        isDark ? "hover:bg-white/5" : "hover:bg-slate-50/30"
      }`}>
        <div className={`flex items-center justify-between pb-4 border-b border-dashed transition-all duration-300 ${
          isDark ? "border-white/10" : "border-slate-200/80"
        }`}>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${bgBadge}`}>
            <Hourglass className="w-3.5 h-3.5" />
            <span>{isFirst ? "전반기" : "후반기"}</span>
          </span>
          <span className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{data.term}</span>
        </div>

        <div className="space-y-6">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 transition-colors duration-300 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              역대 의장
            </span>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${bgIcon}`}>
                <User className="w-4 h-4" />
              </div>
              <span className={`font-extrabold text-base md:text-lg transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>
                {data.speaker}
              </span>
            </div>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1.5 transition-colors duration-300 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              의정 구호
            </span>
            <p className={`text-lg md:text-xl font-black leading-snug tracking-tight transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}>
              &ldquo;{data.motto}&rdquo;
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 transition-colors duration-300 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              의장 슬로건
            </span>
            <div className={`p-4 rounded-r-2xl border transition-all duration-300 ${
              isDark ? "border-y border-r border-white/5" : "border-y border-r border-slate-200/50"
            } ${accentBorder}`}>
              <p className={`italic text-xs md:text-sm font-semibold leading-relaxed transition-colors duration-300 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>
                &ldquo;{data.slogan}&rdquo;
              </p>
            </div>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest block mb-3 transition-colors duration-300 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              핵심 의정 방침
            </span>
            <ul className="space-y-2.5">
              {data.policies.map((policy, idx) => (
                <li key={idx} className={`flex items-start gap-2.5 text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${bulletColor} mt-1.5 flex-shrink-0`} />
                  <span className={`font-medium transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const getPhaseBadgeStyle = (phaseStr: string) => {
    if (isDark) {
      if (phaseStr.includes("수립기")) return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      if (phaseStr.includes("안정기")) return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
      if (phaseStr.includes("구조") || phaseStr.includes("수립기")) return "bg-teal-500/10 text-teal-300 border-teal-500/20";
      if (phaseStr.includes("인프라") || phaseStr.includes("확충기")) return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
      if (phaseStr.includes("지방분권") || phaseStr.includes("자치혁신기")) return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      if (phaseStr.includes("상생협치기")) return "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20";
      return "bg-rose-500/10 text-rose-300 border-rose-500/20";
    } else {
      if (phaseStr.includes("수립기")) return "bg-blue-50 text-blue-700 border-blue-200/50";
      if (phaseStr.includes("안정기")) return "bg-cyan-50 text-cyan-700 border-cyan-200/50";
      if (phaseStr.includes("구조") || phaseStr.includes("수립기")) return "bg-teal-50 text-teal-700 border-teal-200/50";
      if (phaseStr.includes("인프라") || phaseStr.includes("확충기")) return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      if (phaseStr.includes("지방분권") || phaseStr.includes("자치혁신기")) return "bg-purple-50 text-purple-700 border-purple-200/50";
      if (phaseStr.includes("상생협치기")) return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/50";
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    }
  };

  // Filter 10th Assembly Submissions for tab 4
  const filteredSubmissions = submissions10th.filter((s) => {
    const q = proposalSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.author.toLowerCase().includes(q) ||
      s.dept.toLowerCase().includes(q) ||
      s.motto.toLowerCase().includes(q) ||
      s.policies.toLowerCase().includes(q) ||
      s.slogan.toLowerCase().includes(q) ||
      (s.memo && s.memo.toLowerCase().includes(q))
    );
  });

  return (
    <div className="mb-14" id="main-display-area">
      {/* Top Header Card */}
      <div className={`p-5 md:p-6 border-b-0 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
        isDark 
          ? "glass-card-dark rounded-t-3xl" 
          : "glass-card-light rounded-t-3xl shadow-sm"
      }`}>
        <div className="text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center md:justify-start">
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>
              {title} 남양주시의회
            </h2>
            <span className={`self-center sm:self-auto px-3 py-1 rounded-full text-xs font-extrabold border shadow-md transition-all duration-300 ${getPhaseBadgeStyle(phase)}`}>
              {phase}
            </span>
          </div>
          <p className={`text-xs mt-1.5 font-medium flex items-center justify-center md:justify-start gap-1 transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <CalendarCheck className={`w-3.5 h-3.5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <span>임기: {period}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* PDF Download Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer ${
              isGeneratingPDF
                ? isDark
                  ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"
                : isDark
                  ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                  : "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
            }`}
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span>PDF 생성 중...</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF 저장</span>
              </>
            )}
          </button>

          {/* For 10th Assembly, show the Toggle to switch view modes */}
          {assembly.id === "10" && (
            <div className={`flex items-center gap-1 p-1 rounded-xl text-xs font-bold border transition-all duration-300 ${
              isDark 
                ? "bg-amber-500/10 border-amber-500/20 text-amber-300" 
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}>
              <button
                onClick={() => setVisionMode("report")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                  visionMode === "report" 
                    ? isDark 
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-amber-600 text-white shadow-md"
                    : isDark 
                      ? "text-amber-300 hover:text-white" 
                      : "text-amber-800 hover:text-amber-950"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                의정비전 보고서
              </button>
              <button
                onClick={() => setVisionMode("default")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                  visionMode === "default" 
                    ? isDark 
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-amber-600 text-white shadow-md"
                    : isDark 
                      ? "text-amber-300 hover:text-white" 
                      : "text-amber-800 hover:text-amber-950"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                기본 의정구조
              </button>
            </div>
          )}

          {/* Standard Switcher (Visible on non-10th, or on 10th default comparison mode) */}
          {(assembly.id !== "10" || visionMode === "default") && (
            <div className={`flex items-center gap-1 p-1 rounded-xl text-xs font-medium border backdrop-blur-md transition-all duration-300 ${
              isDark 
                ? "bg-white/5 border-white/10" 
                : "bg-slate-100 border-slate-200"
            }`}>
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  filterMode === "all" 
                    ? "bg-indigo-600 text-white font-extrabold shadow-md" 
                    : isDark 
                      ? "text-slate-400 hover:text-white" 
                      : "text-slate-500 hover:text-slate-800"
                }`}
              >
                전체 비교
              </button>
              <button
                onClick={() => setFilterMode("first")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  filterMode === "first" 
                    ? "bg-indigo-600 text-white font-extrabold shadow-md" 
                    : isDark 
                      ? "text-slate-400 hover:text-white" 
                      : "text-slate-500 hover:text-slate-800"
                }`}
              >
                전반기
              </button>
              <button
                onClick={() => setFilterMode("second")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  filterMode === "second" 
                    ? "bg-emerald-600 text-white font-extrabold shadow-md" 
                    : isDark 
                      ? "text-slate-400 hover:text-white" 
                      : "text-slate-500 hover:text-slate-800"
                }`}
              >
                후반기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {assembly.id === "10" && visionMode === "report" ? (
        /* ==================== 제10대 의정비전 보고서 특화 UI ==================== */
        <div className={`p-5 md:p-8 border-t-0 rounded-b-3xl shadow-2xl transition-all duration-300 space-y-8 ${
          isDark 
            ? "glass-card-dark shadow-black/20" 
            : "glass-card-light shadow-slate-200/50"
        }`}>
          {/* 추진 배경 및 경과 (📌 Intro Section) */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
            isDark 
              ? "bg-indigo-950/15 border-indigo-500/10 text-slate-300" 
              : "bg-indigo-50/40 border-indigo-100 text-slate-700"
          }`}>
            <h3 className={`text-sm md:text-base font-extrabold flex items-center gap-2 mb-4 transition-colors duration-300 ${
              isDark ? "text-indigo-300" : "text-indigo-800"
            }`}>
              <span className="text-lg">📌</span> 추진 배경 및 경과
            </h3>
            <ul className="space-y-3 text-xs md:text-sm font-medium">
              <li className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? "bg-indigo-400" : "bg-indigo-600"}`} />
                <span>제10대 남양주시의회 개원에 따라 의정 활동의 이념적 지표가 될 구호·방침·슬로건 정립</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? "bg-indigo-400" : "bg-indigo-600"}`} />
                <span>의회 내부 공모를 통해 총 16건의 비전안 접수 (의정팀, 정책지원팀, 홍보팀 등 참여)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? "bg-indigo-400" : "bg-indigo-600"}`} />
                <span>
                  주요 도출 핵심 키워드 : <strong className={isDark ? "text-indigo-300 font-bold" : "text-indigo-700 font-extrabold"}>시민 (경청·소통)</strong>, <strong className={isDark ? "text-emerald-300 font-bold" : "text-emerald-700 font-extrabold"}>현장 (민생·실천)</strong>, <strong className={isDark ? "text-amber-300 font-bold" : "text-amber-700 font-extrabold"}>미래 (혁신·성장)</strong>
                </span>
              </li>
            </ul>
          </div>

          {/* 비전안 탭 메뉴 */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 border-b border-dashed border-slate-200/20 pb-3 justify-center sm:justify-start">
              {[
                { id: 1, name: "제1안: 종합 비전" },
                { id: 2, name: "제2안: 현장 실천형" },
                { id: 3, name: "제3안: 시민 주권형" },
                { id: 4, name: "📋 직원 공모 내역" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveProposalTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs md:text-sm border transition-all duration-300 ${
                    activeProposalTab === tab.id
                      ? isDark
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                        : "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 패널 */}
            <AnimatePresence mode="wait">
              {activeProposalTab === 1 && (
                <motion.div
                  key="proposal-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      제1안 : [종합 비전] 시민 중심 & 미래 지향 체계
                    </h4>
                    <p className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      최다 제안 키워드를 반영하여 대중성과 상징성을 조화롭게 결합한 안
                    </p>
                  </div>

                  {/* 대표 구호 (Bento Slogan Card) */}
                  <div className={`p-8 rounded-2xl text-center border transition-all duration-300 ${
                    isDark 
                      ? "bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border-indigo-500/20" 
                      : "bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200/60"
                  }`}>
                    <span className={`text-[10px] uppercase tracking-widest font-extrabold block mb-2 ${isDark ? "text-indigo-400" : "text-indigo-700"}`}>
                      대표 의정구호
                    </span>
                    <h2 className={`text-lg md:text-2xl font-black leading-snug tracking-tight ${isDark ? "text-indigo-200" : "text-indigo-900"}`}>
                      &ldquo;시민과 함께하는 오늘, 미래를 여는 남양주시의회&rdquo;
                    </h2>
                  </div>

                  {/* 핵심 방침 (Bento Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        num: "방침 1",
                        title: "소통과 열린 의정",
                        desc: "시민의 목소리를 선제적으로 경청하고 정책화하는 상생 의회"
                      },
                      {
                        num: "방침 2",
                        title: "현장 중심 민생",
                        desc: "발로 뛰며 민생 경제와 시민의 실질적 삶을 보듬는 현장 의회"
                      },
                      {
                        num: "방침 3",
                        title: "미래 지향 혁신",
                        desc: "남양주의 지속 가능한 성장과 혁신 과제를 준비하는 의회"
                      }
                    ].map((policy, i) => (
                      <div key={i} className={`p-5 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? "bg-white/3 border-white/5 hover:border-indigo-500/30" 
                          : "bg-slate-50 border-slate-200/50 hover:border-indigo-300"
                      }`}>
                        <span className={`text-[10px] font-bold block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{policy.num}</span>
                        <h5 className={`text-sm md:text-base font-extrabold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>{policy.title}</h5>
                        <p className={`text-xs md:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{policy.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 의장 슬로건 */}
                  <div className={`p-5 rounded-xl border text-center transition-all duration-300 ${
                    isDark ? "bg-slate-900/50 border-white/5" : "bg-slate-100/50 border-slate-200/50"
                  }`}>
                    <p className={`text-xs md:text-sm font-semibold italic ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      &ldquo;시민행복 최우선, 책임 의정으로 더 나은 남양주의 내일을 열겠습니다.&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {activeProposalTab === 2 && (
                <motion.div
                  key="proposal-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      제2안 : [현장 실천형] 행동과 성과 중심 체계
                    </h4>
                    <p className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      실무 부서의 고민이 녹아든 현장성과 정책적 대안을 강조한 안
                    </p>
                  </div>

                  {/* 대표 구호 (Bento Slogan Card) */}
                  <div className={`p-8 rounded-2xl text-center border transition-all duration-300 ${
                    isDark 
                      ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20" 
                      : "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/60"
                  }`}>
                    <span className={`text-[10px] uppercase tracking-widest font-extrabold block mb-2 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                      대표 의정구호
                    </span>
                    <h2 className={`text-lg md:text-2xl font-black leading-snug tracking-tight ${isDark ? "text-emerald-200" : "text-emerald-900"}`}>
                      &ldquo;현장에서 듣고, 정책으로 답하는 남양주시의회&rdquo;
                    </h2>
                  </div>

                  {/* 핵심 방침 (Bento Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        num: "방침 1",
                        title: "행동하는 현장",
                        desc: "형식 위주를 탈피하여 민생 현장에서 직접 대안을 발굴하는 의정"
                      },
                      {
                        num: "방침 2",
                        title: "실천하는 정책",
                        desc: "조례 제개정 등 실질적인 제도적 성과로 실력을 증명하는 의회"
                      },
                      {
                        num: "방침 3",
                        title: "신뢰받는 책임",
                        desc: "공명정대하고 투명한 의정활동을 통해 시민의 신뢰를 확보하는 의회"
                      }
                    ].map((policy, i) => (
                      <div key={i} className={`p-5 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? "bg-white/3 border-white/5 hover:border-emerald-500/30" 
                          : "bg-slate-50 border-slate-200/50 hover:border-emerald-300"
                      }`}>
                        <span className={`text-[10px] font-bold block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{policy.num}</span>
                        <h5 className={`text-sm md:text-base font-extrabold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>{policy.title}</h5>
                        <p className={`text-xs md:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{policy.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 의장 슬로건 */}
                  <div className={`p-5 rounded-xl border text-center transition-all duration-300 ${
                    isDark ? "bg-slate-900/50 border-white/5" : "bg-slate-100/50 border-slate-200/50"
                  }`}>
                    <p className={`text-xs md:text-sm font-semibold italic ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      &ldquo;시민 곁에서 듣고, 현장에서 답하며, 남양주의 더 큰 내일을 열겠습니다!&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {activeProposalTab === 3 && (
                <motion.div
                  key="proposal-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      제3안 : [시민 주권형] 민의 수렴 & 대변 체계
                    </h4>
                    <p className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      의회의 본질인 민의 수렴과 시민이 주인이 되는 의회상 정립에 초점을 맞춘 안
                    </p>
                  </div>

                  {/* 대표 구호 (Bento Slogan Card) */}
                  <div className={`p-8 rounded-2xl text-center border transition-all duration-300 ${
                    isDark 
                      ? "bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20" 
                      : "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/60"
                  }`}>
                    <span className={`text-[10px] uppercase tracking-widest font-extrabold block mb-2 ${isDark ? "text-amber-400" : "text-amber-700"}`}>
                      대표 의정구호
                    </span>
                    <h2 className={`text-lg md:text-2xl font-black leading-snug tracking-tight ${isDark ? "text-amber-200" : "text-amber-900"}`}>
                      &ldquo;시민의 목소리로 변화를 만드는 남양주시의회&rdquo;
                    </h2>
                  </div>

                  {/* 핵심 방침 (Bento Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        num: "방침 1",
                        title: "시민 중심 소통",
                        desc: "문턱을 낮추고 온·오프라인 소통 채널을 활성화하는 열린 참여 의회"
                      },
                      {
                        num: "방침 2",
                        title: "공감하는 민생",
                        desc: "취약계층 안전망 구축 및 소외 없는 균형 발전을 도모하는 상생 의정"
                      },
                      {
                        num: "방침 3",
                        title: "결과 증명 책임",
                        desc: "시민이 체감할 수 있는 긍정적인 지역 변화로 보답하는 책임 의회"
                      }
                    ].map((policy, i) => (
                      <div key={i} className={`p-5 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? "bg-white/3 border-white/5 hover:border-amber-500/30" 
                          : "bg-slate-50 border-slate-200/50 hover:border-amber-300"
                      }`}>
                        <span className={`text-[10px] font-bold block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{policy.num}</span>
                        <h5 className={`text-sm md:text-base font-extrabold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>{policy.title}</h5>
                        <p className={`text-xs md:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{policy.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 의장 슬로건 */}
                  <div className={`p-5 rounded-xl border text-center transition-all duration-300 ${
                    isDark ? "bg-slate-900/50 border-white/5" : "bg-slate-100/50 border-slate-200/50"
                  }`}>
                    <p className={`text-xs md:text-sm font-semibold italic ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      &ldquo;시민의 목소리를 경청하고 책임 있는 실천으로 신뢰받는 의회가 되겠습니다.&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {activeProposalTab === 4 && (
                <motion.div
                  key="proposal-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Table header with custom search bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                        📋 내부 직원 공모 내역 원본 (총 16건)
                      </h4>
                      <p className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        제10대 의회 비전 수립 공모에 접수된 부서별 제출 안 목록 데이터 전체를 표출합니다.
                      </p>
                    </div>

                    {/* Simple Search Input within the tab */}
                    <div className="relative max-w-xs w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={proposalSearchQuery}
                        onChange={(e) => setProposalSearchQuery(e.target.value)}
                        placeholder="이름, 구호, 방침 검색..."
                        className={`w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium ${
                          isDark 
                            ? "border-white/10 bg-white/5 placeholder-slate-500 text-white" 
                            : "border-slate-200 bg-white placeholder-slate-400 text-slate-800 shadow-xs"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200/10 shadow-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`text-xs font-bold uppercase tracking-wider border-b ${
                          isDark 
                            ? "bg-white/5 text-white divide-x divide-white/5 border-white/10" 
                            : "bg-slate-100 text-slate-700 divide-x divide-slate-200 border-slate-200"
                        }`}>
                          <th className="p-3 w-12 text-center">No.</th>
                          <th className="p-3 w-32">제안자</th>
                          <th className="p-3 w-48">의정구호</th>
                          <th className="p-3 w-56">의정방침</th>
                          <th className="p-3">의정슬로건 / 참고</th>
                        </tr>
                      </thead>
                      <tbody className={`text-xs divide-y ${
                        isDark ? "text-slate-300 divide-white/5" : "text-slate-600 divide-slate-200"
                      }`}>
                        {filteredSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-10 text-center font-medium text-slate-400">
                              검색 결과와 일치하는 제안 내역이 없습니다.
                            </td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((s) => (
                            <tr key={s.no} className={isDark ? "hover:bg-white/5" : "hover:bg-slate-50"}>
                              <td className="p-3 text-center font-bold">{s.no}</td>
                              <td className="p-3 font-semibold">
                                <div className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                                  {highlightProposalText(s.author, proposalSearchQuery)}
                                </div>
                                <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{s.dept}</div>
                              </td>
                              <td className="p-3 font-medium leading-relaxed">
                                {renderMultilineText(s.motto, proposalSearchQuery)}
                              </td>
                              <td className="p-3 font-medium leading-relaxed">
                                {renderMultilineText(s.policies, proposalSearchQuery)}
                              </td>
                              <td className="p-3 leading-relaxed">
                                {renderMultilineText(s.slogan, proposalSearchQuery)}
                                {s.memo && (
                                  <div className="mt-1.5">
                                    <span className="inline-block bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/20">
                                      {highlightProposalText(s.memo, proposalSearchQuery)}
                                    </span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stacked Card View */}
                  <div className="lg:hidden space-y-4">
                    {filteredSubmissions.length === 0 ? (
                      <div className="p-8 text-center font-medium text-slate-400 border border-dashed border-slate-200/20 rounded-2xl">
                        검색 결과와 일치하는 제안 내역이 없습니다.
                      </div>
                    ) : (
                      filteredSubmissions.map((s) => (
                        <div key={s.no} className={`p-4 rounded-xl border text-xs space-y-3 ${
                          isDark ? "bg-white/3 border-white/5" : "bg-slate-50 border-slate-200/50"
                        }`}>
                          <div className="flex items-center justify-between border-b border-dashed border-slate-200/15 pb-2">
                            <span className="font-extrabold text-indigo-400">제안 No. {s.no}</span>
                            <div className="text-right">
                              <span className={`font-extrabold block ${isDark ? "text-white" : "text-slate-800"}`}>
                                {highlightProposalText(s.author, proposalSearchQuery)}
                              </span>
                              <span className={`text-[9px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{s.dept}</span>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 block mb-1">의정 구호</span>
                            <p className={`font-semibold leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                              {renderMultilineText(s.motto, proposalSearchQuery)}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-slate-500 block mb-1">의정 방침</span>
                            <p className={`leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                              {renderMultilineText(s.policies, proposalSearchQuery)}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-slate-500 block mb-1">의정 슬로건 / 참고</span>
                            <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {renderMultilineText(s.slogan, proposalSearchQuery)}
                            </p>
                            {s.memo && (
                              <div className="mt-1">
                                <span className="inline-block bg-rose-500/10 text-rose-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-500/20">
                                  {highlightProposalText(s.memo, proposalSearchQuery)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* ==================== 일반 의회 및 10대 기본 의정비교 UI ==================== */
        <>
          <div className={`border-t-0 overflow-hidden shadow-2xl transition-all duration-300 ${
            isDark 
              ? "glass-card-dark rounded-b-3xl shadow-black/20" 
              : "glass-card-light rounded-b-3xl shadow-slate-200/50"
          }`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x transition-all duration-300 ${
              isDark ? "divide-white/10" : "divide-slate-200/80"
            }`}>
              {/* First Half Panel */}
              <div className={`${filterMode === "second" ? "hidden" : "block"} md:block`}>
                {renderHalfCard("first", halves.first, "indigo")}
              </div>

              {/* Second Half Panel */}
              <div className={`${filterMode === "first" ? "hidden" : "block"} md:block`}>
                {renderHalfCard("second", halves.second, "emerald")}
              </div>
            </div>
          </div>

          {/* Historical Context Info box */}
          <motion.div
            key={assembly.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 p-5 rounded-2xl border flex gap-4 shadow-lg backdrop-blur-md transition-all duration-300 ${
              isDark 
                ? "bg-white/5 border-white/10 text-slate-300" 
                : "bg-slate-50 border-slate-200/80 text-slate-600"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
              isDark 
                ? "bg-white/5 border-white/10 text-indigo-300" 
                : "bg-indigo-50 border-indigo-100/80 text-indigo-600"
            }`}>
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-xs font-black uppercase tracking-wider transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>
                배경 설명
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed font-medium transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {context}
              </p>
            </div>
          </motion.div>
        </>
      )}

      {/* ==================== PDF 저장용 인쇄용 템플릿 (Offscreen) ==================== */}
      <div 
        id="printable-assembly-report"
        className="absolute top-[-9999px] left-[-9999px] w-[800px] bg-white p-10 text-slate-800 space-y-8 leading-relaxed rounded-md"
        style={{ fontFamily: "'Inter', 'Malgun Gothic', 'Dotum', sans-serif" }}
      >
        {/* Header Block */}
        <div className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Namyangju City Council Historical Archive</span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">남양주시의회 의정 활동 요약 보고서</h1>
          </div>
          <div className="text-right text-[10px] text-slate-400 font-medium">
            발행일: {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>

        {/* Assembly Meta Card */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{assembly.title} 남양주시의회</h2>
            <p className="text-xs text-slate-500 mt-1">임기: {assembly.period} | 분류: {assembly.phase}</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-4 py-1.5 rounded-full text-xs">
            정식 기록 대장
          </div>
        </div>

        {/* Core Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. 의회 개요 및 시대적 특징</h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            {assembly.context}
          </p>
        </div>

        {/* Performance Split Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. 전·후반기 의정 운영 성과</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* First Half */}
            <div className="p-5 border border-slate-200 rounded-xl space-y-4">
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md">전반기</span>
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold block">역대 의장</span>
                <span className="font-extrabold text-sm text-slate-800">{assembly.halves.first.speaker || "(공란)"}</span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold block">의정 구호</span>
                <p className="font-bold text-xs text-slate-900">&ldquo;{assembly.halves.first.motto || "없음"}&rdquo;</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold block">의장 슬로건</span>
                <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{assembly.halves.first.slogan || "없음"}&rdquo;</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold block">핵심 의정 방침</span>
                <ul className="space-y-1">
                  {assembly.halves.first.policies.map((p, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Second Half */}
            <div className="p-5 border border-slate-200 rounded-xl space-y-4">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md">후반기</span>
              {(!assembly.halves.second.speaker && !assembly.halves.second.motto) ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-2">
                  <span className="text-slate-400 text-xs font-semibold">후반기 임기 예정</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">
                    2028년 7월 개원 후 개시 예정이며 의정 활동 개시 후 실시간 등재됩니다.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block">역대 의장</span>
                    <span className="font-extrabold text-sm text-slate-800">{assembly.halves.second.speaker}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block">의정 구호</span>
                    <p className="font-bold text-xs text-slate-900">&ldquo;{assembly.halves.second.motto}&rdquo;</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block">의장 슬로건</span>
                    <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{assembly.halves.second.slogan}&rdquo;</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold block">핵심 의정 방침</span>
                    <ul className="space-y-1">
                      {assembly.halves.second.policies.map((p, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Special Vision Section (Only for 10th Assembly) */}
        {assembly.id === "10" && (
          <div className="space-y-4 border-t border-dashed border-slate-200 pt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. 제10대 의정비전 보고서 특화 정보</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[9px] font-extrabold text-indigo-600 block mb-1">제1안: 종합 비전 [대표 의정구호]</span>
                <p className="font-extrabold text-sm text-slate-900 mb-2">&ldquo;시민과 함께하는 오늘, 미래를 여는 남양주시의회&rdquo;</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-700 block">소통과 열린 의정</span>
                    <span className="text-[11px] text-slate-500">시민의 목소리 경청 및 정책화</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">현장 중심 민생</span>
                    <span className="text-[11px] text-slate-500 font-normal">민생 경제와 실질적 삶 개선</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">미래 지향 혁신</span>
                    <span className="text-[11px] text-slate-500">지속 가능한 성장 과제 준비</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[9px] font-extrabold text-emerald-600 block mb-1">제2안: 현장 실천형 [행동과 성과]</span>
                <p className="font-extrabold text-sm text-slate-900 mb-2">&ldquo;현장에서 듣고, 정책으로 답하는 남양주시의회&rdquo;</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-700 block">행동하는 현장</span>
                    <span className="text-[11px] text-slate-500">민생 현장 직간접 대안 발굴</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">실천하는 정책</span>
                    <span className="text-[11px] text-slate-500">조례 등 실질적 성과로 증명</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">신뢰받는 책임</span>
                    <span className="text-[11px] text-slate-500 font-normal font-sans">공명정대한 의정 활동 신뢰 확보</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[9px] font-extrabold text-amber-600 block mb-1">제3안: 시민 주권형 [민의 수렴과 대변]</span>
                <p className="font-extrabold text-sm text-slate-900 mb-2">&ldquo;시민의 목소리로 변화를 만드는 남양주시의회&rdquo;</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-700 block">시민 중심 소통</span>
                    <span className="text-[11px] text-slate-500">문턱 낮춘 온오프 소통 활성화</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">공감하는 민생</span>
                    <span className="text-[11px] text-slate-500">소외 없는 균형 발전 도모</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-700 block">결과 증명 책임</span>
                    <span className="text-[11px] text-slate-500">시민 체감 가능한 긍정적 변화</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Footer Stamp */}
        <div className="border-t border-slate-200 pt-6 flex justify-between items-center text-[10px] text-slate-400">
          <div>
            <span>남양주시의회 의정 보존 시스템 • 본 문서는 공식 의정 기록입니다.</span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-red-500/30 flex items-center justify-center font-bold text-red-500/50 text-[9px] uppercase tracking-wider rotate-[-12deg] flex-shrink-0">
            N.Y.J Stamp
          </div>
        </div>
      </div>
    </div>
  );
}
