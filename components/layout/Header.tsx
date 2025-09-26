'use client'

import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Header({username} : {username : string}) {
    const isLoggedIn = username !== "";

    return (
        <div className="bg-[#0F0F14] flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-16 py-5 gap-2 sm:gap-0">
            <Link href="/">
                <header className="text-3xl text-center sm:text-left">MyGameList</header>
            </Link>

            <div className="w-full sm:w-auto flex justify-center sm:justify-end gap-6">
                {isLoggedIn && <DropdownMenu>
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
                </DropdownMenu>}
                {!isLoggedIn &&
                    <Link href={"/login"}>
                    <Button className="bg-[#323237] text-white flex items-center h-7 w-19 cursor-pointer">
                        Sign in
                    </Button>
                </Link>}
            </div>
        </div>);
}