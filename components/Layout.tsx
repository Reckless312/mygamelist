import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 overflow-hidden">
            <div className="absolute inset-0 z-0">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-indigo-500 opacity-20 animate-float"
                        style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 10}s`,
                            animationDelay: `${Math.random() * 5}s`}}/>))}
            </div>

            <div className="relative z-10 p-6 md:p-10 text-white">
                {children}
            </div>

            <div className="absolute bottom-0 left-0 w-full z-0 h-60 md:h-80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="block w-full h-full"
                    preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#5b7cfa" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#7b9bfa" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#9bbbfa" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,160C672,160,768,192,864,192C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default Layout;