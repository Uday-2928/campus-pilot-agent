import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <OpportunitiesList 
      type="competition"
      title="Competitions" 
      description="Showcase your talent in various technical and non-technical competitions."
    />
  );
}
