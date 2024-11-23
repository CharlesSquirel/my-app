import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import MyDocument from '@/components/Protocols/ValveProtocol/ValvePDF';
import React from 'react';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const pdfStream = await renderToStream(React.createElement(MyDocument));
  const pdfBuffer = await pdfStream.arrayBuffer();
  const pdfStream = await renderToStream(<MyDocument/>);

  // Ustawienie nagłówków odpowiedzi
  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');
  return new NextResponse(pdfBuffer, { headers });

  return new NextResponse(pdfStream, { headers });
}