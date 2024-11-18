import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../app/assets/logo.svg';
import ProtocolTitle from '../ProtocolTitle';

export default function ValveProtocol() {
  return (
    <section className="flex w-full flex-col">
      <header className="flex justify-between">
        <ProtocolTitle subTitle="badania zaworów" />
        <Link href="/">
          <Image src={logo} alt="Chillair logo" width={200} priority />
        </Link>
      </header>
    </section>
  );
}
