'use client';

import { Button } from '@/components/ui/button';
import { ValvePDFProps } from '@/lib/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import logo from '../../../app/assets/logo.svg';
import InfoContainer from '../InfoContainer';
import ProtocolHeader from '../ProtocolHeader';
import ProtocolTitle from '../ProtocolTitle';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

export default function ValveProtocol({ valve }: ValvePDFProps) {
  const protocolRef = useRef<HTMLElement>(null);

  const protocolHeaderData = {
    firma: valve.firma,
    location: valve.location,
    user: {
      firstName: valve.firstName,
      lastName: valve.lastName,
      userSignature: valve.userSignature,
    },
    date: valve.createdAt,
  };
  const valveBasicInfo: BasicInfo = {
    type: valve.type,
    serialNumber: valve.serialNumber,
  };

  // const handleDownload = () => {
  //   const protocol = protocolRef.current;

  //   if (protocol) {
  //     const initialLineHeight = protocol.style.lineHeight;
  //     console.log('Before setting lineHeight:', initialLineHeight);

  //     // Ukryj element przed zmianą line-height
  //     protocol.style.visibility = 'hidden';

  //     // Zmień line-height i wygeneruj PDF
  //     requestAnimationFrame(() => {
  //       protocol.style.setProperty('line-height', '1px');
  //       console.log('After setting lineHeight:', protocol.style.lineHeight);

  //       html2pdf()
  //         .set({ ...options, filename: `Protokół_zaworów ${valve.createdAt}` })
  //         .from(protocol)
  //         .save()
  //         .then(() => {
  //           // Przywróć oryginalny line-height i widoczność
  //           protocol.style.setProperty('line-height', initialLineHeight);
  //           protocol.style.visibility = 'visible';
  //           console.log(
  //             'After resetting lineHeight:',
  //             protocol.style.lineHeight,
  //           );
  //         });
  //     });
  //   }
  // };
  return (
    <section
      className="flex w-full flex-col print:leading-[1px]"
      id="valve"
      ref={protocolRef}
    >
      <div className="mb-4 flex justify-end">
        <Button variant="outline" asChild>
          <Link href={`/valve/pdf/${valve.id}`}>Pobierz</Link>
        </Button>
      </div>
      <header className="flex justify-between">
        <ProtocolTitle subTitle="badania zaworów" mode="web" />
        {/* <Button onClick={handleDownload}>Download</Button> */}
        <Link href="/">
          <Image src={logo} alt="Chillair logo" width={200} priority />
        </Link>
      </header>
      <ProtocolHeader protocolHeaderData={protocolHeaderData} />
      <InfoContainer title="Dane podstawowe" mode="web">
        <ValveBasicInfo valveBasicInfo={valveBasicInfo} />
      </InfoContainer>
      <InfoContainer title="Zawory" mode="web">
        {valve.infoBlocks.map((infoBlock, index) => (
          <ValveInfoBlocks
            infoBlock={infoBlock}
            key={infoBlock.id}
            index={index}
          />
        ))}
      </InfoContainer>
    </section>
  );
}
