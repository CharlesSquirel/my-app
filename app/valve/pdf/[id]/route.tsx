import { getValveProtocolOptimized } from '@/lib/actions/commonActions';
import { renderToStream } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';
import ValvePDF from './ValvePDF';

export async function GET(
  res: NextRequest,
  { params }: Promise<{ params: { id: string } }>,
) {
  const { id } = await params;
  const valve = await getValveProtocolOptimized(id);
  const stream = await renderToStream(<ValvePDF valve={valve} />);
  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');

  // Zakoduj nazwę pliku w formacie RFC 5987
  const filename = `Protokół_zaworów_${valve.createdAt}.pdf`;
  const encodedFilename = encodeURIComponent(filename)
    .replace(/['()]/g, escape)
    .replace(/\*/g, '%2A');

  headers.set(
    'Content-Disposition',
    `attachment; filename*=UTF-8''${encodedFilename}`,
  );

  return new NextResponse(stream as unknown as ReadableStream, { headers });
}
