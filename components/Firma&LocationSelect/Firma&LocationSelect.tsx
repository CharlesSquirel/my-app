'use client';

import { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SelectInput, { SelectOptions } from '../SelectInput/SelectInput';

interface FirmaLocationSelectProps {
  firms: Prisma.FirmaGetPayload<{
    include: {
      locations: true;
    };
  }>[];
}

export default function FirmaLocationSelect({
  firms,
}: FirmaLocationSelectProps) {
  const [locationsOptions, setLocationsOptions] = useState<SelectOptions[]>([]);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const currentFirma = watch('firma');
  console.log(currentFirma);
  const firmsOptions = firms.map((firma) => ({
    value: firma.id,
    label: firma.fullName,
  }));

  //   const locationsOptions = firms.flatMap((firma) =>
  //     firma.locations.map((location) => ({
  //       value: location.id,
  //       label: location.shortName,
  //     })),
  //   );

  useEffect(() => {
    const selectedFirm = firms.find((firm) => firm.id === currentFirma);
    const filteredLocations = selectedFirm
      ? selectedFirm.locations.map((location) => ({
          value: location.id,
          label: location.shortName,
        }))
      : [];
    setLocationsOptions(filteredLocations);
    setValue('location', ''); // Reset location field
  }, [currentFirma, firms, setValue]);
  //   console.log(
  //     new Set(locationsOptions.map((location) => location.value)).size ===
  //       locationsOptions.length,
  //   );

  return (
    <div className="flex flex-col gap-1">
      <SelectInput
        name="firma"
        label="Firma"
        placeholder="Wybierz firmę"
        data={firmsOptions}
      />
      <SelectInput
        name="location"
        label="Obiekt"
        placeholder="Wybierz obiekt"
        data={locationsOptions}
        disabled={!locationsOptions.length}
      />
    </div>
  );
}
