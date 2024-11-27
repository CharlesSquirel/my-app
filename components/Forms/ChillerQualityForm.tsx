import { chillerAirPollution } from '@/lib/data/chillerData';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO } from '@/lib/zod/zodSchema';
import SelectInput from '../Inputs/SelectInput/SelectInput';

interface ChillerQualityFormProps {
  mode: FormModeType;
  defaultValues: ChillerDTO;
}

export default function ChillerQualityForm({
  mode,
  defaultValues,
}: ChillerQualityFormProps) {
  return (
    <>
      <SelectInput
        name="pollution"
        label="Stopień zanieczyszczenia powierzchni wymiany ciepła"
        placeholder="Wybierz stopień"
        defaultValue={mode === 'edit' ? defaultValues.pollution : undefined}
        data={chillerAirPollution}
      />
    </>
  );
}
