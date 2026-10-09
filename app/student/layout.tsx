import React from 'react';
import { StudentTopbar } from '@/components/StudentTopbar';
import { ReturnToDashboardButton } from '@/components/ReturnToDashboardButton';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative flex">
      {/* Background gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 z-10 w-full max-w-[100vw]">
        <StudentTopbar />
        
        {/* Page Content */}
        <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          <ReturnToDashboardButton />
          {children}
        </div>
      </main>
    </div>
  );
}
