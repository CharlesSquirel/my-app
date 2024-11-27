import ChillerForm from '@/components/Forms/ChillerForm';
import { findAllFirma } from '@/lib/actions/firmaActions';

export default async function ChillerAdd() {
  const firms = await findAllFirma();
  return <ChillerForm mode="add" firms={firms} />;
}
