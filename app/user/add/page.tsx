import UserForm from '@/components/Forms/User/UserForm';
import { defaultUserValues } from '@/lib/types/userTypes';

export default function UserAdd() {
  return <UserForm mode="add" defaultValues={defaultUserValues} />;
}
