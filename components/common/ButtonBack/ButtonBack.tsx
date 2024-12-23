'use client';

import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <Undo2
        className="absolute right-3 top-3 hover:opacity-70 md:right-6 md:top-6"
        size={35}
      />
    </button>
  );
}
