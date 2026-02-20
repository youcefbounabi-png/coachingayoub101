export interface Plan {
    name: string;
    amountUSD: number;   // in cents (USD)
    amountDZD: number;   // in whole Dinars
    description: string;
}

export const PLANS: Record<string, Plan> = {
    basic: {
        name: 'GET STARTED — Basic Coaching',
        amountUSD: 14900,
        amountDZD: 20000,
        description: 'Monthly basic coaching subscription',
    },
    pro: {
        name: 'ELITE LEVEL — Pro Coaching',
        amountUSD: 29900,
        amountDZD: 40000,
        description: 'Monthly pro coaching subscription',
    },
    premium: {
        name: 'CONTEST PREP — Premium Coaching',
        amountUSD: 59900,
        amountDZD: 80000,
        description: 'Monthly premium coaching subscription',
    },
};
