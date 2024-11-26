import { findAllFirma } from '@/lib/actions/firmaActions';

export default async function ChillerAdd() {
  const firms = await findAllFirma();
  return <p></p>;
}
