'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Login successful!');
      router.push('/dashboard');
    } else {
      toast.error(data.error || 'Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff3b7] to-[#f0e6ef]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold text-center text-[#fd5da5]">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-[#c86bfa] hover:bg-[#a24ed8] text-white p-2 rounded-xl">Login</button>
        <p className="text-center text-sm text-gray-500">
          Not registered? <a href="/register" className="text-[#fd5da5] underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
