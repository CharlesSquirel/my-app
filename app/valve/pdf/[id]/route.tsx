import { renderToStream } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';
import ValvePDF from './ValvePDF';

export async function GET(
  res: NextRequest,
  { params }: { params: { id: string } },
) {
  const stream = await renderToStream(<ValvePDF />);
  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');
  headers.set(
    'Content-Disposition',
    `attachment; filename="Protokol zaworow.pdf"`,
  );
  return new NextResponse(stream as unknown as ReadableStream, { headers });
}
