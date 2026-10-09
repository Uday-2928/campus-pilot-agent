import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <OpportunitiesList 
      type="internship"
      title="Internships" 
      description="Discover internships to kickstart your career."
    />
  );
}
