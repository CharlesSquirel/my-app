import UserForm from '@/components/Forms/UserForm';
import findUserById from '@/lib/actions/userActions';
import { UserDTO } from '@/lib/types/userTypes';

export default async function UserEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await findUserById(id);
  const editValues: UserDTO = {
    firstName: user.firstName,
    lastName: user.lastName,
    userSignature: user.userSignature,
    email: user.email,
  };

  return <UserForm mode="edit" defaultValues={editValues} id={id} />;
}
