"use client"

import {
    useEffect,
} from "react";

import { APP_LOGO } from "lib/meta";
import { useSession } from "next-auth/react";


const Success = () => {
    const { data, status } = useSession()

    const isLoading = status === "loading";

    useEffect(() => {
        if (!isLoading && data) window.close()
    }, [data, isLoading])

    return (
        <div className="bg-gray-50 dark:bg-inherit min-h-screen py-12 px-4 lg:px-8">
            <div className="max-w-md mx-auto">
                <h2 className="h-8 mb-10 md:mb-20 text-4xl text-center">{APP_LOGO}</h2>
                <h2 className="text-center text-4xl font-extrabold mb-8">
                    You Are Successfully Authenticated!
                </h2>
                <p>Please close this window if not done automatically.</p>
                <p>If you just created an account you may need to open the window again to login.</p>
            </div>
        </div>
    )
}

export default Success;