"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";


// this is just to check if the user logs out while using the app
// the inital authentication is done by the server this while using
const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const hasRendered = useRef<boolean>(false); // server checks first render so we can ignore
    const { status } = useSession();

    useEffect(() => {
        if (hasRendered.current && status === "unauthenticated") {
            redirect("/auth/login");
        }
        hasRendered.current = true;
    }, [status]);
    return children;
}

export default AuthChecker;