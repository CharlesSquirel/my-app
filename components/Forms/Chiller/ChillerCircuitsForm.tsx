import TextInput from '@/components/Inputs/TextInput/TextInput';
import { Label } from '@/components/ui/label';
import { FormModeType } from '@/lib/types/common';
import { ChillerDTO } from '@/lib/zod/zodSchema';

interface ChillerCircuitsFormProps {
  index: number;
  mode: FormModeType;
  defaultValues: ChillerDTO;
}

export default function ChillerCircuitsForm({
  index,
  mode,
  defaultValues,
}: ChillerCircuitsFormProps) {
  return (
    <>
      <div className="mb-5 flex flex-col gap-2">
        <Label className="uppercase text-gray-500">Parametry tłoczenia</Label>
        <TextInput
          name={`circuits.${index}.dischargePressure`}
          type="number"
          placeholder="Wpisz wartość"
          label="Ciśnienie tłoczenia (bar)"
        />
        <TextInput
          name={`circuits.${index}.condensationTemperature`}
          type="number"
          placeholder="Wpisz wartość"
          label="Temperatura skraplania (°C)"
        />
        <TextInput
          name={`circuits.${index}.subcooling`}
          type="number"
          placeholder="Wpisz wartość"
          label="Dochłodzenie (°C)"
        />
        <TextInput
          name={`circuits.${index}.airTemperature`}
          type="number"
          placeholder="Wpisz wartość"
          label="Temperatura wylotowa powietrza (°C)"
        />
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <Label className="uppercase text-gray-500">Parametry ssania</Label>
        <TextInput
          name={`circuits.${index}.suctionPressure`}
          type="number"
          placeholder="Wpisz wartość"
          label="Ciśnienie ssania (bar)"
        />
        <TextInput
          name={`circuits.${index}.suctionTemperature`}
          type="number"
          placeholder="Wpisz wartość"
          label="Temperatura ssania (°C)"
        />
        <TextInput
          name={`circuits.${index}.overHeat`}
          type="number"
          placeholder="Wpisz wartość"
          label="Przegrzanie (°C)"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="uppercase text-gray-500">Parametry parownika</Label>
        <TextInput
          name={`circuits.${index}.inWaterPressure`}
          type="number"
          placeholder="Wpisz wartość"
          label="Ciśnienie wody wejścia (bar)"
        />
        <TextInput
          name={`circuits.${index}.outWaterPressure`}
          type="number"
          placeholder="Wpisz wartość"
          label="Ciśnienie wody wyjścia (°C)"
        />
        <TextInput
          name={`circuits.${index}.inTemperature`}
          type="number"
          placeholder="Wpisz wartość"
          label="Temperatura wejściowa (°C)"
        />
        <TextInput
          name={`circuits.${index}.outTemperature`}
          type="number"
          placeholder="Wpisz wartość"
          label="Temperatura wyjściowa (°C)"
        />
      </div>
    </>
  );
}
