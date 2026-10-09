const fs = require('fs');
const path = require('path');

const baseAptitudeDir = path.join(__dirname, 'app', 'aptitude');
fs.mkdirSync(baseAptitudeDir, { recursive: true });

const listPageCode = `'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AptitudePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aptitude').then(res => res.json()).then(data => {
      setCategories(data.categories || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-4xl font-bold mb-4">Aptitude Preparation</h1>
        <p className="text-slate-600 mb-8 max-w-3xl">Practice quantitative aptitude, logical reasoning, verbal ability, and technical topics for your upcoming campus placements and competitive exams.</p>
        
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                <div className="flex flex-col gap-2">
                  {cat.topics.map((t, j) => (
                    <Link key={j} href={\`/aptitude/\${cat.id}/\${t.id}\`} className="text-blue-600 hover:underline text-sm flex items-center justify-between">
                      {t.name}
                      <span className="text-slate-400">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(baseAptitudeDir, 'page.tsx'), listPageCode);

const quizDir = path.join(baseAptitudeDir, '[categoryId]', '[topicId]');
fs.mkdirSync(quizDir, { recursive: true });

const quizPageCode = `'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useParams, useRouter } from 'next/navigation';

export default function QuizPage() {
  const { categoryId, topicId } = useParams();
  const router = useRouter();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(\`/api/aptitude?categoryId=\${categoryId}&topicId=\${topicId}\`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, [categoryId, topicId]);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p>Loading quiz...</p></div>;
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full text-center">
          <h2 className="text-2xl font-bold mb-4">No questions found for this topic</h2>
          <button onClick={() => router.push('/aptitude')} className="bg-blue-600 text-white px-4 py-2 rounded">Back to Topics</button>
        </main>
      </div>
    );
  }

  const handleSelectOption = (qId, optionId) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    data.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setIsSubmitted(true);
  };

  const q = data.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => router.push('/aptitude')} className="text-slate-500 hover:text-slate-700">&larr; Back to Topics</button>
          <div className="text-sm font-medium text-slate-500">{data.categoryName} / {data.topicName}</div>
        </div>

        {isSubmitted && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">{score} / {data.questions.length}</div>
            <p className="text-slate-600">Review your answers below.</p>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-slate-500">Question {currentQuestionIndex + 1} of {data.questions.length}</span>
          </div>
          
          <h3 className="text-lg md:text-xl font-bold mb-6">{q.text}</h3>
          
          <div className="space-y-3 mb-8">
            {q.options.map(opt => {
              const isSelected = selectedAnswers[q.id] === opt.id;
              const isCorrect = q.correctOptionId === opt.id;
              let styleClass = "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
              
              if (isSelected && !isSubmitted) {
                styleClass = "border-blue-500 bg-blue-50 text-blue-800 ring-1 ring-blue-500";
              } else if (isSubmitted) {
                if (isCorrect) {
                  styleClass = "border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                } else if (isSelected && !isCorrect) {
                  styleClass = "border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
                } else {
                  styleClass = "border-slate-200 opacity-50";
                }
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => handleSelectOption(q.id, opt.id)}
                  className={\`p-4 rounded-xl border-2 cursor-pointer transition-all \${styleClass}\`}
                >
                  <div className="flex items-center gap-3">
                    <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold \${(isSelected && !isSubmitted) || (isSubmitted && isCorrect) || (isSubmitted && isSelected) ? 'bg-white' : 'bg-slate-100 text-slate-500'}\`}>
                      {opt.id.toUpperCase()}
                    </div>
                    {opt.text}
                  </div>
                </div>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
              <h4 className="font-bold text-sm text-slate-700 mb-2">Explanation:</h4>
              <p className="text-sm text-slate-600">{q.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
            <button 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
              className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            
            {!isSubmitted ? (
              currentQuestionIndex === data.questions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Submit Quiz
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestionIndex(i => Math.min(data.questions.length - 1, i + 1))}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Next Question
                </button>
              )
            ) : (
              <button 
                disabled={currentQuestionIndex === data.questions.length - 1}
                onClick={() => setCurrentQuestionIndex(i => Math.min(data.questions.length - 1, i + 1))}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(quizDir, 'page.tsx'), quizPageCode);
console.log('Aptitude pages created!');
