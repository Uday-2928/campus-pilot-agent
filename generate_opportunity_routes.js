const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'hackathons', title: 'Hackathons', desc: 'Discover and participate in upcoming hackathons to showcase your skills and build innovative solutions.', type: 'hackathon' },
  { path: 'internships', title: 'Internships', desc: 'Find internships that match your skills and kickstart your career.', type: 'internship' },
  { path: 'campus-drives', title: 'Campus Drives', desc: 'Get placement opportunities and campus recruitment drives from top companies.', type: 'drive' },
  { path: 'scholarships', title: 'Scholarships', desc: 'Explore scholarships and fellowships to support your education.', type: 'scholarship' }
];

const basePath = path.join(__dirname, 'app');

routes.forEach(route => {
  const dirPath = path.join(basePath, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const fileContent = `import React from 'react';
import Navbar from '@/components/Navbar';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <OpportunitiesList 
          type="${route.type}" 
          title="${route.title}" 
          description="${route.desc}" 
        />
      </main>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), fileContent);
});

console.log('Top-level opportunity routes created!');
