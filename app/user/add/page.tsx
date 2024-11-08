import UserForm from '@/components/Forms/UserForm';
import { defaultUserValues } from '@/lib/types/userTypes';

export default function UserAdd() {
  return <UserForm mode="add" defaultValues={defaultUserValues} />;
}
