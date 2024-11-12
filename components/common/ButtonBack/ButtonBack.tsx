'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <X className="absolute right-6 top-6 hover:opacity-70" size={35} />
    </button>
  );
}
