'use client'

import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useAuthentication} from "@/components/AuthenticationContext";

export default function Header() {
    const {username, isAuthenticated, setIsAuthenticated} = useAuthentication() || {};

    const onLogout = async () => {
        if (process.env.NEXT_PUBLIC_API_LOGOUT === undefined) {
            return;
        }

        await fetch(process.env.NEXT_PUBLIC_API_LOGOUT, {
            method: "POST",
            credentials: "include"
        })

        setIsAuthenticated(false);
    }

    if (isAuthenticated === undefined) {
        return null;   
    }

    return (
        <div className="bg-[#0F0F14] flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-16 py-5 gap-2 sm:gap-0">
            <Link href="/">
                <header className="text-3xl text-center sm:text-left">MyGameList</header>
            </Link>

            {isAuthenticated && (
                <div className="w-full sm:w-auto flex justify-center sm:justify-end gap-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="hover:opacity-80 transition-opacity cursor-pointer">
                                <Image src={"/menu.png"} alt={"list-menu"} width={30} height={30}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0F0F14] border border-gray-700 text-white min-w-[150px] font-mono">
                            <Link href={"/list"}>
                                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                                    My List
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href={"/"}>
                        <Button onClick={onLogout} className="bg-[#323237] text-white flex items-center h-7 w-19 cursor-pointer">
                            Logout
                        </Button>
                    </Link>
                </div>
            )}

            {!isAuthenticated && (
                <Link href={"/login"}>
                    <Button className="bg-[#323237] text-white flex items-center h-7 w-19 cursor-pointer">
                        Sign in
                    </Button>
                </Link>
            )}
        </div>
    )
}