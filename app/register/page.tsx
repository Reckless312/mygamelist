import CredentialsForm from "@/components/CredentialsForm";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/under.jpeg)" }}>
            <CredentialsForm buttonText={"Register"} textRedirectPath={"/login"} textRedirect={"Sign In"} newAccount={true}/>
        </div>
    )
}