
export interface ProgramPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
  description: string;
  level: 'Basic' | 'Pro' | 'Premium';
  accentColor: string;
}

export interface Achievement {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
}

export interface NavItem {
  label: string;
  path: string;
}
