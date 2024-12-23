'use client';

import SignModal from '@/components/Forms/SignModal';
import { Badge } from '@/components/ui/badge';
import { deleteValve } from '@/lib/actions/valveActions';
import { ValvePDFProps } from '@/lib/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../../../app/assets/logo.svg';
import ProtocolHeader from '../common/ProtocolHeader';
import ValveMenu from '../common/ProtocolMenu';
import ProtocolTitle from '../common/ProtocolTitle';
import InfoContainer from '../InfoContainer';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

export default function ValveProtocol({ valve }: ValvePDFProps) {
  const [showSignModal, setShowSignModal] = useState(false);
  const handleSignModal = () => setShowSignModal(!showSignModal);
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
  const valveSigned = valve.signed;

  return (
    <section className="flex w-full flex-col" id="valve">
      {showSignModal &&
        createPortal(
          <SignModal
            onCancel={handleSignModal}
            id={valve.id}
            createdAt={valve.createdAt}
            mode="valve"
          />,
          document.body,
        )}
      <ValveMenu
        id={valve.id}
        deleteValve={deleteValve}
        handleSignModal={handleSignModal}
        valveSigned={valveSigned}
        lastName={valve.lastName}
        type="valve"
      />
      <div className="flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <ProtocolTitle subTitle="badania zaworów" mode="web" />
            <Badge
              variant={valveSigned ? 'signed' : 'unsigned'}
              className="h-[20px] w-fit"
            >
              {valveSigned ? 'Wysłany' : 'Niewysłany'}
            </Badge>
          </div>

          <Link href="/">
            <Image
              src={logo}
              alt="Chillair logo"
              className="w-[150px] sm:w-[200px]"
              priority
            />
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
