'use client';

import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO, ChillerValidationSchema } from '@/lib/zod/zodSchema';
import { Prisma } from '@prisma/client';
import React, { useState } from 'react';
import ButtonBack from '../common/ButtonBack/ButtonBack';
import DecrementButton from '../common/DecrementButton/DecrementButton';
import IncrementButton from '../common/IncrementButton/IncrementButton';
import FormContainer from '../containers/FormContainer/FormContainer';
import FormSectionContainer from '../containers/FormSectionContainer/FormSectionContainer';
import FirmaLocationSelect from '../Inputs/Firma&LocationSelect/Firma&LocationSelect';
import { CardTitle } from '../ui/card';
import ChillerBasicForm from './ChillerBasicForm';
import ChillerLeakForm from './ChillerLeakForm';
import ChillerPowerConsumptionForm from './ChillerPowerConsumptionForm';
import ChillerQualityForm from './ChillerQualityForm';

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
  const [powerCount, setPowerCount] = useState(
    mode === 'edit' ? defaultValues.powerConsumptions.length : 1,
  );
  const handlePowerIncrement = () => {
    setPowerCount(powerCount + 1);
  };
  const handlePowerDecrement = () => {
    setPowerCount(powerCount - 1);
  };
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
        <ChillerBasicForm mode={mode} defaultValues={defaultValues} />
        <FormSectionContainer title="Kontrola jakości">
          <ChillerQualityForm mode={mode} defaultValues={defaultValues} />
        </FormSectionContainer>
        <FormSectionContainer title="Kontrola szczelności">
          <ChillerLeakForm mode={mode} defaultValues={defaultValues} />
        </FormSectionContainer>

        <div className="my-5 flex justify-center">
          <CardTitle>Parametry poboru prądu</CardTitle>
        </div>
        {[...Array(powerCount)].map((_, index) => (
          <React.Fragment key={index}>
            <FormSectionContainer title={`Pobór ${index + 1}`}>
              {index > 0 && (
                <DecrementButton
                  onDecrement={handlePowerDecrement}
                  mode={mode}
                  arrayName="powerConsumptions"
                />
              )}
              <ChillerPowerConsumptionForm
                mode={mode}
                defaultValues={defaultValues}
                index={index}
              />
            </FormSectionContainer>
            {index + 1 === powerCount && (
              <IncrementButton onIncrement={handlePowerIncrement} />
            )}
          </React.Fragment>
        ))}
      </FormContainer>
    </section>
  );
}
