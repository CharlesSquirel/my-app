'use client';

import PageTitle from '@/components/common/PageTitle/PageTitle';
import TextInput from '@/components/common/TextInput.tsx/TextInput';
import CardContainer from '@/components/containers/CardContainer/CardContainer';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import { UserDTO } from '@/lib/types/userTypes';

export default function UserForm() {
  const onSubmit = (data: UserDTO) => console.log(data);
  return (
    <section className="flex flex-col gap-5">
      <PageTitle title="Dodaj nowego użytkownika" />
      <FormContainer onSubmit={onSubmit}>
        <CardContainer title="Dane podstawowe">
          <TextInput placeholder="Imię" name="firstName" />
          <TextInput placeholder="Nazwisko" name="lastName" />
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Nr uprawnienia" name="userSignature" />
        </CardContainer>
      </FormContainer>
    </section>
  );
}
