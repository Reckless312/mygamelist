'use client'
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/layout/SearchBar";
import Header from "@/components/layout/Header";
import React, {ReactNode, useEffect, useState} from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch("http://localhost:8080/api/hq", {
                credentials: "include"
            })

            if (response.status !== 200) {
                setUsername("");
            }

            const data = await response.json();
            setUsername(data.username);
        }

        getUsername().then();
    }, [])

    return (
            <div className="flex flex-col min-h-screen bg-black text-white font-mono">
                <Header username={username}/>
                <div className="bg-[#2F25B1] flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-16 py-3 gap-3 sm:gap-0">
                    <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                        <Link href="/search">
                            <span className="text-xl">Games</span>
                        </Link>
                    </div>

                    <div className="w-full sm:w-auto flex justify-center">
                        <SearchBar />
                    </div>
                </div>

                <main className="flex-grow">{children}</main>

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
    );
};

export default Layout;
