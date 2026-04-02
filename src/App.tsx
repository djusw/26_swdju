/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck,
  Settings,
  User as UserIcon,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { AdminMode } from './components/AdminMode';
import { UserMode } from './components/user/UserMode';
import { INITIAL_QUESTIONS } from './constants';
import { Question, StudentInfo } from './types';

interface AssessmentResult {
  id: string;
  studentInfo: StudentInfo;
  score: number;
  maxScore: number;
  timestamp: number;
}

export default function App() {
  const isUserOnly = import.meta.env.VITE_USER_ONLY === 'true';
  const [mode, setMode] = useState<'selection' | 'user' | 'admin' | 'results'>(isUserOnly ? 'user' : 'selection');
  
  // Load questions from localStorage or use INITIAL_QUESTIONS
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('assessment_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  // Load results from localStorage
  const [results, setResults] = useState<AssessmentResult[]>(() => {
    const saved = localStorage.getItem('assessment_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('assessment_questions', JSON.stringify(questions));
  }, [questions]);

  // Save results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('assessment_results', JSON.stringify(results));
  }, [results]);

  const handleFinish = (score: number, maxScore: number, info: StudentInfo) => {
    const newResult: AssessmentResult = {
      id: crypto.randomUUID(),
      studentInfo: info,
      score,
      maxScore,
      timestamp: Date.now()
    };
    setResults(prev => [newResult, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#cbd5e1]">
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900"> AI.SW 학생 역량 평가 시스템</h1>
          <p className="text-slate-500 mt-2">정확하고 명확한 역량 진단 도구</p>
        </header>

        {mode === 'selection' && !isUserOnly && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <button 
              onClick={() => setMode('user')}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50 transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <UserIcon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">사용자 모드</h2>
              <p className="text-sm text-slate-500">역량 평가를 시작하고 결과를 확인합니다.</p>
              <div className="mt-8 px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                응시하기
              </div>
            </button>

            <button 
              onClick={() => setMode('admin')}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-50 transition-all text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <ShieldCheck className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">관리자 모드</h2>
              <p className="text-sm text-slate-500">평가 문항을 관리하고 정답을 수정합니다.</p>
              <div className="mt-8 px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                설정하기
              </div>
            </button>
          </div>
        )}

        {mode === 'user' && (
          <UserMode 
            questions={questions} 
            onFinish={handleFinish} 
          />
        )}

        {mode === 'admin' && !isUserOnly && (
          <div className="space-y-6">
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setMode('results')}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span>응시 결과 보기</span>
              </button>
            </div>
            <AdminMode 
              questions={questions} 
              setQuestions={setQuestions} 
              onExit={() => setMode('selection')} 
            />
          </div>
        )}

        {mode === 'results' && !isUserOnly && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">응시 결과 목록</h2>
                <p className="text-sm text-slate-500 mt-1">학생들의 평가 점수와 정보를 확인합니다.</p>
              </div>
              <button 
                onClick={() => setMode('admin')}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all"
              >
                뒤로가기
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-bold">학생 정보</th>
                    <th className="px-4 py-3 font-bold">점수</th>
                    <th className="px-4 py-3 font-bold">응시 일시</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center text-slate-400 italic">
                        아직 응시 결과가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    results.map(res => (
                      <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-800">{res.studentInfo.name}</div>
                          <div className="text-[10px] text-slate-400">{res.studentInfo.department} / {res.studentInfo.studentId}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-indigo-600">{res.score}</span>
                          <span className="text-slate-300 mx-1">/</span>
                          <span className="text-slate-400">{res.maxScore}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-xs">
                          {new Date(res.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Back to Selection button when in User mode */}
        {mode === 'user' && !isUserOnly && (
          <div className="fixed bottom-6 right-6">
            <button 
              onClick={() => setMode('selection')}
              className="p-3 bg-white border border-slate-200 rounded-full shadow-lg hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600"
              title="모드 선택으로 돌아가기"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Footer Info */}
        <footer className="mt-12 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 대전대학교 SW중심대학사업단</p>
        </footer>
      </main>
    </div>
  );
}
