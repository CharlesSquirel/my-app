import { getValveProtocolOptimized } from '@/lib/actions/commonActions';
import { renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import ValvePDF from '../../../../../components/PDF/ValvePDF';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const protocolId = (await params).id;

    // Pobierz dane z treści żądania
    const body = await req.json();
    const { signature } = body; // Base64 podpisu
    console.log('Signature Data URL:', signature);

    // Pobierz dane protokołu
    const valve = await getValveProtocolOptimized(protocolId);

    // Przekaż dane podpisu do komponentu PDF
    const stream = await renderToStream(
      <ValvePDF valve={valve} signature={signature} />,
    );

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');

    // Zakoduj nazwę pliku w formacie RFC 5987
    const filename = `Protokół_zaworów_${valve.createdAt}.pdf`;
    const encodedFilename = encodeURIComponent(filename)
      .replace(/['()]/g, (match) => `%${match.charCodeAt(0).toString(16)}`)
      .replace(/\*/g, '%2A');

    headers.set(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodedFilename}`,
    );

    return new NextResponse(stream as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
