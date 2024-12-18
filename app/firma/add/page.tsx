import FirmaForm from '@/components/Forms/Firma/FirmaForm';
import { firmaDefaultValues } from '@/lib/types/firmaTypes';

export default function FirmaAdd() {
  return <FirmaForm mode="add" defaultValues={firmaDefaultValues} />;
}
