/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  IdCard, 
  ChevronRight, 
  ChevronLeft, 
  ClipboardCheck,
  Award,
  RefreshCw,
  Settings,
  Save,
  Plus,
  Trash2,
  Check,
  X
} from 'lucide-react';

// Types
interface StudentInfo {
  studentId: string;
  name: string;
  department: string;
}

interface Question {
  id: number;
  type: 'likert' | 'multiple' | 'subjective';
  text: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

const INITIAL_QUESTIONS: Question[] = [
  { id: 1, type: 'likert', text: '나는 새로운 인공지능(AI) 기술이나 도구를 배우는 데 적극적으로 노력하고 있다.', points: 5 },
  { id: 2, type: 'likert', text: '나는 AI 관련 학습이 나의 진로 또는 전공 역량 향상에 도움이 된다고 생각한다.', points: 5 },
  { id: 3, type: 'likert', text: 'AI 도구(예: Chat GPT, Colilot 등) 유료버전을 사용해 학습이나 과제 수행에 활용할 의향이 있다.', points: 5 },
  { id: 4, type: 'likert', text: 'AI 도움을 받더라도 스스로 사고하고 검증하려고 노력하고 있다.', points: 5 },
  { id: 5, type: 'likert', text: 'AI를 사용할 때 저작권, 개인정보, 편향 문제 등 윤리적 책임을 준수하고 있다.', points: 5 },
  { 
    id: 6, 
    type: 'multiple', 
    text: '다음 중 ‘컴퓨팅 사고(Computational Thinking)’에 대한 올바른 설명을 고르시오. [SW기초]', 
    options: ['컴퓨터의 물리적 구조를 학습하고 효과를 높이기 위한 노력', '컴퓨터가 정보를 처리하는 방식을 관찰하고 생활에 적용하는 사고 방법', '컴퓨터처럼 문제를 논리적이고 체계적으로 해결하는 과정', '마케팅 전략 수립', '컴퓨터를 항상 사용할 수 있도록 수리하고 유지보수하는 일련의 과정'], 
    correctAnswer: 3,
    points: 2 
  },
  { 
    id: 7, 
    type: 'multiple', 
    text: '객체 지향 프로그래밍(OOP)의 4대 특징 중 "데이터와 기능을 하나로 묶는 것"을 의미하는 용어는?', 
    options: ['캡슐화', '상속', '다형성', '추상화'], 
    correctAnswer: 0,
    points: 4 
  },
  {
    id: 8,
    type: 'subjective',
    text: '자바스크립트에서 변수를 선언할 때, 재할당이 불가능한 상수를 선언하기 위해 사용하는 키워드는 (      ) 이다.',
    correctAnswer: 'const',
    points: 10
  }
];

export default function App() {
  const [step, setStep] = useState<'info' | 'assessment' | 'result' | 'admin'>('info');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    studentId: '',
    name: '',
    department: ''
  });
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentInfo.studentId && studentInfo.name && studentInfo.department) {
      setStep('assessment');
    }
  };

  const handleAnswer = (questionId: number, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach(q => {
      const answer = answers[q.id];
      if (q.type === 'likert') {
        total += Number(answer || 0);
      } else if (q.type === 'multiple') {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === 'subjective') {
        if (answer?.trim().toLowerCase() === (q.correctAnswer as string).toLowerCase()) {
          total += q.points;
        }
      }
    });
    return total;
  };

  const maxScore = questions.reduce((acc, q) => acc + q.points, 0);
  const score = calculateScore();

  const reset = () => {
    setStep('info');
    setStudentInfo({ studentId: '', name: '', department: '' });
    setAnswers({});
    setCurrentQuestionIdx(0);
  };

  // Admin Functions
  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addOption = (qId: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId && q.options) {
        return { ...q, options: [...q.options, '새 옵션'] };
      }
      return q;
    }));
  };

  const removeOption = (qId: number, optIdx: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId && q.options) {
        const newOptions = q.options.filter((_, i) => i !== optIdx);
        let newCorrect = q.correctAnswer;
        if (typeof q.correctAnswer === 'number' && q.correctAnswer >= optIdx) {
          newCorrect = Math.max(0, q.correctAnswer - 1);
        }
        return { ...q, options: newOptions, correctAnswer: newCorrect };
      }
      return q;
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#cbd5e1]">
      {/* Admin Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setStep(step === 'admin' ? 'info' : 'admin')}
          className="p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
          title="평가 문항 수정"
        >
          {step === 'admin' ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">학생 역량 평가 시스템</h1>
          <p className="text-slate-500 mt-2">정확하고 명확한 역량 진단 도구</p>
        </header>

        <AnimatePresence mode="wait">
          {step === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-xl font-semibold text-slate-800">응시자 정보 입력</h2>
                <p className="text-sm text-slate-500 mt-1">평가를 시작하기 위해 기본 정보를 입력해주세요.</p>
              </div>
              <form onSubmit={handleInfoSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">학번</label>
                    <div className="relative">
                      <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="20240001"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={studentInfo.studentId}
                        onChange={e => setStudentInfo({ ...studentInfo, studentId: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">이름</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="홍길동"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={studentInfo.name}
                        onChange={e => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">학과</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      placeholder="컴퓨터공학과"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      value={studentInfo.department}
                      onChange={e => setStudentInfo({ ...studentInfo, department: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center justify-center group"
                >
                  평가 시작하기
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">배점: {questions[currentQuestionIdx].points}점</span>
                </div>
                <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500" 
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[200px]">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-10 leading-tight">
                  {questions[currentQuestionIdx].text}
                </h3>

                {/* Likert Scale */}
                {questions[currentQuestionIdx].type === 'likert' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-5 gap-3 md:gap-4">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          onClick={() => handleAnswer(questions[currentQuestionIdx].id, val)}
                          className={`group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                            answers[questions[currentQuestionIdx].id] === val
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-lg font-bold">{val}</span>
                          <div className={`mt-2 w-2 h-2 rounded-full ${
                            answers[questions[currentQuestionIdx].id] === val ? 'bg-indigo-600' : 'bg-slate-200'
                          }`} />
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span>전혀 그렇지 않다</span>
                      <span>매우 그렇다</span>
                    </div>
                  </div>
                )}

                {/* Multiple Choice */}
                {questions[currentQuestionIdx].type === 'multiple' && (
                  <div className="space-y-3">
                    {questions[currentQuestionIdx].options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(questions[currentQuestionIdx].id, idx)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center group ${
                          answers[questions[currentQuestionIdx].id] === idx
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center text-[10px] font-bold transition-colors ${
                          answers[questions[currentQuestionIdx].id] === idx 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Subjective */}
                {questions[currentQuestionIdx].type === 'subjective' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="정답을 입력하세요"
                      className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-center text-2xl font-bold text-slate-800"
                      value={answers[questions[currentQuestionIdx].id] || ''}
                      onChange={e => handleAnswer(questions[currentQuestionIdx].id, e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIdx === 0}
                  className={`flex items-center text-sm font-bold uppercase tracking-wider ${
                    currentQuestionIdx === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-600 transition-colors'
                  }`}
                >
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={answers[questions[currentQuestionIdx].id] === undefined}
                  className={`px-10 py-3.5 rounded-xl font-bold transition-all flex items-center shadow-lg ${
                    answers[questions[currentQuestionIdx].id] === undefined
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                  }`}
                >
                  {currentQuestionIdx === questions.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 border-4 border-white shadow-sm">
                <Award className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">평가 완료</h2>
              <p className="text-slate-500 mt-1">{studentInfo.name}님의 역량 진단 결과입니다.</p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">학번</p>
                  <p className="font-bold text-slate-700">{studentInfo.studentId}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">학과</p>
                  <p className="font-bold text-slate-700">{studentInfo.department}</p>
                </div>
                <div className="bg-indigo-600 p-5 rounded-xl text-left shadow-lg shadow-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">최종 점수</p>
                  <p className="text-2xl font-black text-white">{score} <span className="text-sm font-normal text-indigo-200">/ {maxScore}</span></p>
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <button
                  onClick={reset}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center"
                >
                  <RefreshCw className="mr-2 w-5 h-5" /> 다시 응시하기
                </button>
              </div>
            </motion.div>
          )}

          {step === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">평가 문항 관리</h2>
                  <p className="text-sm text-slate-500 mt-1">객관식 및 주관식 문항을 직접 수정할 수 있습니다.</p>
                </div>
                <button 
                  onClick={() => setStep('info')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all"
                >
                  저장 및 나가기
                </button>
              </div>

              <div className="space-y-8">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">
                          {qIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                          {q.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-400">배점:</span>
                        <input 
                          type="number"
                          className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-sm font-bold focus:outline-none focus:border-indigo-500"
                          value={q.points}
                          onChange={e => updateQuestion(q.id, { points: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">문항 내용</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm leading-relaxed"
                        rows={2}
                        value={q.text}
                        onChange={e => updateQuestion(q.id, { text: e.target.value })}
                      />
                    </div>

                    {q.type === 'multiple' && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">선택지 및 정답 설정</label>
                        <div className="space-y-2">
                          {q.options?.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center space-x-2">
                              <button 
                                onClick={() => updateQuestion(q.id, { correctAnswer: optIdx })}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                  q.correctAnswer === optIdx 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-white border border-slate-200 text-slate-300 hover:border-emerald-500'
                                }`}
                                title="정답으로 설정"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <input 
                                type="text"
                                className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                                value={opt}
                                onChange={e => {
                                  const newOpts = [...(q.options || [])];
                                  newOpts[optIdx] = e.target.value;
                                  updateQuestion(q.id, { options: newOpts });
                                }}
                              />
                              <button 
                                onClick={() => removeOption(q.id, optIdx)}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => addOption(q.id)}
                            className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4 mr-1" /> 옵션 추가
                          </button>
                        </div>
                      </div>
                    )}

                    {q.type === 'subjective' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">정답 키워드</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm font-bold"
                          value={q.correctAnswer as string}
                          onChange={e => updateQuestion(q.id, { correctAnswer: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 Assessment System • Professional Edition</p>
        </footer>
      </main>
    </div>
  );
}
