export interface HalfData {
  speaker: string;
  term: string;
  motto: string;
  slogan: string;
  policies: string[];
  chartData: (number | null)[];
}

export interface AssemblyItem {
  id: string;
  title: string;
  period: string;
  phase: string;
  phaseColor: string;
  context: string;
  halves: {
    first: HalfData;
    second: HalfData;
  };
}

export const assemblyData: AssemblyItem[] = [
  {
    id: "1",
    title: "제1대",
    period: "1991.04 ~ 1995.06",
    phase: "지방자치 제도수립기",
    phaseColor: "bg-blue-50 text-blue-800 border-blue-200",
    context: "1991년 지방자치 전격 재개로 미금시의회 및 남양주군의회가 설치된 시기입니다. 풀뿌리 민주 대의기구의 기초 골격을 조율하는 과정이 주를 이루었습니다.",
    halves: {
      first: {
        speaker: "이주양 의장",
        term: "1991.04 ~ 1993.04",
        motto: "민주 의정의 기틀 정립",
        slogan: "초대 기초의회의 자치 기반 조성",
        policies: ["주민 대의원제 대표성 확립", "초기 자치 법규 제정 및 규범 정비", "지방 행정의 민주적 감시 개시"],
        chartData: [85, 20, 10]
      },
      second: {
        speaker: "김현덕 의장",
        term: "1993.04 ~ 1995.06",
        motto: "기초의회의 자치 기반 완성",
        slogan: "의회 위상 확립과 집행부 감시 역량 강화",
        policies: ["의회 사무국 체제 정비", "생산적인 행정 사무감사 틀 확립", "도농통합 남양주시 출범 대비"],
        chartData: [80, 25, 15]
      }
    }
  },
  {
    id: "2",
    title: "제2대",
    period: "1995.07 ~ 1998.06",
    phase: "통합도시 안정기",
    phaseColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    context: "미금시와 남양주군이 완전 통합하여 출범한 복합 행정구역의 안정기입니다. 지역 갈등을 차단하고 행정 효율성을 담보하는 통합 조례 정비가 주요 목표였습니다.",
    halves: {
      first: {
        speaker: "이문학 의장",
        term: "1995.07 ~ 1997.01",
        motto: "도농 통합과 복합도시 균형 발전",
        slogan: "행정 구역 개편 조속 조율 및 도농 갈등 해소",
        policies: ["권역별 균형 인프라 조성", "도농 간 격차 최소화를 위한 조례", "시민 통합 유도 정책 입안"],
        chartData: [75, 40, 20]
      },
      second: {
        speaker: "신동근 의장",
        term: "1997.01 ~ 1998.06",
        motto: "하나 된 남양주, 균형 자치",
        slogan: "구석구석 발전하는 통합 복합도시 구현",
        policies: ["통합 시청사 운영 정상화 지원", "권역별 주민 편익시설 균형 안착", "공익 우선의 시정 견제 장치 확립"],
        chartData: [70, 45, 25]
      }
    }
  },
  {
    id: "3",
    title: "제3대",
    period: "1998.07 ~ 2002.06",
    phase: "실리 의정 및 경제구조 수립기",
    phaseColor: "bg-teal-50 text-teal-800 border-teal-200",
    context: "IMF 국가 금융 위기 속에서 효율성과 내실을 극대화하던 긴축 재정 모니터링 시기입니다.",
    halves: {
      first: {
        speaker: "김영수 의장",
        term: "1998.07 ~ 2000.06",
        motto: "구민과 함께하는 생산적 경제 의회",
        slogan: "예산 절감과 세출 최적화를 통한 세정 수호",
        policies: ["재정 운영의 투명성 및 건전성 제고", "행정 비효율 장치 강제 개혁", "시민 권익 우선 구제"],
        chartData: [65, 30, 30]
      },
      second: {
        speaker: "안상남 의장",
        term: "2000.07 ~ 2002.06",
        motto: "효율성 중심 실리 의정",
        slogan: "불필요한 전시성 행정의 강력 퇴출",
        policies: ["합리적 조례 정비 및 긴축 입법", "예산 낭비 차단 전문 감시단 구성", "소수 소외 계층 권익 보호"],
        chartData: [60, 35, 35]
      }
    }
  },
  {
    id: "4",
    title: "제4대",
    period: "2002.07 ~ 2006.06",
    phase: "대개발 및 민생 인프라 확충기",
    phaseColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    context: "퇴계원, 화도, 와부 등 대규모 택지개발과 신규 아파트 단지 입주에 따라 급증한 도시 민원을 소화하기 시작한 민생 확장 단계입니다.",
    halves: {
      first: {
        speaker: "이주양 의장",
        term: "2002.07 ~ 2004.06",
        motto: "생활 밀착형 참여 의정 실현",
        slogan: "신구 입주 주민 간 소통의 창구 구축",
        policies: ["유입 인구 주거 불안 해소 대책", "민의 소통실 상시적 개방", "생활 안전망 구축 가이드라인 정비"],
        chartData: [45, 75, 50]
      },
      second: {
        speaker: "윤재수 의장",
        term: "2004.07 ~ 2006.06",
        motto: "발로 뛰는 현장 의정",
        slogan: "공사 현장 및 민원 지를 몸소 확인하는 의회",
        policies: ["난개발 차단을 위한 조례 강화", "유입 인구 교통 거버넌스 긴급 수립", "투명한 건설 분야 예산 승인"],
        chartData: [40, 80, 55]
      }
    }
  },
  {
    id: "5",
    title: "제5대",
    period: "2006.07 ~ 2010.06",
    phase: "전문성 및 지방의회 유급제 시기",
    phaseColor: "bg-green-50 text-green-800 border-green-200",
    context: "의원 유급제가 최초로 도입되면서, 주먹구구식 대변을 탈피하고 전문성과 상근 입법 분석력을 요구받던 대전환기입니다.",
    halves: {
      first: {
        speaker: "김영수 의장",
        term: "2006.07 ~ 2008.06",
        motto: "전문성 강화를 통한 책임 의정",
        slogan: "정책 대안을 공식 설계할 수 있는 실력 있는 의원상 정립",
        policies: ["입법 정책 아카데미 정기 개소", "의정 활동 투명 공개 제정", "시민 정책 패널 피드백 시스템"],
        chartData: [35, 70, 45]
      },
      second: {
        speaker: "이공희 의장",
        term: "2008.07 ~ 2010.06",
        motto: "시민과 함께 숨 쉬는 의회",
        slogan: "지방자치 한계 타파와 실질적 풀뿌리 현장 정립",
        policies: ["기초자치 권한 훼손에의 입법 저항", "민생 사각지대 및 약자 중심 조례 제정", "권한 남용을 차단하는 자치 입법"],
        chartData: [30, 75, 50]
      }
    }
  },
  {
    id: "6",
    title: "제6대",
    period: "2010.07 ~ 2014.06",
    phase: "대도시 보건 복지 고도화기",
    phaseColor: "bg-sky-50 text-sky-800 border-sky-200",
    context: "남양주시 인구가 공식 50만 명을 초과하며 중견 메가시티로 도약함에 따라 대도시 복지망 확충에 몰두한 시기입니다.",
    halves: {
      first: {
        speaker: "이정애 의장",
        term: "2010.07 ~ 2012.06",
        motto: "시민의 목소리를 경청하는 대변 의회",
        slogan: "여성 리더십을 기반으로 한 온기 있는 밀착형 복지 설계",
        policies: ["보편적 초등 무상급식 조례 정합 조정", "보건 복지 사각지대 전수조사 조례", "정치 대립 지양 상생 협치 프레임"],
        chartData: [25, 85, 60]
      },
      second: {
        speaker: "공명식 의장",
        term: "2012.07 ~ 2014.06",
        motto: "민의를 대변하는 일하는 의회",
        slogan: "집행부에 의지하지 않는 독자 정책 개발",
        policies: ["보육 시설 지원 조례 개선 수립", "소규모 골목상권 보증 입법 촉진", "도시 인프라 격차 실질 균형 배정"],
        chartData: [20, 90, 65]
      }
    }
  },
  {
    id: "7",
    title: "제7대",
    period: "2014.07 ~ 2018.06",
    phase: "교통 주거 신도시 통합기",
    phaseColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    context: "다산신도시 조성 및 별내·진접의 대규모 정주 여건 정비가 완료되면서, 교통난 해소와 교육 공간 확보 등 대형 인프라 구축의 분수령이 된 시기입니다.",
    halves: {
      first: {
        speaker: "이철우 의장",
        term: "2014.07 ~ 2016.06",
        motto: "현장 소통을 통한 민의 구현",
        slogan: "답은 현장에 있다, 기획 조사식 감사 시스템 가동",
        policies: ["신도시 입주 긴급 민원 대안 수립", "대중교통 노선 확충 대집행 감시", "안전 안심 자생적 안전조례 입안"],
        chartData: [20, 85, 70]
      },
      second: {
        speaker: "박유희 의장",
        term: "2016.07 ~ 2018.06",
        motto: "시민과 소통하는 열린 의회",
        slogan: "시민 편익을 위한 낮은 소통, 열린 회의 구현",
        policies: ["100만 수도권 중심도시 인프라 선제 대응", "다목적 문화 체육 공간 확보 조례", "시민 공청회 상시화 규범 입법"],
        chartData: [15, 90, 75]
      }
    }
  },
  {
    id: "8",
    title: "제8대",
    period: "2018.07 ~ 2022.06",
    phase: "지방분권 자치혁신기",
    phaseColor: "bg-purple-50 text-purple-800 border-purple-200",
    context: "지방자치법 전부 개정 논의와 함께 자치분권 2.0 시대를 능동적으로 대비하고, 코로나19 팬데믹 재난 위기를 함께 극복하던 고강도 위기 대응 시기입니다.",
    halves: {
      first: {
        speaker: "신민철 의장",
        term: "2018.07 ~ 2020.06",
        motto: "시민의 삶을 바꾸는 든든한 의회",
        slogan: "주민 삶의 변화를 체감시키는 강력한 자치 혁신",
        policies: ["정책 제안 연구 단체 입법적 법제화", "시민 자치위원회 실질 가동 조례", "일자리 연계 산업단지 정비 지원"],
        chartData: [10, 75, 85]
      },
      second: {
        speaker: "이철영 의장",
        term: "2020.07 ~ 2022.06",
        motto: "시민의 행복을 만드는 활기찬 의회",
        slogan: "코로나19 사각지대 소상공인 회복 최우선 연대",
        policies: ["소상공인 긴급 재난 지원 조례", "의회 비대면 하이브리드 의정 구현", "지방자치법 개정에 따른 독립 청사 준비"],
        chartData: [10, 80, 90]
      }
    }
  },
  {
    id: "9",
    title: "제9대",
    period: "2022.07 ~ 2026.06",
    phase: "인사권 독립 및 상생협치기",
    phaseColor: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    context: "지방의회 인사권의 실질적 독립 원년을 맞아, 한층 강화된 집행부 감시 및 진정한 대안 협치를 시도한 자율 의정 시기입니다.",
    halves: {
      first: {
        speaker: "김현택 의장",
        term: "2022.07 ~ 2024.06",
        motto: "의회다운 의회, 시민과 함께 합니다",
        slogan: "강한 의회, 독립된 입법 전문가다운 견제력 입증",
        policies: ["실질적 인사권 독립 기구 완비", "민생 안정 특별 TF 구성", "집행부의 선심성 예산 제로 컷"],
        chartData: [5, 65, 100]
      },
      second: {
        speaker: "조성대 의장",
        term: "2024.07 ~ 2026.06",
        motto: "시민과 소통하는 의회, 시민과 함께하는 의회",
        slogan: "현장에서 소통하고, 상생 협력하며 100만 대도시 완성",
        policies: ["현장 중심 정책 민원 소통실 상설화", "경기동북부 거점 공공의료원 등 유치 추진 지원", "100만 자족기능 중심 미래 철도망 확충 입법"],
        chartData: [5, 70, 110]
      }
    }
  },
  {
    id: "10",
    title: "제10대",
    period: "2026.07 ~ 2030.06",
    phase: "시민주권 및 헌법 자치 완성기",
    phaseColor: "bg-rose-50 text-rose-800 border-rose-200",
    context: "2026년 6월 지방선거 직후 새롭게 개원한 미래 세대 의회입니다. 민선 9기 최현덕 시정부의 '시민주권시대 남양주 대전환' 기조에 맞춰, 주권자인 시민과 함께 정책을 설계하는 '건설적 동반자' 모델을 선언했습니다.",
    halves: {
      first: {
        speaker: "제10대 전반기 의장단",
        term: "2026.07 ~ 2028.06",
        motto: "시민이 주인되는 의회, 주권자와 함께 여는 남양주의 내일",
        slogan: "시민의 목소리로 바로 서는 의회, 시민주권시대 시정의 든든한 동반자",
        policies: ["시민주권 실현을 위한 상시적 소통과 협치 강화", "헌법적 가치와 기본권 보장을 선도하는 민생 입법", "메가시티 도약을 위한 합리적 견제와 생산적 정책 동행"],
        chartData: [5, 75, 120]
      },
      second: {
        speaker: "",
        term: "2028.07 ~ 2030.06",
        motto: "",
        slogan: "",
        policies: [],
        chartData: [null, null, null]
      }
    }
  }
];
