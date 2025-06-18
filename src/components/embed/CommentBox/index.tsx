"use client"

import { useSession } from "next-auth/react";

import { Site } from "@prisma/client";

import AddComment from "./AddComment";
import EmbedLogin from "./EmbedLogin";

const CommentBox = ({ pageId, parentCommentId, className, settings }: { pageId?: string; parentCommentId?: string; className?: string; settings: Partial<Site> }) => {
    const { status } = useSession();
    const isAuthenticated = status === "authenticated";

    return isAuthenticated ? (
        <AddComment pageId={pageId} parentCommentId={parentCommentId} className={className} settings={settings} />
    ) : pageId ? (
        <EmbedLogin className={className} authMethods={["LOCAL", "GITHUB", "GOOGLE"]} />
    ) : null;
}

export default CommentBox;