'use client';

import { Button } from '@/components/ui/button';
import useBlurBackground from '@/lib/hooks/useBackgroundBlur';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignModal() {
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

  const saveSignature = () => {
    if (sigCanvas.current) {
      const signatureImage = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      console.log('Signature Data URL:', signatureImage);
      // Możesz wysłać ten podpis na serwer
      // fetch('/api/save-signature', { method: 'POST', body: JSON.stringify({ signature: signatureImage }) });
    }
  };

  return (
    <div
      className="absolute left-[50%] top-[50%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-2 bg-white p-5 shadow-lg"
      ref={modalRef}
    >
      <h2 className="font-semibold">Złóż podpis:</h2>
      <p className="text-gray-500">
        Podpis nie będzie przechowywany w bazie danych. Będzie jednorazowo
        dodany do protokołu i wysłany na email
      </p>
      <SignatureCanvas
        penColor="#008dd2"
        backgroundColor="#f5f5f5"
        ref={sigCanvas}
        canvasProps={{
          className: 'border w-full h-40',
        }}
      />
      <div className="mt-4 flex gap-2 self-end">
        <Button onClick={clearSignature} variant="outline">
          Wyczyść
        </Button>
        <Button onClick={saveSignature}>Zapisz</Button>
      </div>
    </div>
  );
}
