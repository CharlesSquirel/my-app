import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// interface UserAvatarProps {
//     userName: string
// }

export default function UserAvatar() {
  return (
    <Avatar>
      {/* <AvatarImage src="" /> */}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
