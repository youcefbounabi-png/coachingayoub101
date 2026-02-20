
import { ProgramPlan, Achievement, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'PROGRAMS', path: '/programs' },
    { label: 'RESULTS', path: '/results' },
    { label: 'CONTACT', path: '/contact' },
];

export const PROGRAMS: ProgramPlan[] = [
    {
        id: 'basic',
        name: 'GET STARTED',
        level: 'Basic',
        price: '$149/mo',
        duration: 'Monthly Rolling',
        description: 'Perfect for serious lifters who want a real plan. Training and food tracking included.',
        features: [
            'Custom Training Plan',
            'Food & Macro Guide',
            'Every 2 Weeks Check-in',
            'Form Analysis',
            'App Access'
        ],
        accentColor: '#FFFFFF'
    },
    {
        id: 'pro',
        name: 'ELITE LEVEL',
        level: 'Pro',
        price: '$299/mo',
        duration: '12 Week Minimum',
        description: 'For those who want to transform. We track everything. Direct communication with me.',
        features: [
            'Everything in Basic',
            'Weekly Deep Check-in',
            'Supplement Guide',
            'Bloodwork Review',
            'WhatsApp Support',
            'Posing Basics'
        ],
        accentColor: '#F7E025'
    },
    {
        id: 'premium',
        name: 'CONTEST PREP',
        level: 'Premium',
        price: '$599/mo',
        duration: 'Competition Cycle',
        description: 'Ultimate performance. For athletes aiming for the stage or the highest level possible.',
        features: [
            'Daily Monitoring',
            'Competition Plan',
            'Peak Week Protocol',
            'Pro Posing Coach',
            'Priority 24/7 Support',
            'Full Stage Prep'
        ],
        accentColor: '#F7E025'
    }
];

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: "15+ IFBB PRO CARDS",
        category: "Results",
        description: "Successfully guided elite athletes to professional status.",
        year: "2018-2024"
    },
    {
        id: 2,
        title: "OLYMPIA QUALIFIED",
        category: "Athlete Coaching",
        description: "Prepared athletes for the world's biggest bodybuilding stage.",
        year: "2023"
    },
    {
        id: 3,
        title: "NATIONAL CHAMPION",
        category: "Personal Result",
        description: "Overall champion with 12 years of competitive experience.",
        year: "2021"
    }
];
