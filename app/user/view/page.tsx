import ButtonBack from '@/components/common/ButtonBack/ButtonBack';
import { currentUser } from '@clerk/nextjs/server';
import { ReactNode } from 'react';

export default async function UserView() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  console.log(user);
  return (
    <div>
      <ButtonBack />
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <p>{user.privateMetadata.userSignature as ReactNode}</p>
    </div>
  );
}
