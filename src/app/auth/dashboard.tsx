// src/app/pages/dashboard.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
  
    if (status === 'loading') {
      return <p>Loading...</p>;
    }
  
    if (!session || !session.user) {
      router.push('/auth/signin'); // Redirect if not authenticated
      return null;
    }
  
    return (
      <div>
        <h1>Welcome, {session.user.name}</h1>
        <p>Your role: {session.user.role}</p>
      </div>
    );
  }
  