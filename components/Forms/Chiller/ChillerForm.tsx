'use client';

import ButtonBack from '@/components/common/ButtonBack/ButtonBack';
import DecrementButton from '@/components/common/DecrementButton/DecrementButton';
import IncrementButton from '@/components/common/IncrementButton/IncrementButton';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import FormSectionContainer from '@/components/containers/FormSectionContainer/FormSectionContainer';
import ChillerBasicForm from '@/components/Forms/Chiller/ChillerBasicForm';
import ChillerCircuitsForm from '@/components/Forms/Chiller/ChillerCircuitsForm';
import ChillerLeakForm from '@/components/Forms/Chiller/ChillerLeakForm';
import ChillerPowerConsumptionForm from '@/components/Forms/Chiller/ChillerPowerConsumptionForm';
import ChillerQualityForm from '@/components/Forms/Chiller/ChillerQualityForm';
import FirmaLocationSelect from '@/components/Inputs/Firma&LocationSelect/Firma&LocationSelect';
import { CardTitle } from '@/components/ui/card';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO, ChillerValidationSchema } from '@/lib/zod/zodSchema';
import { Prisma } from '@prisma/client';
import React, { useState } from 'react';

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
  const [circulationCount, setCirculationCount] = useState(
    mode === 'edit' ? defaultValues.circuits.length : 1,
  );

  const handleCirculationIncrement = () => {
    setCirculationCount(circulationCount + 1);
  };
  const handleCirculationDecrement = () => {
    setCirculationCount(circulationCount - 1);
  };
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
          <CardTitle>Parametry obiegów</CardTitle>
        </div>
        {[...Array(circulationCount)].map((_, index) => (
          <React.Fragment key={index}>
            <FormSectionContainer title={`Obieg ${index + 1}`}>
              {index > 0 && (
                <DecrementButton
                  onDecrement={handleCirculationDecrement}
                  mode={mode}
                  arrayName="circuits"
                />
              )}
              <ChillerCircuitsForm
                mode={mode}
                index={index}
                defaultValues={defaultValues}
              />
            </FormSectionContainer>
            {index + 1 === circulationCount && (
              <IncrementButton onIncrement={handleCirculationIncrement} />
            )}
          </React.Fragment>
        ))}

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
