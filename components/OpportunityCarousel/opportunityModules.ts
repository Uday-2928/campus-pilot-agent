export type OpportunityModule = {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  size: 'large' | 'small';
  category: string;
  icon: string;
  stats?: string;
  color: string;
  image?: string;
};

export const campusPilotModules: OpportunityModule[] = [
  {
    id: "opportunities",
    title: "My Opportunities",
    subtitle: "Your next opportunity starts here.",
    route: "/student/opportunities",
    size: "large",
    category: "opportunities",
    icon: "target",
    stats: "24 Matches",
    color: "bg-blue-500/10 border-blue-500/30 text-blue-700",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "campus-drives",
    title: "Campus Drives",
    subtitle: "Get ready for placement season.",
    route: "/student/campus-drives",
    size: "large",
    category: "placement",
    icon: "business",
    stats: "7 Upcoming",
    color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "internships",
    title: "Internships",
    subtitle: "Discover your next experience.",
    route: "/student/internships",
    size: "large",
    category: "internships",
    icon: "work",
    stats: "142 Open",
    color: "bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#0284c7]",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "hackathons",
    title: "Hackathons",
    subtitle: "Build. Compete. Innovate.",
    route: "/student/hackathons",
    size: "small",
    category: "hackathons",
    icon: "emoji_events",
    stats: "18 Live",
    color: "bg-purple-500/10 border-purple-500/30 text-purple-700",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "workshops",
    title: "Workshops",
    subtitle: "Learn something new.",
    route: "/student/workshops",
    size: "small",
    category: "workshops",
    icon: "co_present",
    stats: "12 Live",
    color: "bg-orange-500/10 border-orange-500/30 text-orange-700",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "training",
    title: "Training & Prep",
    subtitle: "Practice. Improve. Succeed.",
    route: "/student/training",
    size: "small",
    category: "training",
    icon: "school",
    stats: "3 Active",
    color: "bg-amber-500/10 border-amber-500/30 text-amber-700",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "skill-gap",
    title: "Skill Gap",
    subtitle: "Discover what to learn next.",
    route: "/student/skill-gap",
    size: "small",
    category: "skills",
    icon: "psychology",
    color: "bg-rose-500/10 border-rose-500/30 text-rose-700",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "resume",
    title: "Resume Analyzer",
    subtitle: "Make your resume stronger.",
    route: "/student/resume",
    size: "small",
    category: "resume",
    icon: "description",
    stats: "Score: 78/100",
    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "applications",
    title: "Applications",
    subtitle: "Track your career journey.",
    route: "/student/applications",
    size: "small",
    category: "applications",
    icon: "task",
    stats: "4 Pending",
    color: "bg-teal-500/10 border-teal-500/30 text-teal-700",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "deadlines",
    title: "Deadlines",
    subtitle: "Never miss an important date.",
    route: "/student/deadlines",
    size: "small",
    category: "deadlines",
    icon: "event",
    color: "bg-red-500/10 border-red-500/30 text-red-700",
    image: "https://images.unsplash.com/photo-1435527173128-983b87201f4d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "ai-assistant",
    title: "AI Career Assistant",
    subtitle: "Your career, intelligently guided.",
    route: "/student/ai-assistant",
    size: "large",
    category: "ai",
    icon: "smart_toy",
    color: "bg-violet-500/10 border-violet-500/30 text-violet-700",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "scholarships",
    title: "Scholarships",
    subtitle: "Fund your education.",
    route: "/student/scholarships",
    size: "small",
    category: "funding",
    icon: "monetization_on",
    color: "bg-green-500/10 border-green-500/30 text-green-700",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "competitions",
    title: "Competitions",
    subtitle: "Showcase your talent.",
    route: "/student/competitions",
    size: "small",
    category: "competitions",
    icon: "emoji_events",
    color: "bg-pink-500/10 border-pink-500/30 text-pink-700",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=600&auto=format&fit=crop"
  }
];
