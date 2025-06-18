"use client"
import { useEffect } from "react";

import {
  signIn,
  useSession,
} from "next-auth/react";
import { useParams } from "next/navigation";

const PopupPage = () => {
    const { method } = useParams();
    const { data, status } = useSession()

    const isLoading = status === "loading";

    useEffect(() => {
        if (!isLoading && !data) void signIn(method as string)
        if (!isLoading && data) window.close()
    }, [data, isLoading, method])

    return null
}

export default PopupPage