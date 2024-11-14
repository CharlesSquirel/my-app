import ValveForm from '@/components/Forms/ValveForm';
import { valveDefaultValues } from '@/lib/types/valveTypes';

export default function ValveAdd() {
  return <ValveForm mode="add" defaultValues={valveDefaultValues} />;
}
