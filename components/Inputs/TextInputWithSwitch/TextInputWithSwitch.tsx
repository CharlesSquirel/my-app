'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ErrorMessage } from '@hookform/error-message';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from '../TextInput.tsx/TextInput';

interface TextInputWithSwitchProps {
  label: string;
  switchTrueLabel: string;
  switchFalseLabel: string;
  switchName: string;
  textInputName: string;
}

export default function TextInputWithSwitch({
  label,
  switchTrueLabel,
  textInputName,
  switchFalseLabel,
  switchName,
}: TextInputWithSwitchProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isSwitchTrue, setIsSwitchTrue] = useState(true);
  const handleSwitchChange = () => {
    setIsSwitchTrue(!isSwitchTrue);
    const switchValue = !isSwitchTrue ? switchTrueLabel : switchFalseLabel;
    setValue(switchName, switchValue);
    if (!isSwitchTrue) {
      setValue(textInputName, 0);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={switchName}>{label}</Label>
      <div className="flex items-center gap-2">
        <Switch onCheckedChange={handleSwitchChange} id={switchName} />
        <Label>{isSwitchTrue ? switchTrueLabel : switchFalseLabel}</Label>
      </div>
      <ErrorMessage
        errors={errors}
        name={switchName}
        render={({ message }) => (
          <div role="alert" className="flex gap-1 text-destructive">
            <CircleAlert width={16} />
            {message}
          </div>
        )}
      />
      {!isSwitchTrue && (
        <TextInput
          placeholder="Wpisz odchylenie"
          name={textInputName}
          disabled={isSwitchTrue}
          label="Odchylenie"
          type="number"
        />
      )}
    </div>
  );
}
