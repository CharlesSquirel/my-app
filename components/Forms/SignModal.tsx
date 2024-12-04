'use client';

import { Button } from '@/components/ui/button';
import { downloadProtocolWithSignature } from '@/lib/fetch/downloadProtocolWithSignature';
import useBlurBackground from '@/lib/hooks/useBackgroundBlur';
import { ProtocolType } from '@/lib/zod/zodSchema';
import { X } from 'lucide-react';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignModalProps {
  onCancel: () => void;
  id: string;
  createdAt: string;
  mode: ProtocolType;
}

export default function SignModal({
  onCancel,
  id,
  createdAt,
  mode,
}: SignModalProps) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useBlurBackground(modalRef);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    } else {
      console.error('sigCanvas is not initialized');
    }
  };

  return (
    <div
      className="absolute left-[50%] top-[50%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-2 bg-white p-5 shadow-lg"
      ref={modalRef}
    >
      <X className="absolute right-3 top-3 cursor-pointer" onClick={onCancel} />
      <h2 className="font-semibold">Złóż podpis:</h2>
      <p className="text-gray-500">
        Podpis nie będzie przechowywany w bazie danych. Będzie jednorazowo
        dodany do protokołu i wysłany na email
      </p>
      <SignatureCanvas
        penColor="#008dd2"
        backgroundColor="#fff"
        ref={sigCanvas}
        canvasProps={{
          className: 'border w-full h-40',
        }}
      />
      <div className="mt-4 flex gap-2 self-end">
        <Button onClick={clearSignature} variant="outline">
          Wyczyść
        </Button>
        <Button
          onClick={() =>
            downloadProtocolWithSignature(
              sigCanvas,
              createdAt,
              id,
              mode,
              onCancel,
            )
          }
        >
          Zapisz
        </Button>
      </div>
    </div>
  );
}
