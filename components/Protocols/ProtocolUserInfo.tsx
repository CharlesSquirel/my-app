export type User = {
  firstName: string;
  lastName: string;
  userSignature: string;
};

interface ProtocolUserInfoProps {
  user: User;
}

export default function ProtocolUserInfo({ user }: ProtocolUserInfoProps) {
  return (
    <div className="flex flex-col">
      <p className="font-medium">Serwisant</p>
      <p>{`${user.firstName} ${user.lastName}`}</p>
      <p>{user.userSignature}</p>
    </div>
  );
}
