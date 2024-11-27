'use client';

import { chillerDriverTypes, chillerTypes } from '@/lib/data/chillerData';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO, ChillerValidationSchema } from '@/lib/zod/zodSchema';
import { Prisma } from '@prisma/client';
import { useState } from 'react';
import FirmaLocationSelect from '../Inputs/Firma&LocationSelect/Firma&LocationSelect';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import TextInput from '../Inputs/TextInput.tsx/TextInput';
import TextareaInput from '../Inputs/TextareaInput/TextareaInput';
import ButtonBack from '../common/ButtonBack/ButtonBack';
import FormContainer from '../containers/FormContainer/FormContainer';

interface ChillerFormProps {
  mode: FormModeType;
  defaultValues: ChillerDTO;
  id?: string;
  firms: Prisma.FirmaGetPayload<{
    include: {
      locations: true;
    };
  }>[];
}

const errorMessagesMap: Record<string, string> = {
  [errorMessages.chillerNotExist]: errorMessages.chillerNotExist,
  [errorMessages.chillerFailedCreation]: errorMessages.chillerFailedCreation,
  [errorMessages.disconnect]: errorMessages.disconnect,
};

// powtarza się w ValveForm.tsx
const getFormTitle = (mode: FormModeType) => {
  return mode === 'add' ? 'Dodaj nowy protokół' : 'Edytuj protokół';
};
// powtarza się w ValveForm.tsx
const getSuccessMessage = (mode: FormModeType) => {
  return `Pomyślnie ${mode === 'add' ? 'dodano' : 'edytowano'} protokół`;
};

export default function ChillerForm({
  mode,
  defaultValues,
  id,
  firms,
}: ChillerFormProps) {
  if (mode === 'edit' && !id) {
    throw new Error('Brak id protokołu zaworu do edycji');
  }
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSubmit = async (data: ChillerDTO) => {
    console.log(data);
    // setIsLoading(true);
    // try {
    //   if (mode === 'edit' && id) {
    //     await editValve(data, id);
    //   } else {
    //     await createValve(data);
    //   }
    //   toast.success(getSuccessMessage(mode));
    //   router.push('/');
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
        subTitle="Agregaty chłodniczne"
        formTitle={getFormTitle(mode)}
        validationSchema={ChillerValidationSchema}
        defaultValues={defaultValues}
        isLoading={isLoading}
        badgeColor="chiller"
      >
        <FirmaLocationSelect
          firms={firms}
          firmaDefaultValues={mode === 'edit' ? defaultValues.firma : undefined}
          locationDefaultValues={
            mode === 'edit' ? defaultValues.location : undefined
          }
        />
        <SelectInput
          placeholder="Wybierz typ"
          label="Typ"
          data={chillerTypes}
          name="type"
          defaultValue={mode === 'edit' ? defaultValues.type : undefined}
        />
        <TextInput
          placeholder="Wpisz numer"
          name="serialNumber"
          label="Nr seryjny"
        />
        <SelectInput
          data={chillerDriverTypes}
          placeholder="Wybierz typ"
          label="Typ sterownika"
          name="driverType"
          defaultValue={mode === 'edit' ? defaultValues.driverType : undefined}
        />
        {/* <SelectInput
        placeholder='Wybierz wartość'
        label='Różnica mędzyfazowa'
        name='interphase'
        /> */}
        <TextareaInput
          label="Uwagi (opcjonalnie)"
          placeholder="Wpisz swoje uwagi"
          name="description"
        />
        {/* <div className="my-5 flex justify-center">
          <CardTitle>Zawory</CardTitle>
        </div> */}
        {/* {[...Array(infoBlocksCount)].map((_, index) => (
          <React.Fragment key={index}>
            <FormSectionContainer title={`Zawór ${index + 1}`}>
              {index > 0 && (
                <DecrementButton
                  onDecrement={handleDecrement}
                  mode={mode}
                  arrayName="infoBlocks"
                />
              )}
              <SelectInput
                data={valveInstallationTypes}
                label="Miejsce instalowania zaworu"
                placeholder="Wybierz miejsce"
                name={`infoBlocks.${index}.valveLocation`}
                defaultValue={
                  mode === 'edit'
                    ? defaultValues.infoBlocks[index]?.valveLocation
                    : undefined
                }
              />
              <SelectInput
                data={valveInfoBlocksTypes}
                label="Typ"
                placeholder="Wybierz typ"
                name={`infoBlocks.${index}.valveType`}
                defaultValue={
                  mode === 'edit'
                    ? defaultValues.infoBlocks[index]?.valveType
                    : undefined
                }
              />
              <TextInput
                placeholder="Wpisz numer"
                name={`infoBlocks.${index}.valveSerialNumber`}
                label="Nr seryjny"
              />
              <TextInput
                type="number"
                placeholder="Wpisz wartość"
                label="Ciśnienie nastawy (bar)"
                name={`infoBlocks.${index}.pressureSetting`}
              />
              <TextInput
                type="number"
                placeholder="Wpisz wartość"
                label="Ciśnienie otwarcia (bar)"
                name={`infoBlocks.${index}.pressureOpen`}
              />
              <TextInput
                type="number"
                placeholder="Wpisz wartość"
                label="Ciśnienie zamknięcia (bar)"
                name={`infoBlocks.${index}.pressureClose`}
              />
              <TextareaInput
                label="Uwagi (opcjonalnie)"
                placeholder="Wpisz swoje uwagi"
                name={`infoBlocks.${index}.description`}
              />
            </FormSectionContainer>
            {index + 1 === infoBlocksCount && (
              <IncrementButton onIncrement={handleIncrement} />
            )}
          </React.Fragment>
        ))} */}
      </FormContainer>
    </section>
  );
}
