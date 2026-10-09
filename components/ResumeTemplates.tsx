import React from 'react';

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  education: string;
  skills: string;
  experience: string;
  projects: string;
}

export interface TemplateProps {
  data: ResumeData;
}

// 01: Executive Modern Navy
export const Template01 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-800 border-t-8 border-[#1e3a8a] box-border">
    <h1 className="text-4xl font-bold text-[#1e3a8a] mb-1 uppercase tracking-wider text-center">{data.name}</h1>
    <p className="text-sm text-gray-600 mb-6 border-b-2 border-[#1e3a8a] pb-4 text-center">
      {data.location} • {data.phone} • {data.email}
    </p>
    <div className="mb-6">
      <h2 className="text-lg font-bold text-[#1e3a8a] mb-2 border-l-4 border-[#1e3a8a] pl-2 uppercase tracking-wide">Professional Summary</h2>
      <p className="text-sm leading-relaxed">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#1e3a8a] mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">Skills</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
      <div className="col-span-2 space-y-6 border-l border-gray-200 pl-8">
        <div>
          <h2 className="text-lg font-bold text-[#1e3a8a] mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1e3a8a] mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1e3a8a] mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
    </div>
  </div>
);

// 02: Minimalist Ivy League
export const Template02 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-12 font-serif text-gray-900 box-border leading-relaxed">
    <h1 className="text-4xl font-normal text-center mb-2 tracking-wide">{data.name}</h1>
    <p className="text-sm text-center mb-8 italic">
      {data.location} | {data.phone} | {data.email}
    </p>
    <div className="mb-6">
      <h2 className="text-lg font-semibold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1">Professional Profile</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1">Education</h2>
      <div className="text-sm whitespace-pre-wrap">{data.education}</div>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1">Technical Projects</h2>
      <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1">Experience & Leadership</h2>
      <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1">Technical Skills</h2>
      <p className="text-sm">{data.skills}</p>
    </div>
  </div>
);

// 03: Tech Slate & Teal Split
export const Template03 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none font-sans text-gray-800 flex box-border">
    <div className="w-[35%] bg-[#0f172a] text-white p-8">
      <h1 className="text-3xl font-bold mb-2 text-[#38bdf8] uppercase tracking-wide">{data.name}</h1>
      <h2 className="text-sm font-medium text-gray-300 mb-8 uppercase tracking-wider">{data.title}</h2>
      <div className="space-y-6 text-sm">
        <div>
          <h3 className="font-bold text-[#38bdf8] mb-3 uppercase tracking-wider border-b border-white/20 pb-1">Contact</h3>
          <p className="text-gray-300 mb-1">{data.location}</p>
          <p className="text-gray-300 mb-1">{data.phone}</p>
          <p className="text-gray-300">{data.email}</p>
        </div>
        <div>
          <h3 className="font-bold text-[#38bdf8] mb-3 uppercase tracking-wider border-b border-white/20 pb-1">Skills</h3>
          <ul className="space-y-1.5 text-gray-300">
            {data.skills.split(',').map((s, i) => <li key={i}>{s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
    <div className="w-[65%] p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0f172a] mb-3 uppercase tracking-wider border-b-2 border-[#38bdf8] inline-block">Summary</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0f172a] mb-3 uppercase tracking-wider border-b-2 border-[#38bdf8] inline-block">Experience</h2>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data.experience}</div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0f172a] mb-3 uppercase tracking-wider border-b-2 border-[#38bdf8] inline-block">Projects</h2>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data.projects}</div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0f172a] mb-3 uppercase tracking-wider border-b-2 border-[#38bdf8] inline-block">Education</h2>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data.education}</div>
      </div>
    </div>
  </div>
);

// 04: Swiss Clean Grid
export const Template04 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-900 box-border">
    <div className="flex justify-between items-end border-b-2 border-gray-900 pb-4 mb-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight uppercase">{data.name}</h1>
        <h2 className="text-md text-gray-500 mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs text-gray-600">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-6 mb-6 border-b border-gray-200 pb-6">
      <div className="col-span-1 font-bold uppercase text-xs tracking-wider">Profile</div>
      <div className="col-span-3 text-sm">{data.summary}</div>
    </div>
    <div className="grid grid-cols-4 gap-6 mb-6 border-b border-gray-200 pb-6">
      <div className="col-span-1 font-bold uppercase text-xs tracking-wider">Education</div>
      <div className="col-span-3 text-sm whitespace-pre-wrap">{data.education}</div>
    </div>
    <div className="grid grid-cols-4 gap-6 mb-6 border-b border-gray-200 pb-6">
      <div className="col-span-1 font-bold uppercase text-xs tracking-wider">Experience</div>
      <div className="col-span-3 text-sm whitespace-pre-wrap">{data.experience}</div>
    </div>
    <div className="grid grid-cols-4 gap-6 mb-6 border-b border-gray-200 pb-6">
      <div className="col-span-1 font-bold uppercase text-xs tracking-wider">Projects</div>
      <div className="col-span-3 text-sm whitespace-pre-wrap">{data.projects}</div>
    </div>
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 font-bold uppercase text-xs tracking-wider">Competencies</div>
      <div className="col-span-3 text-sm">{data.skills}</div>
    </div>
  </div>
);

// 05: Modern Ruby & Burgundy Accent
export const Template05 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none font-sans text-gray-800 box-border border-t-[16px] border-[#881337]">
    <div className="bg-[#9f1239] text-white p-8 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-1">{data.name}</h1>
        <h2 className="text-md font-medium text-[#fda4af]">{data.title}</h2>
      </div>
      <div className="text-right text-xs font-semibold text-[#ffe4e6] leading-relaxed">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="px-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#881337] mb-2 uppercase border-b border-[#fecdd3] pb-1">Professional Summary</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#881337] mb-2 uppercase border-b border-[#fecdd3] pb-1">Experience</h2>
            <div className="text-sm text-gray-700 whitespace-pre-wrap mb-4 leading-relaxed">{data.experience}</div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#881337] mb-2 uppercase border-b border-[#fecdd3] pb-1">Projects</h2>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data.projects}</div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#881337] mb-2 uppercase border-b border-[#fecdd3] pb-1">Education</h2>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data.education}</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#fff1f2] p-4 rounded-xl border border-[#fecdd3]">
            <h2 className="text-md font-bold text-[#881337] mb-3 uppercase tracking-wide">Core Skills</h2>
            <ul className="text-sm space-y-2 text-gray-800 font-medium">
              {data.skills.split(',').map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e11d48]"></div>
                  {s.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 06: Tech Emerald & Mint Developer
export const Template06 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-800 box-border border-l-[16px] border-[#059669]">
    <h1 className="text-4xl font-bold text-[#065f46] mb-1">{data.name}</h1>
    <h2 className="text-md font-medium text-[#059669] mb-4">{data.title}</h2>
    <p className="text-xs text-gray-500 mb-8 pb-4 border-b border-[#34d399]">
      {data.location} • {data.phone} • {data.email}
    </p>
    <div className="mb-6 bg-[#ecfdf5] p-4 rounded-md border border-[#a7f3d0]">
      <h2 className="text-lg font-bold text-[#065f46] mb-2">Objective & Summary</h2>
      <p className="text-sm leading-relaxed">{data.summary}</p>
    </div>
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#065f46] mb-2 border-b border-[#34d399]">Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#065f46] mb-2 border-b border-[#34d399]">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#065f46] mb-2 border-b border-[#34d399]">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#065f46] mb-2 border-b border-[#34d399]">Technical Competencies</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {data.skills.split(',').map((s, i) => (
              <span key={i} className="bg-[#d1fae5] text-[#065f46] px-2 py-1 rounded">{s.trim()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 07: Modern Compact Infographic
export const Template07 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-800 box-border">
    <div className="flex justify-between items-center mb-6 border-b-2 border-[#2563eb] pb-4">
      <div>
        <h1 className="text-4xl font-extrabold text-[#1d4ed8] uppercase tracking-tighter">{data.name}</h1>
        <h2 className="text-sm text-gray-500 mt-1">{data.title} • {data.location}</h2>
      </div>
      <div className="text-right text-xs text-gray-600">
        <p>Phone: {data.phone}</p>
        <p>Email: {data.email}</p>
      </div>
    </div>
    <div className="mb-6">
      <h2 className="text-md font-bold text-[#1d4ed8] uppercase mb-1">Professional Summary</h2>
      <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-[#bfdbfe] rounded-xl p-4">
        <h2 className="text-md font-bold text-[#1d4ed8] uppercase mb-3">Project Work</h2>
        <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
      </div>
      <div className="border border-[#bfdbfe] rounded-xl p-4">
        <h2 className="text-md font-bold text-[#1d4ed8] uppercase mb-3">Skill Levels</h2>
        <ul className="text-sm space-y-1">
          {data.skills.split(',').map((s, i) => (
            <li key={i} className="flex justify-between border-b border-gray-100 py-1">
              <span>{s.trim()}</span> <span className="text-[#2563eb] font-bold">Expert</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[#bfdbfe] rounded-xl p-4">
        <h2 className="text-md font-bold text-[#1d4ed8] uppercase mb-3">Education Milestones</h2>
        <div className="text-sm whitespace-pre-wrap">{data.education}</div>
      </div>
      <div className="border border-[#bfdbfe] rounded-xl p-4">
        <h2 className="text-md font-bold text-[#1d4ed8] uppercase mb-3">Experience</h2>
        <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
      </div>
    </div>
  </div>
);

// 08: Charcoal Minimalist Boxed
export const Template08 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-900 box-border">
    <div className="bg-[#1f2937] text-white p-6 rounded-t-xl flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-wider">{data.name}</h1>
        <h2 className="text-sm text-gray-400 mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs text-gray-300">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
      <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">Professional Summary</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="border border-gray-300 rounded-lg p-5 shadow-sm">
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">Technical Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div className="border border-gray-300 rounded-lg p-5 shadow-sm">
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div className="border border-gray-300 rounded-lg p-5 shadow-sm">
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="col-span-1 space-y-6">
        <div className="border border-gray-300 rounded-lg p-5 shadow-sm">
          <h2 className="text-md font-bold uppercase mb-2 border-b pb-1">Skills</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 09: Creative Coral & Purple Accent
export const Template09 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-800 box-border">
    <div className="border-b-4 border-[#6d28d9] pb-4 mb-6 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-extrabold text-[#6d28d9] tracking-tighter uppercase">{data.name}</h1>
      </div>
      <div className="text-right text-xs text-gray-600 flex gap-4">
        <span>{data.location}</span>
        <span>Phone: {data.phone}</span>
        <span>{data.email}</span>
      </div>
    </div>
    <div className="mb-6 bg-[#f5f3ff] border-l-4 border-[#6d28d9] p-4">
      <h2 className="text-md font-bold text-[#6d28d9] uppercase mb-1">Professional Summary</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div>
          <h2 className="text-md font-bold text-[#6d28d9] uppercase mb-2">Featured Project</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#6d28d9] uppercase mb-2">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#6d28d9] uppercase mb-2">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="col-span-1 space-y-6 bg-[#fdf2f8] p-4 rounded-xl border border-[#fbcfe8]">
        <div>
          <h2 className="text-md font-bold text-[#be185d] uppercase mb-2">Technical Skills</h2>
          <ul className="text-sm space-y-1 text-[#831843]">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 10: ATS Classic Single-Column
export const Template10 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-12 font-serif text-black box-border">
    <h1 className="text-3xl font-bold text-center mb-1 uppercase">{data.name}</h1>
    <p className="text-sm text-center mb-6 pb-2 border-b border-black">
      {data.location} | Phone: {data.phone} | Email: {data.email}
    </p>
    <div className="mb-4">
      <h2 className="text-md font-bold uppercase mb-1 border-b border-black">Professional Summary</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="mb-4">
      <h2 className="text-md font-bold uppercase mb-1 border-b border-black">Education</h2>
      <div className="text-sm whitespace-pre-wrap">{data.education}</div>
    </div>
    <div className="mb-4">
      <h2 className="text-md font-bold uppercase mb-1 border-b border-black">Experience</h2>
      <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
    </div>
    <div className="mb-4">
      <h2 className="text-md font-bold uppercase mb-1 border-b border-black">Academic Projects</h2>
      <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
    </div>
    <div className="mb-4">
      <h2 className="text-md font-bold uppercase mb-1 border-b border-black">Technical Skills</h2>
      <p className="text-sm">{data.skills}</p>
    </div>
  </div>
);

// 11: Petroleum Blue Two-Tone
export const Template11 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none font-sans text-gray-800 box-border p-10">
    <div className="bg-[#1e40af] text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-3xl font-bold uppercase">{data.name}</h1>
        <h2 className="text-sm text-[#93c5fd] mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="border border-[#bfdbfe] rounded-lg p-5 mb-6">
      <h2 className="text-md font-bold text-[#1e40af] uppercase mb-2">About Me</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="border border-[#bfdbfe] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#1e40af] uppercase mb-2">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div className="border border-[#bfdbfe] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#1e40af] uppercase mb-2">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="border border-[#bfdbfe] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#1e40af] uppercase mb-2">Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div className="border border-[#bfdbfe] rounded-lg p-5 bg-[#eff6ff]">
          <h2 className="text-md font-bold text-[#1e40af] uppercase mb-2">Skills & Competency</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 12: Warm Amber & Slate Engineering
export const Template12 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none font-sans text-gray-800 box-border p-10">
    <div className="flex justify-between items-end border-b-2 border-[#b45309] pb-4 mb-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#78350f] uppercase tracking-wide">{data.name}</h1>
        <h2 className="text-md font-bold text-[#b45309] mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs text-gray-600">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-5 mb-6">
      <h2 className="text-md font-bold text-[#92400e] uppercase mb-2">Professional Summary</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="border border-[#fde68a] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#92400e] uppercase mb-2">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div className="border border-[#fde68a] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#92400e] uppercase mb-2">Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div className="border border-[#fde68a] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#92400e] uppercase mb-2">Education History</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="col-span-1 space-y-6">
        <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg p-5">
          <h2 className="text-md font-bold text-[#92400e] uppercase mb-2">Skills Matrix</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 13: Modern Nordic Minimal
export const Template13 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-12 font-sans text-gray-700 box-border">
    <h1 className="text-4xl font-semibold text-[#334155] mb-2 uppercase">{data.name}</h1>
    <p className="text-xs text-gray-500 mb-8 pb-4 border-b border-gray-200">
      {data.location} • {data.phone} • {data.email}
    </p>
    <div className="mb-8">
      <h2 className="text-sm font-bold text-[#475569] uppercase mb-2 tracking-widest">Profile</h2>
      <p className="text-sm leading-relaxed">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div>
          <h2 className="text-sm font-bold text-[#475569] uppercase mb-2 tracking-widest border-b border-gray-200 pb-2">Experience</h2>
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#475569] uppercase mb-2 tracking-widest border-b border-gray-200 pb-2">Projects</h2>
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#475569] uppercase mb-2 tracking-widest border-b border-gray-200 pb-2">Education</h2>
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{data.education}</div>
        </div>
      </div>
      <div className="col-span-1 space-y-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-sm font-bold text-[#475569] uppercase mb-4 tracking-widest">Technical Skills</h2>
          <ul className="text-sm space-y-2">
            {data.skills.split(',').map((s, i) => <li key={i} className="border-b border-gray-200 pb-1">{s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 14: High-Impact Crimson Bordered
export const Template14 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-10 font-sans text-gray-800 box-border border-l-[12px] border-[#991b1b]">
    <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#991b1b] uppercase tracking-wide">{data.name}</h1>
        <h2 className="text-md text-gray-500 mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs text-gray-500">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="mb-6">
      <h2 className="text-md font-bold text-[#991b1b] uppercase mb-2">Professional Summary</h2>
      <p className="text-sm">{data.summary}</p>
    </div>
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-md font-bold text-[#991b1b] uppercase mb-2 border-l-4 border-[#991b1b] pl-2">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#991b1b] uppercase mb-2 border-l-4 border-[#991b1b] pl-2">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-md font-bold text-[#991b1b] uppercase mb-2 border-l-4 border-[#991b1b] pl-2">Projects</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#991b1b] uppercase mb-2 border-l-4 border-[#991b1b] pl-2">Skills</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// 15: Modern Royal Purple Executive
export const Template15 = ({ data }: TemplateProps) => (
  <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none font-sans text-gray-800 box-border p-10">
    <div className="bg-[#4c1d95] text-white p-8 rounded-t-xl mb-6 shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-widest">{data.name}</h1>
        <h2 className="text-sm text-[#c4b5fd] mt-1">{data.title}</h2>
      </div>
      <div className="text-right text-xs">
        <p>{data.location}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
      </div>
    </div>
    <div className="mb-6">
      <h2 className="text-md font-bold text-[#4c1d95] uppercase mb-2 border-b border-gray-200 pb-1">Professional Summary</h2>
      <p className="text-sm leading-relaxed">{data.summary}</p>
    </div>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div>
          <h2 className="text-md font-bold text-[#4c1d95] uppercase mb-2 border-b border-gray-200 pb-1">Experience</h2>
          <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#4c1d95] uppercase mb-2 border-b border-gray-200 pb-1">Project Work</h2>
          <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
        </div>
        <div>
          <h2 className="text-md font-bold text-[#4c1d95] uppercase mb-2 border-b border-gray-200 pb-1">Education</h2>
          <div className="text-sm whitespace-pre-wrap">{data.education}</div>
        </div>
      </div>
      <div className="col-span-1 space-y-6">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h2 className="text-md font-bold text-[#4c1d95] uppercase mb-3 border-b border-gray-200 pb-1">Skills</h2>
          <ul className="text-sm space-y-1">
            {data.skills.split(',').map((s, i) => <li key={i}>• {s.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const templatesArray = [
  { id: '01', name: 'Modern Navy', component: Template01 },
  { id: '02', name: 'Ivy League', component: Template02 },
  { id: '03', name: 'Teal Split', component: Template03 },
  { id: '04', name: 'Swiss Grid', component: Template04 },
  { id: '05', name: 'Ruby Accent', component: Template05 },
  { id: '06', name: 'Emerald Dev', component: Template06 },
  { id: '07', name: 'Infographic', component: Template07 },
  { id: '08', name: 'Charcoal Box', component: Template08 },
  { id: '09', name: 'Coral Purple', component: Template09 },
  { id: '10', name: 'ATS Classic', component: Template10 },
  { id: '11', name: 'Petroleum Two', component: Template11 },
  { id: '12', name: 'Warm Amber', component: Template12 },
  { id: '13', name: 'Nordic Minimal', component: Template13 },
  { id: '14', name: 'Crimson Border', component: Template14 },
  { id: '15', name: 'Royal Executive', component: Template15 },
];
