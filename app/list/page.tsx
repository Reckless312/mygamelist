import React from 'react';
import List from "@/components/list/List";
import Header from "@/components/layout/Header";

export default function ListPage() {
    return (
        <div className="flex flex-col min-h-screen  text-white font-mono">
            <Header/>
            <div className="flex flex-1 w-full relative">
                <div className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: "url(/list-background.jpg)" }}/>
                <main className="flex justify-end flex-1 p-8">
                    <List/>
                </main>
            </div>
        </div>
    );
}