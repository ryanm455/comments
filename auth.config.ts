import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        error: "/auth/login"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAllowedPage = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/embed');
            if (isAllowedPage) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) token.id = user.id

            return token
        },
        async session({ session, token, user }) {
            // @ts-ignore
            if (session.user) session.user.id = token.id

            return session
        }
    },
    providers: [],
    trustHost: true,
} satisfies NextAuthConfig;