'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Registered successfully!');
      router.push('/login');
    } else {
      toast.error(data.error || 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0e6ef] to-[#ffe3e0]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold text-center text-[#fd5da5]">Register</h2>
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
        <button className="bg-[#c86bfa] hover:bg-[#a24ed8] text-white p-2 rounded-xl">Sign Up</button>
      </form>
    </div>
  );
}
