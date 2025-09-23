import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {GamesProvider} from "@/components/GamesContext";
import GameManager from "@/components/GameManager";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <GamesProvider>
            <GameManager/>
            <div className="flex flex-col min-h-screen bg-black text-white font-mono">
                {/* Top Bar */}
                <div className="bg-[#0F0F14] flex items-center justify-between px-16 py-5">
                    <Link href="/">
                        <header className="text-3xl">MyGameList</header>
                    </Link>

                    {/* TO DO: Right side with profile */}
                    <div></div>
                </div>

                {/* Navigation Bar */}
                <div className="bg-[#2F25B1] flex items-center justify-between px-16 py-3">
                    {/* TO DO: Navigation options */}
                    <Link href="/games">
                        <span className="text-xl">Games</span>
                    </Link>

                    {/* TO DO: Search bar */}
                </div>

                {/* Main Content */}
                <main className="flex-grow">{children}</main>

                {/* Bottom Page */}
                <footer className="relative mt-6">
                    <div className="bg-black">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none" className="w-full h-26">
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                className="fill-[#2F25B1]">
                            </path>
                        </svg>
                    </div>

                    <div className="bg-[#2F25B1] px-16 py-8 text-center flex items-center justify-end">
                        <Link href="https://steamcommunity.com/id/faina2k24/">
                            <Image src="/steam-logo-black-transparent.png" alt="Steam Logo" width={60} height={20}/>
                        </Link>
                    </div>
                </footer>
            </div>
        </GamesProvider>
    );
};

export default Layout;
