import React from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, IdCard, ChevronRight } from 'lucide-react';
import { StudentInfo } from '../../types';

interface UserInfoFormProps {
  studentInfo: StudentInfo;
  setStudentInfo: (info: StudentInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ studentInfo, setStudentInfo, onSubmit }) => {
  return (
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
      <form onSubmit={onSubmit} className="space-y-5">
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
  );
};
