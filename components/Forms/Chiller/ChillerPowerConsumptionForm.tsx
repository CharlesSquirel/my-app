import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import TextInputWithSwitch from '@/components/Inputs/TextInputWithSwitch/TextInputWithSwitch';
import { chillerDeviceTypes } from '@/lib/data/chillerData';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO } from '@/lib/zod/zodSchema';

interface ChillerPowerConsumptionFormProps {
  index: number;
  mode: FormModeType;
  defaultValues: ChillerDTO;
}

export default function ChillerPowerConsumptionForm({
  mode,
  index,
  defaultValues,
}: ChillerPowerConsumptionFormProps) {
  return (
    <>
      <SelectInput
        name={`powerConsumptions.${index}.deviceType`}
        label="Typ urządzenia"
        placeholder="Wybierz urządzenie"
        defaultValue={
          mode === 'edit'
            ? defaultValues.powerConsumptions[index]?.deviceType
            : undefined
        }
        data={chillerDeviceTypes}
      />
      <TextInput
        name={`powerConsumptions.${index}.amperage_1`}
        label="L1-L2 (A)"
        placeholder="Wpisz wartość"
        type="number"
      />
      <TextInput
        name={`powerConsumptions.${index}.amperage_2`}
        label="L1-L2 (A)"
        placeholder="Wpisz wartość"
        type="number"
      />
      <TextInput
        name={`powerConsumptions.${index}.amperage_3`}
        label="L1-L2 (A)"
        placeholder="Wpisz wartość"
        type="number"
      />
      <TextInputWithSwitch
        switchName={`powerConsumptions.${index}.interphaseOk`}
        textInputName={`powerConsumptions.${index}.interphase`}
        label="Różnica międzyfazowa"
        switchTrueLabel="Prawidłowa"
        switchFalseLabel="Nieprawidłowa"
      />
    </>
  );
}
