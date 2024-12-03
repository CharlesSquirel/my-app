'use client';

import AlertDialogComponent from '@/components/common/AlertDialog/AlertDialogComponent';
import SignModal from '@/components/Forms/SignModal';
import { Button } from '@/components/ui/button';
import { deleteValve } from '@/lib/actions/valveActions';
import { ValvePDFProps } from '@/lib/types/common';
import { ArrowUpDown, Download, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../../../app/assets/logo.svg';
import InfoContainer from '../InfoContainer';
import ProtocolHeader from '../ProtocolHeader';
import ProtocolTitle from '../ProtocolTitle';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

export default function ValveProtocol({ valve }: ValvePDFProps) {
  const [showSignModal, setShowSignModal] = useState(false);
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
      {showSignModal && createPortal(<SignModal />, document.body)}
      <div className="mb-6 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href={`/valve/edit/${valve.id}`}>
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
        <Button variant="outline">
          <ArrowUpDown /> Pobierz i wyślij z podpisem
        </Button>
        <AlertDialogComponent
          onDelete={deleteValve}
          id={valve.id}
          title="Czy na pewno chcesz usunąć ten protokół?"
          description="Usunięcie tego protokołu jest nieodwracalne"
          pathAfterDelete="/"
        >
          <Button variant="destructive">
            <Trash2 /> Usuń
          </Button>
        </AlertDialogComponent>
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
