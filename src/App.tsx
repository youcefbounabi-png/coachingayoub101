import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AnimatedBackground from './components/AnimatedBackground';

// Route-based code splitting with React.lazy
const Home = lazy(() => import('./sections/Home'));
const About = lazy(() => import('./sections/About'));
const Programs = lazy(() => import('./sections/Programs'));
const ProgramDetail = lazy(() => import('./sections/ProgramDetail'));
const Results = lazy(() => import('./sections/Results'));
const ResultDetail = lazy(() => import('./sections/ResultDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Success = lazy(() => import('./pages/Success'));
const Cancel = lazy(() => import('./pages/Cancel'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Minimal loading skeleton matching the dark theme
const PageLoader: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-border border-t-accent animate-spin"></div>
            <span className="text-xs font-black tracking-[0.4em] text-gray-600 uppercase">Loading</span>
        </div>
    </div>
);

// Layout wrapper — renders Navbar + Footer around child routes via Outlet
const MainLayout: React.FC = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (
        <div className="flex flex-col min-h-screen relative">
            {/* <AnimatedBackground /> */}
            <CustomCursor />
            <Navbar />
            <main className="flex-grow relative z-10">
                <Outlet />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Dashboard — standalone, no Navbar/Footer */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* All other pages wrapped in MainLayout (Navbar + Footer) */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/programs/:id" element={<ProgramDetail />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/results/:id" element={<ResultDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
