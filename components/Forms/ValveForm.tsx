'use client';

import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ValveDTO, ValvesValidationSchema } from '@/lib/zod/zodSchema';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonBack from '../common/ButtonBack/ButtonBack';
import TextInput from '../common/TextInput.tsx/TextInput';
import FormContainer from '../containers/FormContainer/FormContainer';
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
  const firmsOptions = firms.map((firma) => ({
    value: firma.id,
    label: firma.fullName,
    key: firma.id,
  }));

  const locationsOptions = firms.flatMap((firma) =>
    firma.locations.map((location) => ({
      value: location.locationId,
      label: location.shortName,
      key: location.id,
    })),
  );

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
    console.log(data);
    // setIsLoading(true);
    // try {
    //   //   if (mode === 'edit' && id) {
    //   //     await editFirma(data, id);
    //   //   } else {
    //   //     await createFirma(data);
    //   //   }
    //   await createValve(data);
    //   toast.success(getSuccessMessage(mode));
    //   router.push('/valve');
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   const message =
    //     error instanceof Error
    //       ? (errorMessagesMap[error.message] ?? 'Wystąpił nieoczekiwany błąd')
    //       : 'Wystąpił nieoczekiwany błąd';
    //   toast.error(message);
    //   setIsLoading(false);
    // } finally {
    //   setIsLoading(false);
    // }
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
        <TextInput
          placeholder="Wpisz numer"
          name="serialNumber"
          label="Nr seryjny"
        />
        <SelectInput
          data={firmsOptions}
          label="Firma"
          name="firma"
          placeholder="Wybierz firmę"
        />
        <SelectInput
          data={locationsOptions}
          // secondaryData={locationsOptions}
          label="Obiekt"
          name="location"
          placeholder="Wybierz obiekt"
          // isAsync
        />
      </FormContainer>
    </section>
  );
}
