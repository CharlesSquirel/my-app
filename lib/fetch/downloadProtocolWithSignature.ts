import ReactSignatureCanvas from 'react-signature-canvas';
import { ProtocolType } from '../zod/zodSchema';

export async function downloadProtocolWithSignature(
  ref: React.RefObject<ReactSignatureCanvas>,
  createdAt: string,
  protocolId: string,
  mode: ProtocolType,
) {
  try {
    if (ref.current) {
      const signatureImage = ref.current
        .getTrimmedCanvas()
        .toDataURL('image/png');

      const response = await fetch(`/${mode}/pdf/signed/${protocolId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature: signatureImage }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Pobranie pliku
        const link = document.createElement('a');
        link.href = url;
        link.download = `Protokół_zaworów_podpisany_${createdAt}.pdf`;
        link.click();

        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to generate PDF');
      }
    }
  } catch (error) {
    console.error(error);
  }
}
