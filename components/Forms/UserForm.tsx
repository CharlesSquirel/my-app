'use client';

import TextInput from '@/components/common/TextInput.tsx/TextInput';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import { createUser, editUser } from '@/lib/actions/userActions';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { UserDTO } from '@/lib/types/userTypes';
import { UserValidationSchema } from '@/lib/zod/zodSchema';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UserFormProps {
  mode: FormModeType;
  defaultValues: any;
  id?: string;
}

export default function UserForm({ mode, defaultValues, id }: UserFormProps) {
  const router = useRouter();

  const handleOnSubmit = async (data: UserDTO) => {
    try {
      if (mode === 'edit' && id) {
        await editUser(data, id);
      } else {
        await createUser(data);
      }
      toast.success(
        `Pomyślnie ${mode === 'add' ? 'dodano' : 'edytowano'} użytkownika`,
      );
      router.push('/user');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorMessages.userExist) {
          toast.error(errorMessages.userExist);
        } else if (error.message === errorMessages.disconnect) {
          toast.error(errorMessages.disconnect);
        } else toast.error('Wystąpił nieoczekiwany błąd');
      }
    }
  };
  return (
    <section className="flex w-full flex-col items-center justify-center gap-5">
      <button onClick={() => router.back()}>
        <X className="absolute right-6 top-6 hover:opacity-70" size={35} />
      </button>
      <FormContainer
        mode={mode}
        onSubmit={handleOnSubmit}
        title="Dane podstawowe"
        formTitle={
          mode === 'add' ? 'Dodaj nowego użytkownika' : 'Edytuj użytkownika'
        }
        validationSchema={UserValidationSchema}
        defaultValues={defaultValues}
      >
        <TextInput placeholder="Imię" name="firstName" />
        <TextInput placeholder="Nazwisko" name="lastName" />
        <TextInput placeholder="Email" name="email" />
        <TextInput placeholder="Nr uprawnienia" name="userSignature" />
      </FormContainer>
    </section>
  );
}
