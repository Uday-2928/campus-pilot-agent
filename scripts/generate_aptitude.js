const fs = require('fs');
const path = require('path');

const data = {
  categories: [
    {
      id: 'quantitative-aptitude',
      name: 'Quantitative Aptitude',
      description: 'Master mathematical concepts and numerical problem-solving skills.',
      icon: 'calculate',
      topics: [
        'Number Systems', 'Simplification and Approximation', 'Percentages',
        'Profit and Loss', 'Simple and Compound Interest', 'Ratio and Proportion',
        'Averages', 'Mixtures and Allegations', 'Problems on Ages',
        'Time and Work', 'Pipes and Cisterns', 'Speed, Time and Distance',
        'Trains, Boats and Streams', 'HCF and LCM', 'Permutations and Combinations',
        'Probability', 'Algebra', 'Geometry and Mensuration', 'Number Series',
        'Data Interpretation', 'Data Sufficiency'
      ].map(t => ({ id: t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: t }))
    },
    {
      id: 'logical-reasoning',
      name: 'Logical & Analytical Reasoning',
      description: 'Develop your ability to analyze patterns, relationships, and logical deductions.',
      icon: 'psychology',
      topics: [
        'Number and Letter Series', 'Analogies', 'Coding and Decoding',
        'Blood Relations', 'Direction Sense', 'Seating Arrangements',
        'Logical Puzzles', 'Syllogisms', 'Statements and Conclusions',
        'Statements and Assumptions', 'Cause and Effect', 'Order and Ranking',
        'Clocks and Calendars', 'Venn Diagrams', 'Inequalities',
        'Data Sufficiency', 'Input-Output Problems', 'Non-Verbal Reasoning'
      ].map(t => ({ id: t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: t }))
    },
    {
      id: 'verbal-ability',
      name: 'Verbal Ability & English',
      description: 'Enhance your grammar, vocabulary, and reading comprehension skills.',
      icon: 'sort_by_alpha',
      topics: [
        'Grammar', 'Vocabulary', 'Synonyms and Antonyms',
        'Sentence Correction', 'Error Spotting', 'Fill in the Blanks',
        'Para Jumbles', 'Reading Comprehension', 'Sentence Completion',
        'Verbal Reasoning'
      ].map(t => ({ id: t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: t }))
    },
    {
      id: 'technical-c',
      name: 'Technical Interview (C Programming)',
      description: 'Core concepts and problem-solving in C Programming language.',
      icon: 'code',
      topics: [
        'Variables, Data Types and Operators', 'Conditional Statements and Loops',
        'Functions and Recursion', 'Arrays and Strings', 'Pointers',
        'Structures and Unions', 'Dynamic Memory Allocation', 'File Handling',
        'Storage Classes', 'Output Prediction', 'Debugging'
      ].map(t => ({ id: t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: t }))
    }
  ],
  questions: []
};

// Generate some sample questions for the first topic of each to demonstrate functionality
const sampleQuestions = [
  {
    id: 'q1',
    topicId: 'number-systems',
    categoryId: 'quantitative-aptitude',
    question: 'Find the unit digit in the product (4387)^245 × (621)^72.',
    options: ['1', '2', '5', '7'],
    correctAnswer: '7',
    explanation: 'For 4387, unit digit is 7. Cyclicity of 7 is 4. 245 = 4*61 + 1. So, unit digit of (4387)^245 is 7^1 = 7. For 621, unit digit is 1, which always yields 1. 7 * 1 = 7.',
    difficulty: 'Medium'
  },
  {
    id: 'q2',
    topicId: 'number-and-letter-series',
    categoryId: 'logical-reasoning',
    question: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
    options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
    correctAnswer: '(1/8)',
    explanation: 'This is a simple alternating division series; each number is one-half of the previous number.',
    difficulty: 'Easy'
  },
  {
    id: 'q3',
    topicId: 'grammar',
    categoryId: 'verbal-ability',
    question: 'Choose the correct sentence:',
    options: [
      'He asked me what was my name.',
      'He asked me what my name was.',
      'He asked me what is my name.',
      'He ask me what my name was.'
    ],
    correctAnswer: 'He asked me what my name was.',
    explanation: 'In indirect speech, the interrogative form changes to the assertive form, so the verb comes after the subject.',
    difficulty: 'Medium'
  },
  {
    id: 'q4',
    topicId: 'pointers',
    categoryId: 'technical-c',
    question: 'What is a dangling pointer in C?',
    options: [
      'A pointer pointing to a memory location that has been deleted or freed.',
      'A pointer that is uninitialized.',
      'A pointer that points to another pointer.',
      'A pointer that points to a function.'
    ],
    correctAnswer: 'A pointer pointing to a memory location that has been deleted or freed.',
    explanation: 'When a memory block is freed using free() but the pointer is not set to NULL, it becomes a dangling pointer.',
    difficulty: 'Hard'
  }
];

data.questions = sampleQuestions;

fs.writeFileSync(path.join(__dirname, '../lib/aptitude_data.json'), JSON.stringify(data, null, 2));
console.log('Generated lib/aptitude_data.json');
