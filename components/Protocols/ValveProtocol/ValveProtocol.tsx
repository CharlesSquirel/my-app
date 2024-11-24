'use client';

import { ValveDisplay } from '@/lib/types/valveTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import logo from '../../../app/assets/logo.svg';
import InfoContainer from '../InfoContainer';
import ProtocolHeader from '../ProtocolHeader';
import ProtocolTitle from '../ProtocolTitle';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

export interface ValveProtocolProps {
  valve: ValveDisplay;
}

export default function ValveProtocol({ valve }: ValveProtocolProps) {
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
      <header className="flex justify-between">
        <ProtocolTitle subTitle="badania zaworów" />
        {/* <Button onClick={handleDownload}>Download</Button> */}
        <Link href="/">
          <Image src={logo} alt="Chillair logo" width={200} priority />
        </Link>
      </header>
      <ProtocolHeader protocolHeaderData={protocolHeaderData} />
      <InfoContainer title="Dane podstawowe">
        <ValveBasicInfo valveBasicInfo={valveBasicInfo} />
      </InfoContainer>
      <InfoContainer title="Zawory">
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
