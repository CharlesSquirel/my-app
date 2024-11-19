import { ValveDisplay } from '@/lib/types/valveTypes';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../app/assets/logo.svg';
import InfoContainer from '../InfoContainer';
import ProtocolHeader from '../ProtocolHeader';
import ProtocolTitle from '../ProtocolTitle';
import ValveBasicInfo, { BasicInfo } from './ValveBasicInfo';
import ValveInfoBlocks from './ValveInfoBlocks';

interface ValveProtocolProps {
  valve: ValveDisplay;
}

export default function ValveProtocol({ valve }: ValveProtocolProps) {
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
    <section className="flex w-full flex-col">
      <header className="flex justify-between">
        <ProtocolTitle subTitle="badania zaworów" />
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
