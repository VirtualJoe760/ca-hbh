// src/app/pages/auth/signin.tsx
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
