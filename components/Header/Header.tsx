import UserDropdown from '@/components/common/UserDropdown/UserDropdown';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../app/assets/logo.svg';

export default function Header() {
  return (
    <>
      <header className="mb-7 flex justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Image src={logo} alt="Chillair logo" width={150} priority />
          </Link>
          <h1 className="text-xl font-semibold md:text-2xl">
            <span className="text-customBlue">C</span>
            SPS
            <span className="text-base font-normal">
              {` (ChillAir Serwis Protocols System)`}
            </span>
          </h1>
        </div>
        <UserDropdown />
      </header>
    </>
  );
}
