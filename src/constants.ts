import { Question } from './types';

export const INITIAL_QUESTIONS: Question[] = [
  { id: 1, type: 'likert', text: '나는 새로운 인공지능(AI) 기술이나 도구를 배우는 데 적극적으로 노력하고 있다.', points: 5 },
  { id: 2, type: 'likert', text: '나는 AI 관련 학습이 나의 진로 또는 전공 역량 향상에 도움이 된다고 생각한다.', points: 5 },
  { id: 3, type: 'likert', text: 'AI 도구(예: Chat GPT, Colilot 등) 유료버전을 사용해 학습이나 과제 수행에 활용할 의향이 있다.', points: 5 },
  { id: 4, type: 'likert', text: 'AI 도움을 받더라도 스스로 사고하고 검증하려고 노력하고 있다.', points: 5 },
  { id: 5, type: 'likert', text: 'AI를 사용할 때 저작권, 개인정보, 편향 문제 등 윤리적 책임을 준수하고 있다.', points: 5 },
  { 
    id: 6, 
    type: 'multiple', 
    text: '다음 중 ‘컴퓨팅 사고(Computational Thinking)’에 대한 올바른 설명을 고르시오. [SW기초]', 
    options: ['컴퓨터의 물리적 구조를 학습하고 효과를 높이기 위한 노력', '컴퓨터가 정보를 처리하는 방식을 관찰하고 생활에 적용하는 사고 방법', '컴퓨터처럼 문제를 논리적이고 체계적으로 해결하는 과정', '컴퓨터를 항상 사용할 수 있도록 수리하고 유지보수하는 일련의 과정'], 
    correctAnswer: 3,
    points: 2 
  },
  { 
    id: 7, 
    type: 'multiple', 
    text: '다음 중 컴퓨팅 사고를 배우면 얻을 수 있는 이점으로 적절하지 않은 것을 고르시오. [SW기초]', 
    options: ['주어진 문제를 단계적으로 나눌 수 있다.', '컴퓨터의 물리적 조립 방법을 이해할 수 있다.', '논리적으로 문제를 해결하는 법을 배울 수 있다.', '효율적인 소프트웨어 설계를 이해할 수 있다.'], 
    correctAnswer: 2,
    points: 2 
  },
  
  { 
    id: 8, 
    type: 'multiple', 
    text: '다음 중 ‘알고리즘(Algorithm)’의 대한 올바른 정의를 고르시오. [SW기초]', 
    options: ['컴퓨터 하드웨어를 제어하기 위한 절차와 방식', '문제 해결하기 위한 단계적 절차나 명령의 집합', '컴퓨터를 작동하기 위한 기본 명령어들의 모음', '데이터베이스에서 데이터를 조회하는 처리 과정'], 
    correctAnswer: 2,
    points: 2 
  },
  { 
    id: 9, 
    type: 'multiple', 
    text: '다음 중 프로그래밍의 정의로 알맞은 것을 고르시오. [SW기초]', 
    options: ['컴퓨터에게 적절한 명령을 내려 문제를 해결하는 것', '컴퓨터를 조립하는 기술을 배우는 것', '소프트웨어를 순차적으로 사용하는 방법을 배우는 것', '데이터를 저장하는 하드웨어를 관리하는 것'], 
    correctAnswer: 1,
    points: 2 
  },
  { 
    id: 10, 
    type: 'multiple', 
    text: '다음 중 프로그래밍 언어의 역할로 가장 적절한 것을 고르시오. [SW기초]', 
    options: ['컴퓨터가 이해하는 형식으로 명령과 작업을 표현하는 언어', '인간의 아이디어를 컴퓨터에 직접 입력해 실행하도록 하는 음성 언어 ', '컴퓨터 하드웨어 구조를 직접 설정하거나 변경하도록 지시하는 전문 언어', '인간의 자연어를 특별한 변환 없이 컴퓨터가 이해하도록 처리 언어'], 
    correctAnswer: 1,
    points: 2 
  },
  { 
    id: 11, 
    type: 'multiple', 
    text: '다음 중 프로그래밍 언어의 공통 요소에 해당하지 않는 것을 고르시오. [알고리즘]', 
    options: ['변수', '연산자', '조건문', '그래픽 인터페이스'], 
    correctAnswer: 4,
    points: 4 
  },
  { 
    id: 12, 
    type: 'multiple', 
    text: '다음 중 문제를 해결하기 위한 절차(순서)가 올바르게 구성된 것을 고르시오. [알고리즘]', 
    options: ['문제를 해결한 후 원인을 파악한다. → 해결 방법을 정한다. → 문제를 인식한다.', '문제를 인식한다. → 해결 방법을 정한다. → 해결 과정을 실행한다.', '해결 방법을 정한다. → 결과를 평가한다. → 문제를 인식한다.', '해결 과정을 실행한다. → 문제를 인식한다. → 해결 방법을 정한다.'], 
    correctAnswer: 2,
    points: 4 
  },
  { 
    id: 13, 
    type: 'multiple', 
    text: '다음 중 조건문(if)의 개념과 가장 가까운 일상 사례를 고르시오. [알고리즘]', 
    options: ['집에서 학교 가는 방법은 버스만 탈 수 있고 교통카드를 가지고 가야한다.', '나와 우리 가족은 매일 같은 시간에 기상하고 아침식사를 한다.', '친구에게 인사를 하고 나서 커피를 마신다.', '시험 점수가 60점 이상이면 합격, 아니면 불합격으로 나눈다.'], 
    correctAnswer: 4,
    points: 4 
  },
  { 
    id: 14, 
    type: 'multiple', 
    text: '다음 중 반복문(Loop)의 개념을 가장 잘 설명한 것을 고르시오.  [알고리즘]', 
    options: ['여러 번의 과정을 반복하여 효율을 높인다.', '한번 수행된 명령은 다시 실행되지 않는다.', '모든 조건을 한 번만 검사한다.', '여러 개의 명령어를 순서와 상관없이 실행한다.'], 
    correctAnswer: 1,
    points: 4 
  },
  { 
    id: 15, 
    type: 'multiple', 
    text: '다음 중 데이터 문해력(Data Literacy)의 정의로 알맞은 것을 고르시오. [데이터 기초]', 
    options: ['데이터를 저장하고 백업할 수 있는 능력', '데이터를 읽고, 이해하고 활용할 수 있는 능력', '데이터를 수정하고, 삭제하고 관리할 수 있는 능력', '데이터를 클라우드에 업로드하는 능력'], 
    correctAnswer: 2,
    points: 4 
  },
  { 
    id: 16, 
    type: 'multiple', 
    text: '다음 중 빅데이터 3V에 해당하지 않는 것을 고르시오. [데이터 기초]', 
    options: ['Volume', 'Velocity', 'Value', 'Variety'], 
    correctAnswer: 3,
    points: 4 
  },
  { 
    id: 17, 
    type: 'multiple', 
    text: '다음 중 SQL 사용의 주된 목적으로 알맞은 것을 고르시오. [데이터 기초]', 
    options: ['데이터베이스에서 데이터 보안을 위해', '데이터베이스에서 데이터 시각화를 위해', '데이터베이스에서 데이터를 가져오기 위해', '데이터베이스 전체 설계를 구상하기 위해'], 
    correctAnswer: 3,
    points: 4 
  },
  { 
    id: 18, 
    type: 'multiple', 
    text: '다음 중 SQL에서 데이터를 가져오는 기본 구문을 고르시오. [데이터 기초]', 
    options: ['INSERT ', 'UPDATE', 'DELETE', 'SELECT'], 
    correctAnswer: 4,
    points: 4
  },
  { 
    id: 19, 
    type: 'multiple', 
    text: '다음 중 SQL에서 WHERE 절을 사용하는 목적으로 알맞은 것을 고르시오. [데이터 기초]', 
    options: ['데이터를 필터링하기 위해', '데이터를 정렬하기 위해', '데이터를 삽입하기 위해', '데이터를 삭제하기 위해'], 
    correctAnswer: 1,
    points: 4 
  },
  { 
    id: 20, 
    type: 'multiple', 
    text: '다음 중 ‘AI’의 약자를 풀어 쓴 표현으로 적절한 것을 고르시오.[AI 개념]', 
    options: ['Automated Information', 'Advanced Interface', 'Artificial Intelligence', 'Algorithm Integration'], 
    correctAnswer: 3,
    points: 4 
  },
  { 
    id: 21, 
    type: 'multiple', 
    text: '다음의 문제를 해결하기 위한 기계 학습 방식을 고르시오.[AI 개념] (A 백화점에서 고객의 과거 구매 기록(나이, 구매 횟수, 지출액)을 바탕으로 해당 고객이 VIP 고객인지 일반 고객인지를 예측하는 모델을 만들려고 합니다. 모델 훈련 시, 과거에 분류된 고객 데이터(VIP 여부가 표시됨)를 사용합니다.)',
    options: ['강화 학습 (Reinforcement Learning)', '지도 학습 (Supervised Learning)', '전이 학습 (Transfer Learning)', '비지도 학습 (Unsupervised Learning)'], 
    correctAnswer: 2,
    points: 4 
  },
  { 
    id: 22, 
    type: 'multiple', 
    text: '다음 중 기계 학습의 회귀 분석(Regression)으로 처리하는 것이 가장 적절한 사례를 고르시오. [AI 개념]', 
    options: ['고객에게 오는 이메일을 분석하여, 해당 이메일이 "스팸(Spam)"인지 "정상 메일(Ham)"인지를 자동으로 판별하여 분류', '뉴스 기사 본문을 입력받아 해당 기사가 "정치", "경제", "스포츠" 중 어느 범주에 속하는지 예측', '온라인 쇼핑몰 사용자들의 웹사이트 방문 기록과 클릭 패턴을 분석하여, 사용자를 성향이 비슷한 그룹으로 설정', '주택의 면적, 방 개수, 건축 연도, 위치 등의 정보를 입력받아 해당 주택의 판매 예상 가격을 예측'], 
    correctAnswer: 4,
    points: 4 
  },
  { 
    id: 23, 
    type: 'multiple', 
    text: '다음 중 AI도구 활용의 윤리적 고려 사항을 고르시오. [AI도구 활용]', 
    options: ['AI가 만든 내용을 자신의 창작물로 제출한다.', '개인정보가 포함된 문서를 AI도구에 업로드 한다.', 'AI도구의 결과를 참고하되, 출처를 명시한다.', 'AI도구의 제안을 그대로 복사해 사용한다.'], 
    correctAnswer: 3,
    points: 4 
  },
  { 
    id: 24, 
    type: 'multiple', 
    text: '다음 중 공공데이터로 수집하거나 제공할 수 없는 것을 고르시오. [공공데이터]', 
    options: ['기상청이 제공하는 지역별 강수량 데이터', '국토교통부가 제공하는 대중교통 이용 통계', '지자체가 제공하는 쓰레기 배출량 및 처리 현황', '교육청이 제공하는 학교의 재학생 정보'], 
    correctAnswer: 4,
    points: 4 
  },
  { 
    id: 25, 
    type: 'multiple', 
    text: '다음은 한 학과 학생들의 ‘AI 교육 참여율‘을 나타낸 데이터이다. 다음 중 가장 적절한 시각화 방법을 고르시오. [데이터 시각화] [구분: 1학년 2학년  3학년 4학년] [참여율(%):  35 60 70 55] ', 
    options: ['파이 차트','히스토그램','산점도', '선 그래프'], 
    correctAnswer: 1,
    points: 4 
  },
  { 
    id: 26, 
    type: 'multiple', 
    text: '다음 중 데이터 시각화의 가장 핵심적인 목적은 고르시오.[데이터 시각화]', 
    options: ['데이터를 복잡하게 표현하여 분석가의 전문성을 보여주기 위해','데이터를 시각적으로 표현해 정보를 쉽게 이해하고 비교하기 위해','데이터를 숨겨서 보안성을 높이기 위해', '데이터를 장식적으로 꾸며 발표를 돋보이게 하기 위해'], 
    correctAnswer: 2,
    points: 4 
  },
  { 
    id: 27, 
    type: 'multiple', 
    text: '다음 중 개인정보를 관리할 때 중요한 조치가 아닌 것을 고르시오. [디지털 윤리 및 사회적 쟁점]', 
    options: ['모든 데이터를 공용 테이블에 통합','개인정보의 정확한 정의와 태깅','권한을 제한하고 접근 기록을 남김', '개인정보 요청 시 정보 삭제 기능성 보장'], 
    correctAnswer: 1,
    points: 4 
  },
  { 
    id: 28, 
    type: 'multiple', 
    text: '다음 중 개인정보를 다루거나 AI 도구를 사용할 때 가장 올바른 행동을 고르시오.[디지털 윤리 및 사회적 쟁점]', 
    options: ['편의를 위해 이름·연락처 등이 포함된 파일을 AI 도구에 그대로 업로드한다.','AI서비스에서 수집된 데이터는 항상 익명 처리되므로 걱정할 필요가 없다.','개인정보를 포함한 자료를 업로드하기 전에 보안 정책과 이용 약관을 반드시 확인한다.', '인터넷에 공개된 정보는 누구나 자유롭게 재사용할 수 있다.'], 
    correctAnswer: 3,
    points: 4 
  },
  { 
    id: 29, 
    type: 'multiple', 
    text: '다음 중 AI기술을 개발·활용할 때 가장 바람직한 태도를 고르시오.[디지털 윤리 및 사회적 쟁점]', 
    options: ['기술 발전을 위해 개인정보를 일정 부분 희생하는 것은 당연하다.','AI의 결과물은 기계가 판단한 것이므로 사람에게는 책임이 없다.','AI 기술은 사회적 영향을 고려하지 않아야 객관적이다.', 'AI는 도구이기 때문에 결과에 대한 검증과 책임은 인간의 몫이다.'], 
    correctAnswer: 4,
    points: 4 
  },
  { 
    id: 30, 
    type: 'multiple', 
    text: '다음 중 AI 윤리의 핵심 원칙으로 가장 적절한 것을 고르시오.[디지털 윤리 및 사회적 쟁점]', 
    options: ['AI가 더 많은 데이터를 수집하도록 허용하는 것','AI가 인간을 대신해 모든 결정을 내리도록 하는 것','AI가 공정하고 투명하게 작동하도록 보장하는 것', 'AI 개발 비용을 최소화하기 위한 방안을 마련하는 것'], 
    correctAnswer: 3,
    points: 4 
  },
  {
    id: 31,
    type: 'subjective',
    text: ' 머쓱이는 친구들과 369게임을 하고 있습니다. 369게임은 1부터 숫자를 하나씩 대며, 3, 6, 9가 들어가는 숫자는 숫자 대신 3, 6, 9의 개수만큼 박수를 치는 게임입니다.머쓱이가 말해야하는 숫자 order가 매개변수로 주어질 때, 머쓱이가 쳐야할 박수 횟수를 return 하도록 빈칸을 채워서 코드를 완성하시오.',
    correctAnswer: 'str order ["3","6","9"] =answer+1',
    points: 10,
    imageUrl: '/subjec_question.png' // Added a default image for the last question
  }
];
