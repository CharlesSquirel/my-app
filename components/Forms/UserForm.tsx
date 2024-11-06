'use client';

import TextInput from '@/components/common/TextInput.tsx/TextInput';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import { createUser } from '@/lib/actions/userActions';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { UserDTO } from '@/lib/types/userTypes';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UserForm() {
  const router = useRouter();

  // const onSubmit = (data: UserDTO) => console.log(data);
  const handleleOnSubmit = async (data: UserDTO) => {
    try {
      await createUser(data);
      toast.success('Pomyślnie dodano użytkownika');
      router.push('/');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === errorMessages.userExist) {
          toast.error(errorMessages.userExist);
        } else {
          toast.error(errorMessages.disconnect);
        }
      }
      // toast.error('Wystąpił nieoczekiwany błąd');
    }
  };
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
