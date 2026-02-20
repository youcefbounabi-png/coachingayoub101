import React, { useState } from 'react';

interface PaymentOptionsProps {
    planId: string;
    planName: string;
    priceUSD: string;
    priceDZD: string;
}

type Gateway = 'paypal' | 'chargily' | null;

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ planId, planName, priceUSD, priceDZD }) => {
    const [selected, setSelected] = useState<Gateway>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChargily = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/chargily/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Network error' }));
                throw new Error(errorData.error || `Chargily checkout failed (${res.status})`);
            }

            const data = await res.json();
            if (!data.checkoutUrl) {
                throw new Error('No checkout URL received from Chargily');
            }

            window.location.href = data.checkoutUrl;
        } catch (err) {
            const e = err as Error;
            const errorMessage = e.message.includes('Failed to fetch') || e.message.includes('Network')
                ? 'Payment service unavailable. Please check your internet connection and try again.'
                : e.message;
            setError(errorMessage);
            setLoading(false);
        }
    };

    const handlePayPal = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Network error' }));
                throw new Error(errorData.error || `PayPal order creation failed (${res.status})`);
            }

            const data = await res.json();
            // Redirect to PayPal approval URL
            if (data.approveUrl) {
                window.location.href = data.approveUrl;
            } else {
                throw new Error('No PayPal approval URL returned. Please check PayPal API configuration.');
            }
        } catch (err) {
            const e = err as Error;
            const errorMessage = e.message.includes('Failed to fetch') || e.message.includes('Network')
                ? 'Payment service unavailable. Please check your internet connection and try again.'
                : e.message;
            setError(errorMessage);
            setLoading(false);
        }
    };

    const gateways = [
        {
            id: 'paypal' as Gateway,
            label: 'PAYPAL',
            sublabel: 'International — USD',
            price: priceUSD,
            color: '#00B4D8',
            badge: 'GLOBAL',
            onClick: handlePayPal,
        },
        {
            id: 'chargily' as Gateway,
            label: 'CHARGILY PAY',
            sublabel: 'Algeria — DZD',
            price: priceDZD ? `${priceDZD} DZD` : '',
            color: '#10B981',
            badge: 'ALGÉRIE',
            onClick: handleChargily,
        },
    ];

    return (
        <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#555', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>
                Choose Payment Method
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {gateways.map(gw => (
                    <button
                        key={gw.id}
                        onClick={() => setSelected(gw.id)}
                        disabled={loading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.1rem 1.25rem',
                            background: selected === gw.id ? '#111' : '#0a0a0a',
                            border: selected === gw.id ? `3px solid ${gw.color}` : '2px solid #222',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                            textAlign: 'left',
                            width: '100%',
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{ color: selected === gw.id ? gw.color : '#fff', fontWeight: 900, fontSize: '13px', letterSpacing: '0.2em' }}>
                                    {gw.label}
                                </span>
                                <span style={{
                                    fontSize: '9px',
                                    fontWeight: 900,
                                    letterSpacing: '0.2em',
                                    color: gw.color,
                                    border: `1px solid ${gw.color}`,
                                    padding: '1px 5px',
                                }}>
                                    {gw.badge}
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px', fontWeight: 600 }}>{gw.sublabel}</div>
                        </div>
                        <div style={{ fontWeight: 900, color: selected === gw.id ? gw.color : '#777', fontSize: '15px' }}>
                            {gw.price}
                        </div>
                    </button>
                ))}
            </div>

            {error && (
                <div style={{ marginTop: '0.75rem', background: '#1a0000', border: '2px solid #EF4444', color: '#EF4444', padding: '0.6rem 0.9rem', fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em' }}>
                    {error}
                </div>
            )}

            {selected && (
                <button
                    onClick={gateways.find(g => g.id === selected)?.onClick}
                    disabled={loading}
                    style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '1.25rem',
                        background: loading ? '#333' : (selected === 'paypal' ? '#00B4D8' : '#10B981'),
                        color: '#000',
                        border: 'none',
                        fontWeight: 900,
                        fontSize: '14px',
                        letterSpacing: '0.25em',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.15s',
                    }}
                >
                    {loading
                        ? 'PROCESSING...'
                        : selected === 'paypal'
                            ? `PAY WITH PAYPAL →`
                            : `PAY WITH CHARGILY →`}
                </button>
            )}

            <p style={{ fontSize: '9px', textAlign: 'center', fontWeight: 700, color: '#444', letterSpacing: '0.15em', marginTop: '0.75rem', textTransform: 'uppercase' }}>
                * Subscription starts upon successful onboarding
            </p>
        </div>
    );
};

export default PaymentOptions;
