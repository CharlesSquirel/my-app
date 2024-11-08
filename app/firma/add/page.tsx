import FirmaForm from '@/components/Forms/FirmaForm';
import { firmaDefaultValues } from '@/lib/types/firmaTypes';

export default function FirmaAdd() {
  return <FirmaForm mode="add" defaultValues={firmaDefaultValues} />;
}
