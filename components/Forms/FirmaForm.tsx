'use client';

import { FormModeType } from '@/lib/types/common';
import { FirmaDTO } from '@/lib/types/firmaTypes';
import { FirmaValidationSchema } from '@/lib/zod/zodSchema';
import { MinusCircleIcon, PlusCircleIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from '../common/TextInput.tsx/TextInput';
import FormContainer from '../containers/FormContainer/FormContainer';
import FormSectionContainer from '../containers/FormSectionContainer/FormSectionContainer';
import { CardTitle } from '../ui/card';

interface FirmaFormProps {
  mode: FormModeType;
  defaultValues: Partial<FirmaDTO>;
  id?: string;
}

const getFormTitle = (mode: FormModeType) => {
  return mode === 'add' ? 'Dodaj nową firmę' : 'Edytuj firmę';
};

export default function FirmaForm({ mode, defaultValues, id }: FirmaFormProps) {
  const [locationCount, setLocationCount] = useState(1);
  const handleIncrement = () => {
    setLocationCount(locationCount + 1);
  };
  const handleDecrement = () => {
    setLocationCount(locationCount - 1);
  };
  const router = useRouter();

  const handleOnSubmit = (data: FirmaDTO) => {
    console.log(data);
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
        formTitle={getFormTitle(mode)}
        validationSchema={FirmaValidationSchema}
        defaultValues={defaultValues}
      >
        <TextInput placeholder="Nazwa" name="fullName" />
        <TextInput placeholder="Skrócona nazwa" name="shortName" />
        <TextInput placeholder="Ulica" name="street" />
        <TextInput placeholder="Poczta" name="postCode" />
        <TextInput placeholder="Miasto" name="city" />
        <TextInput placeholder="Telefon kontaktowy" name="tel" />
        <TextInput placeholder="Email kontaktowy" name="contactEmail" />
        <div className="mb-5 flex justify-between">
          <CardTitle>Obiekty</CardTitle>
          <PlusCircleIcon
            className="cursor-pointer"
            onClick={handleIncrement}
          />
        </div>
        {Array.from({ length: locationCount }, (_, index) => (
          <FormSectionContainer title={`Obiekt ${index + 1}`} key={index}>
            <MinusCircleIcon stroke="destructive" />
            <TextInput
              placeholder="Nazwa"
              name={`locations.${index}.fullName`}
            />
            <TextInput
              placeholder="Skrócona nazwa"
              name={`locations.${index}.shortName`}
            />
            <TextInput placeholder="Ulica" name={`locations.${index}.street`} />
            <TextInput
              placeholder="Poczta"
              name={`locations.${index}.postCode`}
            />
            <TextInput placeholder="Miasto" name={`locations.${index}.city`} />
            <TextInput
              placeholder="Telefon kontaktowy"
              name={`locations.${index}.tel`}
            />
            <TextInput
              placeholder="Email kontaktowy"
              name={`locations.${index}.contactEmail`}
            />
          </FormSectionContainer>
        ))}
      </FormContainer>
    </section>
  );
}

// fullName: string;
// shortName: string;
// street: string;
// houseNumber: number;
// localNumber?: number;
// postCode: string;
// city: string;
// tel?: string;
// contactEmail?: string;
// locations: LocationDTO[];
