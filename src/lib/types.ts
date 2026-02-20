export interface ProgramPlan {
    id: string;
    name: string;
    level: string;
    price: string;
    duration: string;
    description: string;
    features: string[];
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
