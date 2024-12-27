'use client';

import { Button } from '@/components/ui/button';
import { updateValveSignedStatus } from '@/lib/actions/valveActions';
import { downloadProtocolWithSignature } from '@/lib/fetch/downloadProtocolWithSignature';
import useBlurBackground from '@/lib/hooks/useBackgroundBlur';
import { ProtocolType } from '@/lib/zod/zodSchema';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import SignatureCanvas from 'react-signature-canvas';

interface SignModalProps {
  onCancel: () => void;
  id: string;
  createdAt: string;
  mode: ProtocolType;
  isSigned?: boolean;
}

export default function SignModal({
  onCancel,
  id,
  createdAt,
  mode,
  isSigned,
}: SignModalProps) {
  const router = useRouter();
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

  const handleDownload = async () => {
    if (sigCanvas.current) {
      downloadProtocolWithSignature(sigCanvas, createdAt, id, mode);
      await updateValveSignedStatus(id);
      if (isSigned) {
        router.back();
      }
      onCancel();
      toast.success('Operacja zakończona pomyślnie');
      if (!isSigned) {
        router.refresh();
      }
    } else {
      toast.error('Wystąpił błąd podczas generowania pliku PDF');
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
        <Button onClick={handleDownload}>Zapisz</Button>
      </div>
    </div>
  );
}
