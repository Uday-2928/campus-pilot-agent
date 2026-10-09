import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function ScholarshipsPage() {
  return (
    <OpportunitiesList 
      type="scholarship"
      title="Scholarships" 
      description="Find scholarships, grants, and financial aid opportunities."
      gradientColor="from-green-500/20"
    />
  );
}
