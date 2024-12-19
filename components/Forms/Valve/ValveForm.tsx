'use client';

import DecrementButton from '@/components/common/DecrementButton/DecrementButton';
import IncrementButton from '@/components/common/IncrementButton/IncrementButton';
import FormContainer from '@/components/containers/FormContainer/FormContainer';
import FormSectionContainer from '@/components/containers/FormSectionContainer/FormSectionContainer';
import FirmaLocationSelect from '@/components/Inputs/Firma&LocationSelect/Firma&LocationSelect';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import TextareaInput from '@/components/Inputs/TextareaInput/TextareaInput';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import { CardTitle } from '@/components/ui/card';
import { fetchUserDataFromMongo } from '@/lib/actions/userActions';
import { createValve, editValve } from '@/lib/actions/valveActions';
import {
  valveInfoBlocksTypes,
  valveInstallationTypes,
  valveTypes,
} from '@/lib/data/Valvedata';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { ValveDTO, ValvesValidationSchema } from '@/lib/zod/zodSchema';
import { useUser } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonBack from '../../common/ButtonBack/ButtonBack';

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
  const { user } = useUser();

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
    if (!user || !user.firstName || !user.lastName) {
      throw new Error('Brak użytkownika');
    }
    const fetchedUserDataFromMongo = await fetchUserDataFromMongo(
      user?.emailAddresses[0].emailAddress,
      user?.firstName,
      user?.lastName,
    );

    const newData = {
      ...data,
      ...fetchedUserDataFromMongo,
      firstName: user?.firstName || 'unknown',
      lastName: user?.lastName || 'unknown',
    };

    setIsLoading(true);

    try {
      if (mode === 'edit' && id) {
        await editValve(newData, id);
      } else {
        await createValve(newData);
      }
      toast.success(getSuccessMessage(mode));
      router.push(`/`);
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
          data={valveTypes}
          name="type"
          defaultValue={mode === 'edit' ? defaultValues.type : undefined}
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
        <div className="my-5 flex justify-center">
          <CardTitle>Zawory</CardTitle>
        </div>
        {[...Array(infoBlocksCount)].map((_, index) => (
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
        ))}
      </FormContainer>
    </section>
  );
}
