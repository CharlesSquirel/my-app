'use client';
import { FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputType } from '@/lib/types/common';
import { ErrorMessage } from '@hookform/error-message';
import { CircleAlert } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  placeholder: string;
  label?: string;
  name: string;
  disabled?: boolean;
  defaultValues?: any;
  // arrayName?: string;
  description?: string;
  type?: InputType;
}

export default function TextInput({
  placeholder,
  name,
  label,
  disabled,
  defaultValues,
  // arrayName,
  description,
  type = 'text',
}: TextInputProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  // useEffect(() => {
  //   if (defaultValues && arrayName) {
  //     const index = name.charAt(arrayName.length + 1);
  //     if (defaultValues[arrayName][index]) {
  //       const restOfName = name.slice(name.indexOf(index) + 2);
  //       setValue(name, defaultValues[arrayName][index][restOfName]);
  //     }
  //   } else if (defaultValues) {
  //     setValue(name, defaultValues[name]);
  //   }
  // }, [setValue, name, defaultValues, arrayName]);

  return (
    <div className="flex min-h-[60px] flex-col gap-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        step={type === 'number' ? '0.01' : undefined}
        {...register(name, { valueAsNumber: type === 'number' })}
        autoComplete="off"
        aria-label={label || placeholder}
      />
      {description && <FormDescription>{description}</FormDescription>}

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div role="alert" className="flex gap-1 text-destructive">
            <CircleAlert width={16} />
            {message}
          </div>
        )}
      />
    </div>
  );
}
