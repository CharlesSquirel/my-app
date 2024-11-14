'use client';

import TextInput from '@/components/common/TextInput.tsx/TextInput';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import { createUser, editUser } from '@/lib/actions/userActions';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { UserDTO } from '@/lib/types/userTypes';
import { UserValidationSchema } from '@/lib/zod/zodSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonBack from '../common/ButtonBack/ButtonBack';

interface UserFormProps {
  mode: FormModeType;
  defaultValues: Partial<UserDTO>;
  id?: string;
}

const errorMessagesMap: Record<string, string> = {
  [errorMessages.userExist]: errorMessages.userExist,
  [errorMessages.disconnect]: errorMessages.disconnect,
};

const getFormTitle = (mode: FormModeType) => {
  return mode === 'add' ? 'Dodaj nowego użytkownika' : 'Edytuj użytkownika';
};

const getSuccessMessage = (mode: FormModeType) => {
  return `Pomyślnie ${mode === 'add' ? 'dodano' : 'edytowano'} użytkownika`;
};

export default function UserForm({ mode, defaultValues, id }: UserFormProps) {
  if (mode === 'edit' && !id) {
    throw new Error('Brak id użytkownika do edycji');
  }
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (data: UserDTO) => {
    setIsLoading(true);
    try {
      if (mode === 'edit' && id) {
        await editUser(data, id);
      } else {
        await createUser(data);
      }
      setIsLoading(false);
      toast.success(getSuccessMessage(mode));
      router.push('/user');
    } catch (error) {
      const message =
        error instanceof Error
          ? (errorMessagesMap[error.message] ?? 'Wystąpił nieoczekiwany błąd')
          : 'Wystąpił nieoczekiwany błąd';
      toast.error(message);
      setIsLoading(false);
    }
  };
  return (
    <section className="flex w-full flex-col items-center justify-center gap-5">
      <ButtonBack />
      <FormContainer
        mode={mode}
        onSubmit={handleOnSubmit}
        title="Dane podstawowe"
        formTitle={getFormTitle(mode)}
        validationSchema={UserValidationSchema}
        defaultValues={defaultValues}
        isLoading={isLoading}
      >
        <TextInput placeholder="Imię" name="firstName" />
        <TextInput placeholder="Nazwisko" name="lastName" />
        <TextInput placeholder="Email" name="email" />
        <TextInput placeholder="Nr uprawnienia" name="userSignature" />
      </FormContainer>
    </section>
  );
}
