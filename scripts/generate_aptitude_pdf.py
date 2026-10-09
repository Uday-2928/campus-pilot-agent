import math
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont('Helvetica', 8)
        self.setFillColor(colors.HexColor('#718096'))
        if self._pageNumber > 1:
            self.drawString(36, 762, 'Quantitative Aptitude Master Question Bank (750 Questions)')
            self.setStrokeColor(colors.HexColor('#CBD5E0'))
            self.setLineWidth(0.5)
            self.line(36, 756, 576, 756)
            self.line(36, 42, 576, 42)
            self.drawRightString(576, 30, f'Page {self._pageNumber} of {page_count}')
            self.drawString(36, 30, 'Confidential - For Personal / Academic Practice Only')
        self.restoreState()

TOPICS = [
    ('Number Systems & Divisibility', 'numbers'),
    ('HCF & LCM of Numbers', 'hcf_lcm'),
    ('Percentages', 'percentages'),
    ('Profit, Loss & Discount', 'profit_loss'),
    ('Simple & Compound Interest', 'interest'),
    ('Ratio & Proportion', 'ratios'),
    ('Mixtures & Alligations', 'mixtures'),
    ('Partnership & Investments', 'partnership'),
    ('Averages', 'averages'),
    ('Problems on Ages', 'ages'),
    ('Time & Work', 'time_work'),
    ('Pipes & Cisterns', 'pipes'),
    ('Time, Speed & Distance', 'speed_distance'),
    ('Problems on Trains & Relative Motion', 'trains'),
    ('Boats & Streams', 'boats'),
    ('Permutations & Combinations', 'pnc'),
    ('Probability', 'probability'),
    ('Mensuration 2D (Area & Perimeter)', 'mens_2d'),
    ('Mensuration 3D (Volume & Surface Area)', 'mens_3d'),
    ('Clocks & Calendars', 'clocks'),
    ('Arithmetic & Geometric Progressions', 'progressions'),
    ('Quadratic Equations & Inequalities', 'quadratics'),
    ('Surds, Indices & Powers', 'surds'),
    ('Heights & Distances (Trigonometry)', 'trig'),
    ('Data Interpretation & Quantitative Reasoning', 'di')
]

def make_question(topic_key, i, q_num):
    if topic_key == 'numbers':
        val = 11 + i
        ans = (val * 3) % 7
        return (f'Find the remainder when (7 \u00d7 {val} + {ans}) is divided by 7.',
                f'A) {ans}   B) {(ans+1)%7}   C) {(ans+2)%7}   D) {(ans+3)%7}',
                'A',
                f'By remainder theorem, (7 \u00d7 {val}) leaves remainder 0. Hence remainder is {ans}.')
    elif topic_key == 'hcf_lcm':
        f1, f2 = 2 + (i % 5), 3 + (i % 4)
        h = 6 + i
        a, b = h * f1, h * f2
        l = (a * b) // math.gcd(a, b)
        return (f'The HCF of two numbers is {h} and their product is {a * b}. Find their LCM.',
                f'A) {l - 10}   B) {l}   C) {l + 10}   D) {l + 25}',
                'B',
                f'Formula: Product of numbers = HCF \u00d7 LCM. Therefore, LCM = {a*b} / {h} = {l}.')
    elif topic_key == 'percentages':
        b = 100 + i * 20
        p = 10 + (i % 6) * 5
        val = (b * p) // 100
        return (f'What is {p}% of {b}?',
                f'A) {val}   B) {val + 5}   C) {val - 4}   D) {val + 10}',
                'A',
                f'Value = ({p} / 100) \u00d7 {b} = {val}.')
    elif topic_key == 'profit_loss':
        cp = 200 + i * 25
        profit = 10 + (i % 5) * 5
        sp = int(cp * (1 + profit / 100))
        return (f'An article bought for Rs. {cp} is sold at a profit of {profit}%. Find the selling price.',
                f'A) Rs. {sp - 15}   B) Rs. {sp + 10}   C) Rs. {sp}   D) Rs. {sp + 25}',
                'C',
                f'SP = CP \u00d7 (1 + P/100) = {cp} \u00d7 {1 + profit/100:.2f} = Rs. {sp}.')
    elif topic_key == 'interest':
        p = 1000 + i * 500
        r = 5 + (i % 5)
        t = 2 + (i % 4)
        si = (p * r * t) // 100
        return (f'Find the Simple Interest on Rs. {p} at {r}% per annum for {t} years.',
                f'A) Rs. {si}   B) Rs. {si + 20}   C) Rs. {si - 25}   D) Rs. {si + 50}',
                'A',
                f'SI = (P \u00d7 R \u00d7 T) / 100 = ({p} \u00d7 {r} \u00d7 {t}) / 100 = Rs. {si}.')
    elif topic_key == 'ratios':
        m = 2 + (i % 4)
        n = 3 + (i % 5)
        tot = (m + n) * (15 + i)
        part_a = (tot * m) // (m + n)
        return (f'Divide Rs. {tot} between A and B in the ratio {m} : {n}. What is A\'s share?',
                f'A) Rs. {part_a + 10}   B) Rs. {part_a}   C) Rs. {part_a - 15}   D) Rs. {part_a + 25}',
                'B',
                f'A\'s share = [{m} / ({m} + {n})] \u00d7 {tot} = Rs. {part_a}.')
    elif topic_key == 'mixtures':
        c1, c2 = 10 + i, 20 + i
        mean = c1 + 4
        d1 = c2 - mean
        d2 = mean - c1
        g = math.gcd(d1, d2)
        r_str = f'{d1//g} : {d2//g}'
        return (f'In what ratio must tea at Rs. {c1}/kg be mixed with tea at Rs. {c2}/kg so that the mixture costs Rs. {mean}/kg?',
                f'A) {r_str}   B) {d2//g} : {d1//g}   C) 1 : 1   D) 2 : 5',
                'A',
                f'By Rule of Alligation: (Cheaper : Dearer) = (Dearer - Mean) : (Mean - Cheaper) = {d1} : {d2} = {r_str}.')
    elif topic_key == 'partnership':
        inv_a = 1000 + i * 200
        inv_b = 1500 + i * 200
        tot_p = 5000 + i * 250
        share_a = round((inv_a / (inv_a + inv_b)) * tot_p)
        return (f'A and B invest Rs. {inv_a} and Rs. {inv_b} in a business. Divide a profit of Rs. {tot_p}. Find A\'s profit.',
                f'A) Rs. {share_a + 50}   B) Rs. {share_a - 40}   C) Rs. {share_a}   D) Rs. {share_a + 100}',
                'C',
                f'Profit shares divide in investment ratio: {inv_a} : {inv_b}. A\'s share = Rs. {share_a}.')
    elif topic_key == 'averages':
        n = 5
        base = 20 + i
        vals = [base + k * 2 for k in range(n)]
        avg = sum(vals) // n
        return (f'Find the average of the five numbers: {vals[0]}, {vals[1]}, {vals[2]}, {vals[3]}, {vals[4]}.',
                f'A) {avg - 2}   B) {avg}   C) {avg + 2}   D) {avg + 4}',
                'B',
                f'Average = Sum / Count = {sum(vals)} / {n} = {avg}.')
    elif topic_key == 'ages':
        diff = 12 + (i % 6)
        r1, r2 = 3, 5
        u = diff // (r2 - r1)
        a_age = r1 * u
        return (f'The ratio of ages of A and B is 3 : 5, and the difference between their ages is {diff} years. Find A\'s age.',
                f'A) {a_age} years   B) {a_age + 4} years   C) {a_age - 3} years   D) {a_age + 8} years',
                'A',
                f'Let ages be 3x and 5x. 5x - 3x = {diff} => 2x = {diff} => x = {u}. A\'s age = 3 \u00d7 {u} = {a_age} years.')
    elif topic_key == 'time_work':
        d1 = 10 + (i % 5) * 2
        d2 = 15 + (i % 5) * 3
        comb = round((d1 * d2) / (d1 + d2), 2)
        return (f'A can finish a task in {d1} days and B in {d2} days. In how many days can they complete it together?',
                f'A) {comb + 1.2:.2f} days   B) {comb:.2f} days   C) {comb - 0.8:.2f} days   D) {comb + 2.5:.2f} days',
                'B',
                f'Together = (d1 \u00d7 d2) / (d1 + d2) = ({d1} \u00d7 {d2}) / ({d1} + {d2}) = {comb:.2f} days.')
    elif topic_key == 'pipes':
        t1 = 6 + (i % 4)
        t2 = 12 + (i % 4) * 2
        net = round((t1 * t2) / (t1 + t2), 2)
        return (f'Pipe A fills a tank in {t1} hours and Pipe B fills it in {t2} hours. How long will both take together?',
                f'A) {net:.2f} hours   B) {net + 1:.2f} hours   C) {net - 0.5:.2f} hours   D) {net + 2:.2f} hours',
                'A',
                f'Combined time = (t1 \u00d7 t2) / (t1 + t2) = ({t1} \u00d7 {t2}) / ({t1} + {t2}) = {net:.2f} hours.')
    elif topic_key == 'speed_distance':
        s = 40 + i * 2
        t = 2 + (i % 4)
        d = s * t
        return (f'A car travels at an average speed of {s} km/h for {t} hours. What total distance does it cover?',
                f'A) {d - 10} km   B) {d + 15} km   C) {d} km   D) {d + 20} km',
                'C',
                f'Distance = Speed \u00d7 Time = {s} \u00d7 {t} = {d} km.')
    elif topic_key == 'trains':
        speed_kmh = 36 + (i % 6) * 18
        speed_ms = (speed_kmh * 5) // 18
        l = 100 + i * 20
        time_sec = round(l / speed_ms, 2)
        return (f'A train {l} m long travels at {speed_kmh} km/h. How many seconds does it take to pass a pole?',
                f'A) {time_sec} sec   B) {time_sec + 2:.2f} sec   C) {time_sec - 1.5:.2f} sec   D) {time_sec + 4:.2f} sec',
                'A',
                f'Speed in m/s = {speed_kmh} \u00d7 (5/18) = {speed_ms} m/s. Time = Distance / Speed = {l} / {speed_ms} = {time_sec} s.')
    elif topic_key == 'boats':
        b = 10 + (i % 6)
        s = 2 + (i % 3)
        down = b + s
        return (f'A boat speed in still water is {b} km/h and stream speed is {s} km/h. Find downstream speed.',
                f'A) {down - 2} km/h   B) {down} km/h   C) {down + 2} km/h   D) {down + 4} km/h',
                'B',
                f'Downstream Speed = Boat Speed + Stream Speed = {b} + {s} = {down} km/h.')
    elif topic_key == 'pnc':
        n = 5 + (i % 4)
        ans = math.factorial(n)
        return (f'In how many distinct ways can {n} distinct books be arranged on a shelf?',
                f'A) {ans - 10}   B) {ans + 20}   C) {ans}   D) {ans * 2}',
                'C',
                f'Number of arrangements = {n}! = {ans}.')
    elif topic_key == 'probability':
        cards = 52
        fav = 4
        return (f'A card is drawn from a standard pack of 52 cards. What is the probability of drawing an Ace?',
                'A) 1/13   B) 1/26   C) 1/52   D) 4/13',
                'A',
                'P(Ace) = Number of Aces / Total cards = 4 / 52 = 1 / 13.')
    elif topic_key == 'mens_2d':
        l = 12 + i
        w = 8 + (i % 5)
        area = l * w
        return (f'A rectangular garden has length {l} m and width {w} m. What is its total area?',
                f'A) {area - 12} sq.m   B) {area} sq.m   C) {area + 15} sq.m   D) {area + 30} sq.m',
                'B',
                f'Area of Rectangle = Length \u00d7 Width = {l} \u00d7 {w} = {area} sq.m.')
    elif topic_key == 'mens_3d':
        s = 3 + (i % 7)
        vol = s ** 3
        return (f'Find the total volume of a cube having an edge length of {s} cm.',
                f'A) {vol} cu.cm   B) {vol + 10} cu.cm   C) {vol - 8} cu.cm   D) {vol + 25} cu.cm',
                'A',
                f'Volume of a cube = a\u00b3 = {s}\u00b3 = {vol} cu.cm.')
    elif topic_key == 'clocks':
        h = 1 + (i % 11)
        angle = int(abs(30 * h - 5.5 * 0))
        angle = min(angle, 360 - angle)
        return (f'What is the angle between the hour hand and minute hand of a clock at {h}:00 sharp?',
                f'A) {angle + 10}\u00b0   B) {angle}\u00b0   C) {angle - 15}\u00b0   D) {angle + 25}\u00b0',
                'B',
                f'Angle = |30H - 5.5M|. At {h}:00, M = 0 => Angle = 30 \u00d7 {h} = {angle}\u00b0.')
    elif topic_key == 'progressions':
        a = 2 + (i % 5)
        d = 3 + (i % 4)
        t10 = a + (10 - 1) * d
        return (f'Find the 10th term of an Arithmetic Progression whose first term is {a} and common difference is {d}.',
                f'A) {t10}   B) {t10 + 3}   C) {t10 - 4}   D) {t10 + 6}',
                'A',
                f'T_n = a + (n - 1)d => T_10 = {a} + 9 \u00d7 {d} = {t10}.')
    elif topic_key == 'quadratics':
        r1 = 2 + (i % 4)
        r2 = 5 + (i % 5)
        b_coeff = -(r1 + r2)
        c_coeff = r1 * r2
        return (f'Find the roots of the quadratic equation: x\u00b2 + ({b_coeff})x + {c_coeff} = 0.',
                f'A) {r1 + 1}, {r2 - 1}   B) {-r1}, {-r2}   C) {r1}, {r2}   D) 1, {c_coeff}',
                'C',
                f'Factoring (x - {r1})(x - {r2}) = 0 yields the roots x = {r1} and x = {r2}.')
    elif topic_key == 'surds':
        base = 2 + (i % 4)
        p1, p2 = 3, 2
        res = base ** (p1 + p2)
        return (f'Simplify the exponential expression: ({base}\u00b3) \u00d7 ({base}\u00b2).',
                f'A) {res - 12}   B) {res + 16}   C) {res}   D) {res * 2}',
                'C',
                f'By exponent laws: a^m \u00d7 a^n = a^(m+n). {base}^(3+2) = {base}^5 = {res}.')
    elif topic_key == 'trig':
        dist = 20 + i * 5
        return (f'From a point on the ground {dist} m away from a tower foot, the angle of elevation to the top is 45\u00b0. Find the tower height.',
                f'A) {dist} m   B) {dist * 2} m   C) {dist + 15} m   D) {dist // 2} m',
                'A',
                f'tan(45\u00b0) = Height / Distance => 1 = Height / {dist} => Height = {dist} m.')
    else:
        tot_students = 500 + i * 50
        pct = 20 + (i % 5) * 5
        count = (tot_students * pct) // 100
        return (f'In a college of {tot_students} students, {pct}% are enrolled in Engineering. How many students are in Engineering?',
                f'A) {count - 10}   B) {count}   C) {count + 15}   D) {count + 25}',
                'B',
                f'Count = ({pct} / 100) \u00d7 {tot_students} = {count}.')

def build_pdf(filename='Aptitude_750_Questions_Complete.pdf'):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=48,
        bottomMargin=48
    )
    styles = getSampleStyleSheet()
    t_style = ParagraphStyle('CoverTitle', parent=styles['Heading1'], fontSize=24, leading=28, textColor=colors.HexColor('#1A365D'), alignment=1, spaceAfter=8)
    sub_style = ParagraphStyle('CoverSub', parent=styles['Normal'], fontSize=11, leading=15, textColor=colors.HexColor('#4A5568'), alignment=1, spaceAfter=18)
    h1_style = ParagraphStyle('TopicHeading', parent=styles['Heading2'], fontSize=13, leading=17, textColor=colors.HexColor('#1E3A8A'), spaceBefore=10, spaceAfter=6, keepWithNext=True)
    q_style = ParagraphStyle('QStyle', parent=styles['Normal'], fontSize=8.5, leading=11.5, textColor=colors.HexColor('#1A202C'))
    opt_style = ParagraphStyle('OptStyle', parent=styles['Normal'], fontSize=8.5, leading=11, textColor=colors.HexColor('#2D3748'), leftIndent=10)
    sol_style = ParagraphStyle('SolStyle', parent=styles['Italic'], fontSize=8, leading=10.5, textColor=colors.HexColor('#2B6CB0'), leftIndent=10)

    story = [
        Spacer(1, 20),
        Paragraph('Quantitative Aptitude Master Question Bank', t_style),
        Paragraph('<b>25 Core Topics &bull; Exactly 30 Questions Per Topic &bull; 750 Fully Solved MCQs</b>', sub_style),
        HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#1E3A8A'), spaceAfter=14)
    ]

    total_counter = 1
    for topic_index, (topic_name, topic_key) in enumerate(TOPICS, 1):
        story.append(Paragraph(f'<b>Topic {topic_index}: {topic_name}</b> (Q{total_counter} - Q{total_counter + 29})', h1_style))
        story.append(HRFlowable(width='100%', thickness=0.5, color=colors.HexColor('#CBD5E0'), spaceAfter=6))
        for q_idx in range(1, 31):
            q_text, opt_text, ans_letter, sol_text = make_question(topic_key, q_idx, total_counter)
            block = [
                Paragraph(f'<b>Q{total_counter}.</b> {q_text}', q_style),
                Paragraph(opt_text, opt_style),
                Paragraph(f'<b>Answer: [{ans_letter}]</b> &mdash; <i>Solution:</i> {sol_text}', sol_style),
                Spacer(1, 4)
            ]
            story.append(KeepTogether(block))
            total_counter += 1
        if topic_index < len(TOPICS):
            story.append(PageBreak())

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f'SUCCESS: Generated {filename} with {total_counter - 1} questions.')

build_pdf()
