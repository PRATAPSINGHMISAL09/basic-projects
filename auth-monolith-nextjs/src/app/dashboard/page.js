'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function getUser() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (!res.ok) {
        router.push('/login');
      } else {
        setUserEmail(data.email);
      }
    }

    getUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe3e0] to-[#fff3b7]">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#fd5da5]">Welcome 👋</h2>
        <p className="text-gray-700">Logged in as: <span className="font-medium">{userEmail}</span></p>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            toast.success('Logged out!');
            router.push('/login');
          }}
          className="bg-[#fd5da5] hover:bg-[#fd3e92] text-white px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
