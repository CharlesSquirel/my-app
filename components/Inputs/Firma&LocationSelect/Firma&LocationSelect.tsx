'use client';

import { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SelectInput, { SelectOptions } from '../SelectInput/SelectInput';

interface FirmaLocationSelectProps {
  firmaDefaultValues?: string;
  locationDefaultValues?: string;
  firms: Prisma.FirmaGetPayload<{
    include: {
      locations: true;
    };
  }>[];
}

export default function FirmaLocationSelect({
  firms,
  firmaDefaultValues,
  locationDefaultValues,
}: FirmaLocationSelectProps) {
  const [locationsOptions, setLocationsOptions] = useState<SelectOptions[]>([]);
  const { setValue, watch } = useFormContext();
  const currentFirma = watch('firma');
  const currentLocation = watch('location');

  const firmsOptions = firms.map((firma) => ({
    value: firma.id,
    label: firma.fullName,
  }));

  useEffect(() => {
    const selectedFirm = firms.find((firm) => firm.id === currentFirma);
    const filteredLocations = selectedFirm
      ? selectedFirm.locations.map((location) => ({
          value: location.id,
          label: location.shortName,
        }))
      : [];
    setLocationsOptions(filteredLocations);
    if (
      !filteredLocations.some((location) => location.value === currentLocation)
    ) {
      setValue('location', '');
    }
  }, [currentFirma, firms, setValue, currentLocation]);

  return (
    <div className="flex flex-col gap-2">
      <SelectInput
        name="firma"
        label="Firma"
        placeholder="Wybierz firmę"
        data={firmsOptions}
        defaultValue={firmaDefaultValues}
      />
      <SelectInput
        name="location"
        label="Obiekt"
        placeholder="Wybierz obiekt"
        data={locationsOptions}
        disabled={!locationsOptions.length}
        defaultValue={locationDefaultValues}
      />
    </div>
  );
}
