import React from "react";
import Credentials from "@/components/login/Credentials";
import Header from "@/components/layout/Header";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-mono">
            <Header/>
            <div className="flex-1 flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/under.jpeg)" }}>
                <Credentials buttonText={"Sing In"} textRedirectPath={"/register"} textRedirect={"Create Account"} newAccount={false}/>
            </div>
        </div>
    );
}