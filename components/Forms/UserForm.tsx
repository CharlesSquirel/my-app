'use client';

import TextInput from '@/components/common/TextInput.tsx/TextInput';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import { useToast } from '@/hooks/use-toast';
import { createUser } from '@/lib/actions/userActions';
import { UserDTO } from '@/lib/types/userTypes';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const { toast } = useToast();
  // const onSubmit = (data: UserDTO) => console.log(data);
  const handleleOnSubmit = (data: UserDTO) => {
    createUser(data);
    toast({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM',
    });
  };
  const router = useRouter();
  return (
    <section className="flex w-full flex-col items-center justify-center gap-5">
      <button onClick={() => router.back()}>
        <X className="absolute right-6 top-6" size={35} />
      </button>
      <FormContainer
        onSubmit={handleleOnSubmit}
        title="Dane podstawowe"
        formTitle="Dodaj nowego użytkownika"
      >
        <TextInput placeholder="Imię" name="firstName" />
        <TextInput placeholder="Nazwisko" name="lastName" />
        <TextInput placeholder="Email" name="email" />
        <TextInput placeholder="Nr uprawnienia" name="userSignature" />
      </FormContainer>
    </section>
  );
}
