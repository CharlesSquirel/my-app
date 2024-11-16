'use client';

import { createValve } from '@/lib/actions/valveActions';
import { valveTypes } from '@/lib/data/Valvedata';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ValveDTO, ValvesValidationSchema } from '@/lib/zod/zodSchema';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonBack from '../common/ButtonBack/ButtonBack';
import TextareaInput from '../common/TextareaInput/TextareaInput';
import TextInput from '../common/TextInput.tsx/TextInput';
import FormContainer from '../containers/FormContainer/FormContainer';
import FirmaLocationSelect from '../Firma&LocationSelect/Firma&LocationSelect';
import SelectInput from '../SelectInput/SelectInput';

interface ValveFormProps {
  mode: FormModeType;
  defaultValues: ValveDTO;
  id?: string;
  firms: Prisma.FirmaGetPayload<{
    include: {
      locations: true;
    };
  }>[];
}

const errorMessagesMap: Record<string, string> = {
  [errorMessages.valveNotExist]: errorMessages.valveNotExist,
  [errorMessages.valveFailedCreation]: errorMessages.valveFailedCreation,
  [errorMessages.disconnect]: errorMessages.disconnect,
};

const getFormTitle = (mode: FormModeType) => {
  return mode === 'add' ? 'Dodaj nowy protokół' : 'Edytuj protokół';
};

const getSuccessMessage = (mode: FormModeType) => {
  return `Pomyślnie ${mode === 'add' ? 'dodano' : 'edytowano'} protokół`;
};

export default function ValveForm({
  mode,
  defaultValues,
  id,
  firms,
}: ValveFormProps) {
  if (mode === 'edit' && !id) {
    throw new Error('Brak id protokołu zaworu do edycji');
  }

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [infoBlocksCount, setInfoBlocksCount] = useState(
    mode === 'edit' ? defaultValues.infoBlocks.length : 1,
  );
  const handleIncrement = () => {
    setInfoBlocksCount(infoBlocksCount + 1);
  };
  const handleDecrement = () => {
    setInfoBlocksCount(infoBlocksCount - 1);
  };

  const handleOnSubmit = async (data: ValveDTO) => {
    console.log('naciskam');
    console.log(data);
    setIsLoading(true);
    try {
      //   if (mode === 'edit' && id) {
      //     await editFirma(data, id);
      //   } else {
      //     await createFirma(data);
      //   }
      await createValve(data);
      toast.success(getSuccessMessage(mode));
      router.push('/valve');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const message =
        error instanceof Error
          ? (errorMessagesMap[error.message] ?? 'Wystąpił nieoczekiwany błąd')
          : 'Wystąpił nieoczekiwany błąd';
      toast.error(message);
      setIsLoading(false);
    } finally {
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
        subTitle="Zawory bezpieczeństwa"
        formTitle={getFormTitle(mode)}
        validationSchema={ValvesValidationSchema}
        defaultValues={defaultValues}
        isLoading={isLoading}
        badgeColor="valve"
      >
        <FirmaLocationSelect firms={firms} />
        <SelectInput
          placeholder="Wybierz typ"
          label="Typ"
          data={valveTypes}
          name="type"
        />
        <TextInput
          placeholder="Wpisz numer"
          name="serialNumber"
          label="Nr seryjny"
        />
        <TextareaInput
          label="Uwagi (opcjonalnie)"
          placeholder="Wpisz swoje uwagi"
          name="description"
        />
      </FormContainer>
    </section>
  );
}
