'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  placeholder: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValues?: any;
  arrayName?: string;
}

export default function TextInput2({
  placeholder,
  name,
  label,
  disabled,
  defaultValues,
  arrayName,
}: TextInputProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  useEffect(() => {
    if (defaultValues && arrayName) {
      const index = name.charAt(arrayName.length + 1);
      if (defaultValues[arrayName][index]) {
        const restOfName = name.slice(name.indexOf(index) + 2);
        setValue(name, defaultValues[arrayName][index][restOfName]);
      }
    } else if (defaultValues) {
      setValue(name, defaultValues[name]);
    }
  }, [setValue, name, defaultValues, arrayName]);

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        placeholder={placeholder}
        type="text"
        disabled={disabled}
        {...register(name)}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p role="alert" className="text-error">
            {message}
          </p>
        )}
      />
    </div>
  );
}
