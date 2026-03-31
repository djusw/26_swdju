import React from 'react';
import { motion } from 'motion/react';
import { Award, RefreshCw } from 'lucide-react';
import { StudentInfo } from '../../types';

interface ResultViewProps {
  studentInfo: StudentInfo;
  score: number;
  maxScore: number;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  studentInfo,
  score,
  maxScore,
  onReset
}) => {
  return (
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
          onClick={onReset}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-5 h-5" /> 다시 응시하기
        </button>
      </div>
    </motion.div>
  );
};
