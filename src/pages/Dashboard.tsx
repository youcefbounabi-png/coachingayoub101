import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

interface Payment {
    id: string;
    gateway: string;
    plan_id: string;
    amount: number;
    currency: string;
    status: string;
    client_name: string;
    client_email: string;
    gateway_payment_id: string;
    created_at: string;
}

interface Lead {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    height: number;
    weight: number;
    health_problems: string;
    physique_photos: string[];
    plan_id: string;
    created_at: string;
}

interface Contact {
    id: string;
    name: string;
    email: string;
    experience: string;
    goal: string;
    message: string;
    created_at: string;
}

type Tab = 'payments' | 'contacts' | 'leads';

const Dashboard: React.FC = () => {
    const [secret, setSecret] = useState('');
    const [inputSecret, setInputSecret] = useState('');
    const [payments, setPayments] = useState<Payment[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>('payments');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async (s: string) => {
        setLoading(true);
        setError('');
        try {
            const [pRes, cRes, lRes] = await Promise.all([
                fetch(`/api/dashboard/payments?secret=${encodeURIComponent(s)}`),
                fetch(`/api/dashboard/contacts?secret=${encodeURIComponent(s)}`),
                fetch(`/api/dashboard/leads?secret=${encodeURIComponent(s)}`),
            ]);

            if (pRes.status === 401 || cRes.status === 401 || lRes.status === 401) {
                setError('Invalid secret. Access denied.');
                setSecret('');
                setLoading(false);
                return;
            }

            const pData = await pRes.json();
            const cData = await cRes.json();
            const lData = await lRes.json();

            if (!pRes.ok) throw new Error(pData.error || 'Failed to fetch payments');
            if (!cRes.ok) throw new Error(cData.error || 'Failed to fetch contacts');
            if (!lRes.ok) throw new Error(lData.error || 'Failed to fetch leads');

            setPayments(pData);
            setContacts(cData);
            setLeads(lData);
            setSecret(s);
        } catch (err) {
            const e = err as Error;
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputSecret.trim()) {
            fetchData(inputSecret.trim());
        }
    };

    const formatAmount = (amount: number, currency: string) => {
        if (currency === 'DZD') return `${(amount / 1).toFixed(0)} DZD`;
        return `$${(amount / 100).toFixed(2)}`;
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleString('fr-DZ', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const gatewayColor = (gw: string) => {
        if (gw === 'paypal') return '#00B4D8';
        if (gw === 'chargily') return '#10B981';
        if (gw === 'stripe') return '#635BFF';
        return '#aaa';
    };

    const statusColor = (s: string) => {
        if (s === 'paid') return '#10B981';
        if (s === 'pending') return '#F59E0B';
        return '#EF4444';
    };

    if (!secret) {
        return (
            <>
                <Helmet>
                    <title>Admin Dashboard | Ayoub CMB</title>
                </Helmet>
                <div style={{
                    minHeight: '100vh',
                    background: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'inherit',
                }}>
                    <form onSubmit={handleLogin} style={{
                        background: '#111',
                        border: '4px solid #e8ff00',
                        padding: '3rem',
                        width: '100%',
                        maxWidth: '420px',
                    }}>
                        <div style={{ fontSize: '11px', letterSpacing: '0.4em', color: '#e8ff00', fontWeight: 900, marginBottom: '0.5rem' }}>
                            AYOUB CMB
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 2rem', lineHeight: 1, letterSpacing: '-0.03em' }}>
                            ADMIN<br />DASHBOARD
                        </h1>
                        {error && (
                            <div style={{ background: '#1a0000', border: '2px solid #EF4444', color: '#EF4444', padding: '0.75rem 1rem', fontWeight: 700, fontSize: '13px', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                                {error}
                            </div>
                        )}
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, letterSpacing: '0.3em', color: '#555', marginBottom: '0.5rem' }}>
                            ADMIN SECRET
                        </label>
                        <input
                            type="password"
                            value={inputSecret}
                            onChange={e => setInputSecret(e.target.value)}
                            placeholder="Enter admin secret..."
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#0a0a0a',
                                border: '2px solid #333',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                marginBottom: '1.5rem',
                            }}
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: loading ? '#333' : '#e8ff00',
                                color: '#0a0a0a',
                                border: 'none',
                                fontWeight: 900,
                                fontSize: '14px',
                                letterSpacing: '0.3em',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                textTransform: 'uppercase',
                            }}
                        >
                            {loading ? 'CHECKING...' : 'ACCESS DASHBOARD →'}
                        </button>
                    </form>
                </div>
            </>
        );
    }

    const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => {
        if (p.currency === 'USD') return sum + p.amount / 100;
        return sum + p.amount / 133;
    }, 0);

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Ayoub CMB</title>
            </Helmet>
            <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'inherit', padding: '2rem' }}>
                {/* Header */}
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '11px', letterSpacing: '0.4em', color: '#e8ff00', fontWeight: 900, marginBottom: '0.25rem' }}>
                                AYOUB CMB
                            </div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>ADMIN DASHBOARD</h1>
                        </div>
                        <button
                            onClick={() => { setSecret(''); setPayments([]); setContacts([]); }}
                            style={{ background: 'transparent', border: '2px solid #333', color: '#aaa', padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 700, fontSize: '12px', letterSpacing: '0.2em' }}
                        >
                            LOGOUT
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                        {[
                            { label: 'TOTAL PAYMENTS', value: payments.length },
                            { label: 'SUCCESSFUL', value: payments.filter(p => p.status === 'paid').length },
                            { label: 'ATHLETE PROTOCOLS', value: leads.length },
                            { label: 'EST. REVENUE (USD)', value: `$${totalRevenue.toFixed(0)}` },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: '#111', border: '2px solid #222', padding: '1.25rem 1.5rem' }}>
                                <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#555', fontWeight: 900, marginBottom: '0.5rem' }}>{stat.label}</div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e8ff00' }}>{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '2px solid #222', marginBottom: '1.5rem', overflowX: 'auto', gap: '0.5rem' }}>
                        {(['payments', 'leads', 'contacts'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '3px solid #e8ff00' : '3px solid transparent',
                                    color: activeTab === tab ? '#e8ff00' : '#555',
                                    fontWeight: 900,
                                    fontSize: '11px',
                                    letterSpacing: '0.2em',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '-2px',
                                }}
                            >
                                {tab === 'payments' ? `PAYMENTS (${payments.length})` :
                                    tab === 'leads' ? `PROTOCOLS (${leads.length})` :
                                        `CONTACTS (${contacts.length})`}
                            </button>
                        ))}
                        <button
                            onClick={() => fetchData(secret)}
                            disabled={loading}
                            style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#555', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', padding: '0.5rem' }}
                        >
                            {loading ? '...' : '↻ REFRESH'}
                        </button>
                    </div>

                    {/* Payments Table */}
                    {activeTab === 'payments' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #222' }}>
                                        {['DATE', 'CLIENT', 'EMAIL', 'GATEWAY', 'PLAN', 'AMOUNT', 'STATUS'].map(h => (
                                            <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '10px', color: '#555', fontWeight: 900, letterSpacing: '0.3em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.length === 0 ? (
                                        <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#333', fontWeight: 700 }}>No payments yet</td></tr>
                                    ) : payments.map(p => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                            <td style={{ padding: '0.9rem 1rem', color: '#777', whiteSpace: 'nowrap' }}>{formatDate(p.created_at)}</td>
                                            <td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>{p.client_name || '—'}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa' }}>{p.client_email || '—'}</td>
                                            <td style={{ padding: '0.9rem 1rem' }}>
                                                <span style={{ color: gatewayColor(p.gateway), fontWeight: 900, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{p.gateway}</span>
                                            </td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa', textTransform: 'uppercase', fontSize: '12px' }}>{p.plan_id}</td>
                                            <td style={{ padding: '0.9rem 1rem', fontWeight: 900, color: '#e8ff00' }}>{formatAmount(p.amount, p.currency)}</td>
                                            <td style={{ padding: '0.9rem 1rem' }}>
                                                <span style={{ color: statusColor(p.status), fontWeight: 900, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* Leads Table */}
                    {activeTab === 'leads' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #222' }}>
                                        {['DATE', 'ATHLETE', 'EMAIL', 'STATS', 'PLAN', 'PHOTOS'].map(h => (
                                            <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '10px', color: '#555', fontWeight: 900, letterSpacing: '0.3em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.length === 0 ? (
                                        <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#333', fontWeight: 700 }}>No protocols yet</td></tr>
                                    ) : leads.map(l => (
                                        <tr key={l.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                            <td style={{ padding: '0.9rem 1rem', color: '#777', whiteSpace: 'nowrap' }}>{formatDate(l.created_at)}</td>
                                            <td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>{l.full_name}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa' }}>{l.email}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa' }}>{l.height}cm / {l.weight}kg</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa', textTransform: 'uppercase', fontSize: '11px' }}>{l.plan_id}</td>
                                            <td style={{ padding: '0.9rem 1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    {l.physique_photos?.map((p, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={`https://samhtbfitcylijdejiye.supabase.co/storage/v1/object/public/physique-photos/${p}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={{
                                                                display: 'inline-block',
                                                                padding: '0.25rem 0.5rem',
                                                                background: '#222',
                                                                color: '#e8ff00',
                                                                textDecoration: 'none',
                                                                fontSize: '10px',
                                                                fontWeight: 900,
                                                                border: '1px solid #e8ff00'
                                                            }}
                                                        >
                                                            #{idx + 1}
                                                        </a>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Contacts Table */}
                    {activeTab === 'contacts' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #222' }}>
                                        {['DATE', 'NAME', 'EMAIL', 'EXPERIENCE', 'GOAL', 'MESSAGE'].map(h => (
                                            <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '10px', color: '#555', fontWeight: 900, letterSpacing: '0.3em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.length === 0 ? (
                                        <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#333', fontWeight: 700 }}>No contacts yet</td></tr>
                                    ) : contacts.map(c => (
                                        <tr key={c.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                            <td style={{ padding: '0.9rem 1rem', color: '#777', whiteSpace: 'nowrap' }}>{formatDate(c.created_at)}</td>
                                            <td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>{c.name}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa' }}>{c.email}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa', textTransform: 'capitalize' }}>{c.experience || '—'}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#aaa', textTransform: 'capitalize', maxWidth: '180px' }}>{c.goal || '—'}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: '#777', maxWidth: '300px' }}>
                                                <span title={c.message} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {c.message || '—'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
