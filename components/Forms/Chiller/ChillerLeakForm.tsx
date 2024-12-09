import {
  chillerControlledParametersTypes,
  chillerNecessaryTypes,
} from '@/lib/data/chillerData';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO } from '@/lib/zod/zodSchema';
import SelectInput from '../../Inputs/SelectInput/SelectInput';
import TextInput from '../../Inputs/TextInput/TextInput';

interface ChillerLeakFormProps {
  mode: FormModeType;
  defaultValues: ChillerDTO;
}

export default function ChillerLeakForm({
  mode,
  defaultValues,
}: ChillerLeakFormProps) {
  return (
    <>
      <SelectInput
        name="controlMethod"
        label="Metoda kontroli szczelności"
        placeholder="Wybierz metodę"
        defaultValue={mode === 'edit' ? defaultValues.controlMethod : undefined}
        data={chillerControlledParametersTypes}
      />
      <SelectInput
        name="leakGasTest"
        label="Próba szczelności za pomocą gazu obojętnego"
        placeholder="Wybierz opcję"
        defaultValue={mode === 'edit' ? defaultValues.leakGasTest : undefined}
        data={chillerNecessaryTypes}
      />
      <TextInput
        name="gasAdded"
        label="Dodano gazu (kg)"
        placeholder="Wpisz wartość"
        type="number"
      />
      <TextInput
        name="gasRegain"
        label="Odzyskano gazu (kg)"
        placeholder="Wpisz wartość"
        type="number"
      />
    </>
  );
}
