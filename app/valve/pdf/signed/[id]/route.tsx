import { getValveProtocolOptimized } from '@/lib/actions/commonActions';
import { transporterOptions } from '@/lib/mail/mail.config';
import { formatDate } from '@/lib/utils';
import { renderToBuffer, renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

    // Pobierz dane protokołu
    const valve = await getValveProtocolOptimized(protocolId);

    const pdfBuffer = await renderToBuffer(
      <ValvePDF valve={valve} signature={signature} />,
    );

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

    const transporter = nodemailer.createTransport(transporterOptions);
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `CSPS ${formatDate(valve.updatedAt) !== valve.createdAt && 'Edit'}: Protokół badania zaworów bezpieczeństwa z dnia ${valve.createdAt}`,
      text: `Protokół badania zaworów bezpieczeństwa z dnia ${valve.createdAt} serwisanta ${valve.firstName} ${valve.lastName}`,
      attachments: [
        {
          filename: filename,
          content: pdfBuffer,
        },
      ],
    };
    await transporter.sendMail(mailOptions);

    return new NextResponse(stream as unknown as ReadableStream, { headers });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
