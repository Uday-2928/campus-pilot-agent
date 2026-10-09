import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <OpportunitiesList 
      type="campus_drive"
      title="Campus Drives" 
      description="Upcoming campus placement drives and hiring events."
    />
  );
}
