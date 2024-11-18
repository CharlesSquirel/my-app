import ValveForm from '@/components/Forms/ValveForm';
import { findAllFirma } from '@/lib/actions/firmaActions';
import { valveDefaultValues } from '@/lib/types/valveTypes';

export default async function ValveAdd() {
  const firms = await findAllFirma();
  return (
    <ValveForm mode="add" defaultValues={valveDefaultValues} firms={firms} />
  );
}
