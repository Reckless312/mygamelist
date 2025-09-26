import React from 'react';
import GameList from "@/components/GameList";

export default function ListPage() {
    return (
        <div className="flex flex-1 w-full flex flex-col relative">
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: "url(/list-background.jpg)" }}/>
            <main className="flex justify-end flex-1 p-8">
                <GameList/>
            </main>
        </div>
    );
}