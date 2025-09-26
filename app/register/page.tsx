import Credentials from "@/components/login/Credentials";
import React from "react";
import Header from "@/components/layout/Header";

export default function RegisterPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-mono">
            <Header/>
            <div className="flex-1 flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/under.jpeg)" }}>
                <Credentials buttonText={"Register"} textRedirectPath={"/login"} textRedirect={"Sign In"} newAccount={true}/>
            </div>
        </div>
    )
}