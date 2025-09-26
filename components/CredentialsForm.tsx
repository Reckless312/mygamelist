'use client'

import {Button} from "@/components/ui/button";
import Form from "next/form";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function CredentialsForm({buttonText, textRedirectPath, textRedirect, newAccount}: { buttonText: string, textRedirectPath: string, textRedirect:string, newAccount: boolean}) {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (formEvent: React.FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        setErrorMessage("");

        const apiRoute = newAccount ? "http://localhost:8080/api/register" : "http://localhost:8080/api/login";

        const response = await fetch(apiRoute, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, password: password}),
            credentials: "include"
        })

        const data = await response.json();

        if (response.status !== 200) {
            setErrorMessage(await data.message);
            return;
        }

        router.push("/");
    }

    return (<Form onSubmit={handleSubmit} action="/" scroll={false} className="w-full max-w-md">
        <div className="bg-[#0F0F14]/80 rounded p-8">
            <div className="space-y-6">
                <label htmlFor="username" className="text-blue-400 text-sm font-mono">
                    Username
                </label>
                <input id="username" name="username" type="text" value={username} className="w-full bg-slate-700/50 hover:bg-slate-600/50
                         rounded text-white px-4 h-12 focus:outline-none focus:ring-0" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password" className="text-blue-400 text-sm font-mono">
                    Password
                </label>
                <input id="password" name="password" type="password" value={password} className="w-full bg-slate-700/50 hover:bg-slate-600/50
                         rounded text-white px-4 h-12 focus:outline-none focus:ring-0" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            {errorMessage && (
                <h1 className="text-red-500 font-mono text-center mt-4">{errorMessage}</h1>
            )}

            <div className="space-y-3 mt-8">
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-mono rounded cursor-pointer"
                        disabled={(username === "" || password === "") || (username.length < 3 || password.length < 3)}>
                    {buttonText}
                </Button>


                <Link href={textRedirectPath}>
                    <h1 className={"text-blue-400 hover:text-blue-500 font-mono text-center"}>{textRedirect}</h1>
                </Link>
            </div>
        </div>
    </Form>)
}