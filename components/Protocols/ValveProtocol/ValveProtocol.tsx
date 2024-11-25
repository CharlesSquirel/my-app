'use client';

import { Button } from '@/components/ui/button';
import { ValvePDFProps } from '@/lib/types/common';
import { Download, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../app/assets/logo.svg';
import InfoContainer from '../InfoContainer';
import ProtocolHeader from '../ProtocolHeader';
import ProtocolTitle from '../ProtocolTitle';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

export default function ValveProtocol({ valve }: ValvePDFProps) {
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

  return (
    <section className="flex w-full flex-col" id="valve">
      <div className="mb-6 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="#">
            <Pencil />
            Edytuj
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/valve/pdf/${valve.id}`}>
            <Download />
            Pobierz
          </Link>
        </Button>
        <Button variant="destructive">
          <Trash2 /> Usuń
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <header className="flex justify-between">
          <ProtocolTitle subTitle="badania zaworów" mode="web" />

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
              mode="web"
            />
          ))}
        </InfoContainer>
      </div>
    </section>
  );
}
