import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <OpportunitiesList 
      type="workshop"
      title="Workshops" 
      description="Technical and non-technical workshops to build your skills."
    />
  );
}
