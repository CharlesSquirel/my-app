'use client';

import { createFirma, editFirma } from '@/lib/actions/firmaActions';
import { errorMessages } from '@/lib/errorMessages/errorMessages';
import { FormModeType } from '@/lib/types/common';
import { FirmaDTO } from '@/lib/types/firmaTypes';
import { FirmaValidationSchema } from '@/lib/zod/zodSchema';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonBack from '../common/ButtonBack/ButtonBack';
import DecrementButton from '../common/DecrementButton/DecrementButton';
import IncrementButton from '../common/IncrementButton/IncrementButton';
import TextInput from '../common/TextInput.tsx/TextInput';
import FormContainer from '../containers/FormContainer/FormContainer';
import FormSectionContainer from '../containers/FormSectionContainer/FormSectionContainer';
import { CardTitle } from '../ui/card';

interface FirmaFormProps {
  mode: FormModeType;
  defaultValues: FirmaDTO;
  id?: string;
}

const errorMessagesMap: Record<string, string> = {
  [errorMessages.firmaExist]: errorMessages.firmaExist,
  [errorMessages.firmaFailedCreation]: errorMessages.firmaFailedCreation,
  [errorMessages.firmaNotExist]: errorMessages.firmaNotExist,
  [errorMessages.disconnect]: errorMessages.disconnect,
};

const getFormTitle = (mode: FormModeType) => {
  return mode === 'add' ? 'Dodaj nową firmę' : 'Edytuj firmę';
};

const getSuccessMessage = (mode: FormModeType) => {
  return `Pomyślnie ${mode === 'add' ? 'dodano' : 'edytowano'} firmę`;
};

export default function FirmaForm({ mode, defaultValues, id }: FirmaFormProps) {
  if (mode === 'edit' && !id) {
    throw new Error('Brak id firmy do edycji');
  }
  const [isLoading, setIsLoading] = useState(false);
  const [locationCount, setLocationCount] = useState(
    mode === 'edit' ? defaultValues.locations.length : 1,
  );
  const handleIncrement = () => {
    setLocationCount(locationCount + 1);
  };
  const handleDecrement = () => {
    setLocationCount(locationCount - 1);
  };
  const router = useRouter();

  const handleOnSubmit = async (data: FirmaDTO) => {
    setIsLoading(true);
    try {
      if (mode === 'edit' && id) {
        await editFirma(data, id);
      } else {
        await createFirma(data);
      }
      toast.success(getSuccessMessage(mode));
      router.push('/firma');
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
        formTitle={getFormTitle(mode)}
        validationSchema={FirmaValidationSchema}
        defaultValues={defaultValues}
        isLoading={isLoading}
      >
        <TextInput
          placeholder="Wpisz nazwę"
          name="fullName"
          label="Pełna nazwa firmy"
        />
        <TextInput
          placeholder="Wpisz nazwę"
          name="shortName"
          label="Skrócona nazwa firmy"
        />
        <TextInput placeholder="Wpisz ulicę" name="street" label="Ulica" />
        <TextInput
          placeholder="Wpisz numer"
          name="houseNumber"
          label="Nr domu"
        />
        <TextInput
          placeholder="Wpisz numer"
          name="localNumber"
          label="Nr lokalu (opcjonalnie)"
        />
        <TextInput
          placeholder="Wpisz kod pocztowy"
          name="postCode"
          label="Poczta"
        />
        <TextInput
          placeholder="Wpisz miejscowość"
          name="city"
          label="Miejscowość"
        />
        <TextInput
          placeholder="Wpisz nr telefonu"
          name="tel"
          label="Telefon kontaktowy (opcjonalnie)"
        />
        <TextInput
          placeholder="Wpisz adres email"
          name="contactEmail"
          label="Email kontaktowy (opcjonalnie)"
        />
        <div className="my-5 flex justify-center">
          <CardTitle>Obiekty</CardTitle>
        </div>
        {Array.from({ length: locationCount }, (_, index) => (
          <React.Fragment key={index}>
            <FormSectionContainer title={`Obiekt ${index + 1}`}>
              {index > 0 && (
                <DecrementButton
                  onDecrement={handleDecrement}
                  mode={mode}
                  count={locationCount}
                />
              )}
              <TextInput
                label="Nazwa obiektu"
                placeholder="Wpisz nazwę"
                name={`locations.${index}.fullName`}
              />
              <TextInput
                label="Skrócona nazwa obiektu"
                placeholder="Wpisz nazwę"
                name={`locations.${index}.shortName`}
              />
              <TextInput
                label="Ulica"
                placeholder="Wpisz ulicę"
                name={`locations.${index}.street`}
              />
              <TextInput
                label="Nr domu"
                placeholder="Wpisz numer"
                name={`locations.${index}.houseNumber`}
              />
              <TextInput
                label="Nr lokalu (opcjonalnie)"
                placeholder="Wpisz numer"
                name={`locations.${index}.localNumber`}
              />
              <TextInput
                placeholder="np. 20-530"
                label="Poczta"
                name={`locations.${index}.postCode`}
              />
              <TextInput
                label="Miejscowość"
                placeholder="Wpisz miejscowość"
                name={`locations.${index}.city`}
              />
              <TextInput
                label="Telefon kontaktowy (opcjonalnie)"
                placeholder="Wpisz numer"
                name={`locations.${index}.tel`}
              />
              <TextInput
                placeholder="Wpisz adres email"
                label="Email kontaktowy (opcjonalnie)"
                name={`locations.${index}.contactEmail`}
              />
            </FormSectionContainer>
            {index + 1 === locationCount && (
              <IncrementButton onIncrement={handleIncrement} />
            )}
          </React.Fragment>
        ))}
      </FormContainer>
    </section>
  );
}
