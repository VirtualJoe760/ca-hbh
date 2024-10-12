// src/types/next-auth.d.ts

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'buyer' | 'seller' | 'agent' | 'admin'; // Include 'agent'
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: 'buyer' | 'seller' | 'agent' | 'admin'; // Include 'agent'
    };
  }

  interface JWT {
    role: 'buyer' | 'seller' | 'agent' | 'admin'; // Include 'agent'
  }
}
