import { columns } from '@/components/common/Table/columns';
import { DataTable } from '@/components/common/Table/data-table';
import { getAllProtocolsOptimized } from '@/lib/actions/commonActions';
import Header from '../components/Header/Header';

// const protocols: Protocol[] = Array.from({ length: 100 }, (_, i) => ({
//   author: `Jan Kowalski ${i + 1}`,
//   firma: `Firma ${String.fromCharCode(65 + (i % 26))}${i}`,
//   createdAt: `31.10.${2024 - Math.floor(i / 10)}`, // zmiana roku co 10 elementów
//   type: i % 2 === 0 ? 'chiller' : 'valve', // na zmianę chiller i valve
//   description: `Opis ${i + 1} - ${'a'.repeat((i % 5) + 5)}`, // różna długość opisu
// }));
export default async function Home() {
  const protocols = await getAllProtocolsOptimized();
  const displayProtocols = protocols.map((protocol) => ({
    ...protocol,
    author: `${protocol.firstName} ${protocol.lastName}`,
  }));
  return (
    <>
      {/* <Image
        src={newYorkImg}
        alt=""
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          zIndex: -1,
          filter: 'blur(6px)',
        }}
      /> */}
      <Header />
      <DataTable columns={columns} data={displayProtocols} />
    </>
  );
}
