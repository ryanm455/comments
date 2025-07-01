import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        error: "/auth/login"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const path = nextUrl.pathname;

            const isDashboard = path.startsWith('/dashboard');
            const isEmbed = path.startsWith('/embed');

            if (isEmbed) return true; // Allow all users

            if (isDashboard) return isLoggedIn; // Only allow logged in users

            if (isLoggedIn) {
                // Redirect authenticated users away from public pages
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true; // Allow unauthenticated users on public pages
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