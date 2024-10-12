// src/app/api/auth/[...nextauth]/authOptions.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';
import bcrypt from 'bcrypt';

// Define the custom user type with the role field
interface CustomUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'agent' | 'admin';
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<'email' | 'password', string | undefined>) {
        await dbConnect();

        // Find the user in the database
        const user = await User.findOne({ email: credentials.email }) as CustomUser | null;
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Check the password
        const isValid = await bcrypt.compare(credentials.password!, user.password);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Safely cast the user as a CustomUser to include the role
        const customUser = user as CustomUser;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as 'buyer' | 'seller' | 'agent' | 'admin';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
