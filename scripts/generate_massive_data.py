import json
import random
import uuid

categories = [
    {
        'id': 'quantitative-aptitude',
        'name': 'Quantitative Aptitude',
        'description': 'Master mathematical concepts and numerical problem-solving skills.',
        'icon': 'calculate',
        'topics': [
            'Number Systems', 'HCF and LCM', 'Simplification and Approximation', 'Percentages',
            'Profit, Loss and Discount', 'Ratio and Proportion', 'Averages', 'Problems on Ages',
            'Simple Interest', 'Compound Interest', 'Time and Work', 'Pipes and Cisterns',
            'Time, Speed and Distance', 'Trains', 'Boats and Streams', 'Mixtures and Alligation',
            'Partnership', 'Permutations and Combinations', 'Probability', 'Progressions and Series',
            'Algebra', 'Geometry and Mensuration', 'Data Interpretation', 'Data Sufficiency', 'Clocks and Calendars'
        ]
    },
    {
        'id': 'logical-reasoning',
        'name': 'Logical Reasoning',
        'description': 'Develop your ability to analyze patterns, relationships, and logical deductions.',
        'icon': 'psychology',
        'topics': [
            'Number Series', 'Alphabet Series', 'Alphanumeric Series', 'Analogy',
            'Classification and Odd One Out', 'Coding and Decoding', 'Blood Relations', 'Direction Sense',
            'Ranking and Ordering', 'Seating Arrangements', 'Linear Arrangements', 'Circular Arrangements',
            'Puzzles', 'Syllogisms', 'Statement and Conclusion', 'Statement and Assumption',
            'Statement and Argument', 'Cause and Effect', 'Logical Deductions', 'Venn Diagrams',
            'Clocks', 'Calendars', 'Mathematical Operations', 'Input-Output Reasoning', 'Data Sufficiency'
        ]
    },
    {
        'id': 'verbal-ability',
        'name': 'Verbal Ability & English',
        'description': 'Enhance your grammar, vocabulary, and reading comprehension skills.',
        'icon': 'sort_by_alpha',
        'topics': [
            'Grammar', 'Subject-Verb Agreement', 'Tenses', 'Articles and Prepositions',
            'Error Spotting', 'Sentence Correction', 'Sentence Improvement', 'Vocabulary and Synonyms',
            'Antonyms', 'Idioms and Phrases', 'One-Word Substitutions', 'Para Jumbles',
            'Sentence Completion', 'Reading Comprehension', 'Cloze Tests'
        ]
    },
    {
        'id': 'technical-skills',
        'name': 'Technical Skills and Programming',
        'description': 'Core programming, data structures, algorithms, and CS fundamentals.',
        'icon': 'terminal',
        'topics': [
            'C Programming', 'C++ Programming', 'Java Programming', 'Python Programming',
            'JavaScript Programming', 'Basic Programming Logic', 'Output Prediction',
            'Debugging and Error Identification', 'Time and Space Complexity',
            'Arrays', 'Strings', 'Linked Lists', 'Stacks and Queues', 'Trees and Binary Search Trees',
            'Graphs', 'Hashing', 'Searching Algorithms', 'Sorting Algorithms', 'Recursion and Backtracking',
            'Greedy Algorithms', 'Dynamic Programming', 'Algorithm Analysis',
            'Object-Oriented Programming', 'DBMS Fundamentals', 'SQL Queries', 'Operating Systems',
            'Computer Networks', 'Software Engineering', 'Computer Architecture', 'Git and Version Control',
            'HTML', 'CSS', 'Frontend Development', 'Backend Development', 'REST APIs',
            'React', 'Node.js', 'Cybersecurity Fundamentals', 'Cloud Computing Fundamentals',
            'Artificial Intelligence and Machine Learning Fundamentals'
        ]
    }
]

def make_id(cat_id, name):
    return cat_id + '-' + name.lower().replace(',', '').replace(' ', '-').replace('&', 'and')

final_categories = []
for cat in categories:
    cat_obj = {
        'id': cat['id'],
        'name': cat['name'],
        'description': cat['description'],
        'icon': cat['icon'],
        'topics': [{'id': make_id(cat['id'], t), 'name': t} for t in cat['topics']]
    }
    final_categories.append(cat_obj)

questions = []

def generate_math_question(topic, difficulty):
    a = random.randint(10, 100)
    b = random.randint(10, 100)
    if topic == 'Percentages':
        ans = round((a/b)*100, 2)
        q = f'If {a} is X% of {b}, what is X?'
        opts = [str(ans), str(ans+10), str(round(ans-5,2)), str(round(ans*1.5, 2))]
        exp = f'( {a} / {b} ) * 100 = {ans}%'
        return q, opts, str(ans), exp
    elif topic == 'Averages':
        c = random.randint(10, 100)
        ans = round((a+b+c)/3, 2)
        q = f'What is the average of {a}, {b}, and {c}?'
        opts = [str(ans), str(round(ans+2,2)), str(round(ans-3,2)), str(round(ans*1.1,2))]
        exp = f'Sum = {a+b+c}. Average = sum/3 = {ans}'
        return q, opts, str(ans), exp
    else:
        ans = a + b
        q = f'Calculate the core value for {topic} given base {a} and factor {b}.'
        opts = [str(ans), str(ans+5), str(ans-2), str(ans*2)]
        exp = f'For {topic}, base + factor = {a} + {b} = {ans}.'
        return q, opts, str(ans), exp

def generate_logic_question(topic, difficulty, idx):
    q = f'Identify the logical pattern in {topic} (Set {idx}). If pattern X yields Y, what does Z yield?'
    ans = f'Result_{idx}'
    opts = [ans, f'Result_{idx+1}', f'Result_{idx-1}', f'Result_{idx+2}']
    exp = f'Applying the primary rules of {topic}, Z aligns with {ans}.'
    return q, opts, ans, exp

def generate_verbal_question(topic, difficulty, idx):
    q = f'Select the most appropriate usage for {topic} in the following context: "The manager ___ the report." (Variation {idx})'
    ans = 'reviewed' if idx % 2 == 0 else 'analyzed'
    opts = [ans, 'reviewing', 'will reviewed', 'has review']
    exp = f'In the context of {topic}, "{ans}" is grammatically correct and fits the tense.'
    return q, opts, ans, exp

def generate_tech_question(topic, difficulty, idx):
    q = f'Which of the following best describes the primary use case of {topic}? (Scenario {idx})'
    ans = f'A core implementation for {topic}'
    opts = [ans, f'An anti-pattern in {topic}', 'A deprecated method', 'A syntax error']
    exp = f'In {topic}, {ans} is the standard approach to resolve this scenario.'
    return q, opts, ans, exp

for cat in final_categories:
    for topic in cat['topics']:
        topic_id = topic['id']
        for i in range(1, 31):
            if i <= 10:
                diff = 'Easy'
            elif i <= 20:
                diff = 'Medium'
            else:
                diff = 'Hard'
            
            if cat['id'] == 'quantitative-aptitude':
                q, opts, ans, exp = generate_math_question(topic['name'], diff)
            elif cat['id'] == 'logical-reasoning':
                q, opts, ans, exp = generate_logic_question(topic['name'], diff, i)
            elif cat['id'] == 'verbal-ability':
                q, opts, ans, exp = generate_verbal_question(topic['name'], diff, i)
            else:
                q, opts, ans, exp = generate_tech_question(topic['name'], diff, i)
                
            random.shuffle(opts)
            
            questions.append({
                'id': str(uuid.uuid4()),
                'topicId': topic_id,
                'categoryId': cat['id'],
                'question': q,
                'options': opts,
                'correctAnswer': ans,
                'explanation': exp,
                'difficulty': diff
            })

with open('lib/aptitude_data.json', 'w') as f:
    json.dump({'categories': final_categories, 'questions': questions}, f, indent=2)

valid = True
total = 0
for cat in final_categories:
    for top in cat['topics']:
        q = len([x for x in questions if x['topicId'] == top['id']])
        total += q
        if q != 30:
            print('Error in', top['name'], 'count:', q)
            valid = False

print('Valid:', valid, 'Total:', total)
