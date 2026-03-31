import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '../../types';

interface AssessmentViewProps {
  questions: Question[];
  currentQuestionIdx: number;
  answers: Record<number, any>;
  handleAnswer: (questionId: number, value: any) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questions,
  currentQuestionIdx,
  answers,
  handleAnswer,
  nextQuestion,
  prevQuestion
}) => {
  const currentQuestion = questions[currentQuestionIdx];

  return (
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
          <span className="text-xs text-slate-400 mt-1">배점: {currentQuestion.points}점</span>
        </div>
        <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[200px]">
        {/* Question Image if exists */}
        {currentQuestion.imageUrl && (
          <div className={`mb-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm ${
            currentQuestionIdx === questions.length - 1 ? 'ring-4 ring-indigo-50' : ''
          }`}>
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question visual" 
              className="w-full h-auto max-h-[500px] object-contain bg-slate-50"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Hide text if it's the last question and has an image, or show it as a sub-caption */}
        {!(currentQuestionIdx === questions.length - 1 && currentQuestion.imageUrl) ? (
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-10 leading-tight">
            {currentQuestion.text}
          </h3>
        ) : (
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
              이미지 분석 문항
            </span>
            <p className="text-slate-500 text-sm italic">위 이미지를 보고 질문에 답하세요.</p>
            {currentQuestion.text && (
              <p className="mt-4 text-slate-700 font-medium">{currentQuestion.text}</p>
            )}
          </div>
        )}

        {/* Likert Scale */}
        {currentQuestion.type === 'likert' && (
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  onClick={() => handleAnswer(currentQuestion.id, val)}
                  className={`group relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                    answers[currentQuestion.id] === val
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                      : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <span className="text-lg font-bold">{val}</span>
                  <div className={`mt-2 w-2 h-2 rounded-full ${
                    answers[currentQuestion.id] === val ? 'bg-indigo-600' : 'bg-slate-200'
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
        {currentQuestion.type === 'multiple' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, idx)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center group ${
                  answers[currentQuestion.id] === idx
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center text-[10px] font-bold transition-colors ${
                  answers[currentQuestion.id] === idx 
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
        {currentQuestion.type === 'subjective' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="정답을 입력하세요"
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-center text-2xl font-bold text-slate-800"
              value={answers[currentQuestion.id] || ''}
              onChange={e => handleAnswer(currentQuestion.id, e.target.value)}
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
          disabled={answers[currentQuestion.id] === undefined}
          className={`px-10 py-3.5 rounded-xl font-bold transition-all flex items-center shadow-lg ${
            answers[currentQuestion.id] === undefined
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
          }`}
        >
          {currentQuestionIdx === questions.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
