"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AptitudeTopicPage({ params }: { params: { categoryId: string, topicId: string } }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [topicName, setTopicName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // In a real app with a DB, we'd fetch from an API route. 
    // Here we'll simulate it by fetching the static JSON data directly if placed in public, 
    // but since it's in lib, we need an API route. 
    // Wait, let's create a quick API route or just import it if it was a server component.
    // Since it's a client component, we need to fetch via an API route.
    async function loadData() {
      try {
        const res = await fetch(`/api/aptitude?categoryId=${params.categoryId}&topicId=${params.topicId}`, { cache: 'no-store' });
        const data = await res.json();
        setQuestions(data.questions || []);
        setTopicName(data.topicName || params.topicId.replace(/-/g, ' '));
        setCategoryName(data.categoryName || params.categoryId.replace(/-/g, ' '));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  const currentQ = questions[currentQIndex];

  const handleOptionSelect = (option: string) => {
    if (showExplanation) return; // Prevent changing answer after revealed
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentQIndex(prev => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentQIndex(prev => Math.max(prev - 1, 0));
  };

  if (loading) {
    return <div className="w-full h-[60vh] flex items-center justify-center text-on-surface-variant">Loading practice module...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
        <Link href="/student/aptitude" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Topics
        </Link>
        <div className="bg-white/40 border border-white/60 p-12 rounded-3xl text-center shadow-sm">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">construction</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Questions Coming Soon</h2>
          <p className="text-on-surface-variant">The practice questions for <strong className="capitalize">{topicName}</strong> are currently being verified by our educators.</p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/student/aptitude" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-white/50 px-4 py-2 rounded-full border border-white/60">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> All Topics
        </Link>
        <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider bg-white/50 px-3 py-1 rounded-lg border border-white/60">
          {categoryName}
        </div>
      </div>

      <section className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 md:p-10 backdrop-blur-xl relative">
        <div className="flex justify-between items-start mb-8 border-b border-white/60 pb-6">
          <div>
            <h1 className="font-display-md text-3xl text-on-surface capitalize mb-2">{topicName}</h1>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className={`px-2.5 py-1 rounded-md border text-xs uppercase tracking-wide
                ${currentQ.difficulty === 'Easy' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700' : 
                  currentQ.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-700' : 
                  'bg-rose-500/10 border-rose-500/30 text-rose-700'}`}>
                {currentQ.difficulty}
              </span>
              <span className="text-on-surface-variant">Question {currentQIndex + 1} of {questions.length}</span>
            </div>
          </div>
          
          {/* Progress Mini Chart */}
          <div className="hidden md:flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className={`w-8 h-2 rounded-full ${i === currentQIndex ? 'bg-indigo-600' : i < currentQIndex ? 'bg-indigo-600/30' : 'bg-white/60'}`}></div>
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div className="mb-10">
          <p className="text-lg md:text-xl font-medium text-on-surface leading-relaxed whitespace-pre-wrap">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-10">
          {currentQ.options.map((option: string, i: number) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = showExplanation && option === currentQ.correctAnswer;
            const isWrongSelection = showExplanation && isSelected && !isCorrectOption;

            let optionClass = "bg-white/60 border-white/80 hover:bg-white text-on-surface";
            if (isSelected && !showExplanation) optionClass = "bg-indigo-50 border-indigo-500 text-indigo-900 ring-1 ring-indigo-500";
            if (isCorrectOption) optionClass = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500";
            if (isWrongSelection) optionClass = "bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-500";

            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(option)}
                disabled={showExplanation}
                className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group disabled:cursor-default ${optionClass}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${isSelected && !showExplanation ? 'bg-indigo-600 text-white' : 
                      isCorrectOption ? 'bg-emerald-500 text-white' : 
                      isWrongSelection ? 'bg-rose-500 text-white' : 
                      'bg-gray-200/80 text-gray-600 group-hover:bg-gray-300'}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-medium text-[15px]">{option}</span>
                </div>
                {isCorrectOption && <span className="material-symbols-outlined text-emerald-600 font-bold">check_circle</span>}
                {isWrongSelection && <span className="material-symbols-outlined text-rose-600 font-bold">cancel</span>}
              </button>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/60">
          <button 
            onClick={handlePrev} 
            disabled={currentQIndex === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-white/50 border border-white/60 text-on-surface hover:bg-white disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Previous
          </button>
          
          {!showExplanation ? (
            <button 
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md disabled:opacity-50 transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              disabled={currentQIndex === questions.length - 1}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-on-surface hover:bg-on-surface/90 shadow-md disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              Next Question <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Explanation Block */}
        {showExplanation && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isCorrect ? 'emoji_events' : 'psychology'}
                </span>
                <h3 className={`font-bold text-lg ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                  {isCorrect ? 'Excellent Work!' : 'Not quite right. Let\'s learn why:'}
                </h3>
              </div>
              <div className="bg-white/60 rounded-xl p-5 text-gray-800 text-sm leading-relaxed">
                <strong className="block mb-2 text-indigo-900 font-bold uppercase tracking-wider text-xs">Step-by-step Explanation:</strong>
                {currentQ.explanation}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
