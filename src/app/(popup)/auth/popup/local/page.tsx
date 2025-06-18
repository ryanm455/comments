"use client"

import {
    Suspense,
    useEffect,
    useReducer,
} from "react";

import { LoginForm } from "app/(main)/auth/login/form";
import { RegisterForm } from "app/(main)/auth/signup/form";
import {
    Button,
    Card,
} from "components/ui";
import { APP_LOGO } from "lib/meta";
import { useSession } from "next-auth/react";

enum AuthMode {
    SIGNUP,
    LOGIN
}

const Local = () => {
    const [authMode, toggleAuthMode] = useReducer(r => r == AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN, AuthMode.LOGIN);

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
                    {authMode === AuthMode.LOGIN ? "Sign in to your account" : "Create an account"}
                </h2>
                <Card>
                    <Button onClick={toggleAuthMode} className="w-full mb-6">{authMode == AuthMode.LOGIN ? "Register Instead" : "Login Instead"}</Button>
                    <Suspense>
                        {authMode === AuthMode.LOGIN ? <LoginForm useCallback={false} /> : <RegisterForm useCallback={false} />}
                    </Suspense>
                </Card>
            </div>
        </div>
    )
}

export default Local;