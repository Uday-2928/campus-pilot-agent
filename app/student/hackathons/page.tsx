import React from 'react';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function Page() {
  return (
    <OpportunitiesList 
      type="hackathon"
      title="Hackathons" 
      description="Discover upcoming hackathons, test your skills, and build innovative projects."
      gradientColor="from-purple-500/20"
    />
  );
}
