import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnArtisanDashboard = nextUrl.pathname.startsWith('/artisan-dashboard');
      
      // Protect dashboard routes
      if (isOnDashboard || isOnArtisanDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      
      return true;
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;