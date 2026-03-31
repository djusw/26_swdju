import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Question, StudentInfo } from '../../types';
import { UserInfoForm } from './UserInfoForm';
import { AssessmentView } from './AssessmentView';
import { ResultView } from './ResultView';

interface UserModeProps {
  questions: Question[];
  onFinish: (score: number, maxScore: number, info: StudentInfo) => void;
}

export const UserMode: React.FC<UserModeProps> = ({ questions, onFinish }) => {
  const [step, setStep] = useState<'info' | 'assessment' | 'result'>('info');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    studentId: '',
    name: '',
    department: ''
  });
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
      const score = calculateScore();
      const maxScore = questions.reduce((acc, q) => acc + q.points, 0);
      onFinish(score, maxScore, studentInfo);
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

  return (
    <AnimatePresence mode="wait">
      {step === 'info' && (
        <UserInfoForm 
          studentInfo={studentInfo}
          setStudentInfo={setStudentInfo}
          onSubmit={handleInfoSubmit}
        />
      )}

      {step === 'assessment' && (
        <AssessmentView 
          questions={questions}
          currentQuestionIdx={currentQuestionIdx}
          answers={answers}
          handleAnswer={handleAnswer}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
        />
      )}

      {step === 'result' && (
        <ResultView 
          studentInfo={studentInfo}
          score={score}
          maxScore={maxScore}
          onReset={reset}
        />
      )}
    </AnimatePresence>
  );
};
