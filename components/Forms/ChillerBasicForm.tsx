import {
  chillerControlledParametersTypes,
  chillerDriverTypes,
  chillerFreonTypes,
  chillerRefrigerantTypes,
  chillerSwitchField,
  chillerTypes,
} from '@/lib/data/chillerData';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO } from '@/lib/zod/zodSchema';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import TextInput from '../Inputs/TextInput.tsx/TextInput';
import TextInputWithSwitch from '../Inputs/TextInputWithSwitch/TextInputWithSwitch';

interface ChillerBasicFormProps {
  mode: FormModeType;
  defaultValues: ChillerDTO;
}

export default function ChillerBasicForm({
  mode,
  defaultValues,
}: ChillerBasicFormProps) {
  return (
    <>
      <SelectInput
        placeholder="Wybierz typ"
        label="Typ"
        data={chillerTypes}
        name="type"
        defaultValue={mode === 'edit' ? defaultValues.type : undefined}
      />
      <TextInput
        placeholder="Wpisz numer"
        name="serialNumber"
        label="Nr seryjny"
      />
      <SelectInput
        data={chillerDriverTypes}
        placeholder="Wybierz typ"
        label="Typ sterownika"
        name="driverType"
        defaultValue={mode === 'edit' ? defaultValues.driverType : undefined}
      />
      <TextInputWithSwitch
        switchTrueLabel="Prawidłowa"
        switchFalseLabel="Nieprawidłowa"
        label="Różnica międzyfazowa"
        switchName="interphaseOK"
        textInputName="interphase"
      />
      <TextInput
        type="number"
        placeholder="Wpisz wartość"
        label="Temperatura powietrza zewnętrznego (°C)"
        name="airTemperature"
      />
      <SelectInput
        name="refrigerant"
        placeholder="Wybierz czynnik"
        label="Czynnik chłodzący"
        data={chillerRefrigerantTypes}
        defaultValue={mode === 'edit' ? defaultValues.refrigerant : undefined}
      />
      <SelectInput
        name="controlledParameter"
        label="Parametr kontrolowany"
        placeholder="Wybierz parametr"
        data={chillerControlledParametersTypes}
        defaultValue={
          mode === 'edit' ? defaultValues.controlledParameter : undefined
        }
      />
      <SelectInput
        name="freonType"
        label="Freon"
        placeholder="Wybierz freon"
        defaultValue={mode === 'edit' ? defaultValues.freonType : undefined}
        data={chillerFreonTypes}
      />
      <TextInput
        type="number"
        name="freonAmount"
        label="Ilość czynnika (kg)"
        placeholder="Wpisz wartość"
      />
      <SelectInput
        name="highPressure"
        label="Wyłącznik wysokiego ciśnienia"
        placeholder="Wybierz wartość"
        defaultValue={mode === 'edit' ? defaultValues.highPressure : undefined}
        data={chillerSwitchField}
      />
      <SelectInput
        name="lowPressure"
        label="Wyłącznik niskiego ciśnienia"
        placeholder="Wybierz wartość"
        defaultValue={mode === 'edit' ? defaultValues.lowPressure : undefined}
        data={chillerSwitchField}
      />
      <SelectInput
        name="antiFreezeTermostat"
        label="Termostat przeciwzamrożeniowy"
        placeholder="Wybierz wartość"
        defaultValue={
          mode === 'edit' ? defaultValues.antiFrezzeTermostat : undefined
        }
        data={chillerSwitchField}
      />
      <TextInput
        name="measuredVoltage_1"
        label="Zmierzone napięcie L1-L2 (V)"
        placeholder="Wpisz wartość"
        type="number"
      />
      <TextInput
        name="measuredVoltage_2"
        type="number"
        placeholder="Wpisz wartość"
        label="Zmierzone napięcie L1-L3 (V)"
      />
      <TextInput
        name="measuredVoltage_3"
        type="number"
        placeholder="Wpisz wartość"
        label="Zmierzone napięcie L2-L3 (V)"
      />
    </>
  );
}
