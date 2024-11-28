import {
  chillerAirPollution,
  chillerTermalInsulationTypes,
  chillerValidTypes,
} from '@/lib/data/chillerData';
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
      <SelectInput
        name="termalInsulation"
        label="Stan techniczny izolacji termicznej"
        placeholder="Wybierz stopień"
        defaultValue={
          mode === 'edit' ? defaultValues.termalInsulation : undefined
        }
        data={chillerTermalInsulationTypes}
      />
      <SelectInput
        name="termalAndPressureControl"
        label="Kontrola podpór, drgań i przemieszczeń powodowanych temperaturą i ciśnieniem"
        placeholder="Wybierz opcję"
        defaultValue={
          mode === 'edit' ? defaultValues.termalAndPressureControl : undefined
        }
        data={chillerValidTypes}
      />
      <SelectInput
        name="oilLevel"
        label="Poziom oleju w sprężarkach"
        placeholder="Wybierz opcję"
        defaultValue={mode === 'edit' ? defaultValues.oilLevel : undefined}
        data={chillerValidTypes}
      />
      <SelectInput
        name="indicatorColor"
        label="Kolor wskaźnika wilgotności"
        placeholder="Wybierz opcję"
        defaultValue={
          mode === 'edit' ? defaultValues.indicatorColor : undefined
        }
        data={chillerValidTypes}
      />
      <SelectInput
        name="currentConsumption"
        label="Pobór prądu przez sprężarki"
        placeholder="Wybierz opcję"
        defaultValue={
          mode === 'edit' ? defaultValues.currentConsumption : undefined
        }
        data={chillerValidTypes}
      />
      <SelectInput
        name="fansConsumption"
        label="Pobór prądu przez wentylatory"
        placeholder="Wybierz opcję"
        defaultValue={
          mode === 'edit' ? defaultValues.fansConsumption : undefined
        }
        data={chillerValidTypes}
      />
      <SelectInput
        name="tightSystem"
        label="Układ chłodny szczelny"
        placeholder="Wybierz opcję"
        defaultValue={mode === 'edit' ? defaultValues.tightSystem : undefined}
        data={chillerValidTypes}
      />
    </>
  );
}
