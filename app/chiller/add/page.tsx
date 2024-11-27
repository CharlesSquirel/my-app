import ChillerForm from '@/components/Forms/ChillerForm';
import { findAllFirma } from '@/lib/actions/firmaActions';
import { chillerDefaultValues } from '@/lib/types/chillerTypes';

export default async function ChillerAdd() {
  const firms = await findAllFirma();
  return (
    <ChillerForm
      mode="add"
      firms={firms}
      defaultValues={chillerDefaultValues}
    />
  );
}
