'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ErrorMessage } from '@hookform/error-message';
import { CircleAlert } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';

export type SelectOptions = {
  value: string;
  label: string;
};

interface SelectInputProps {
  label: string;
  name: string;
  data: SelectOptions[];
  placeholder: string;
  isAsync?: boolean;
  secondaryData?: SelectOptions[];
  disabled?: boolean;
}

export default function SelectInput({
  label,
  name,
  data,
  placeholder,
  isAsync,
  secondaryData,
  disabled,
}: SelectInputProps) {
  if (isAsync && !secondaryData) {
    throw new Error('secondaryData is required when isAsync is true');
  }
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  console.log(errors);
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} className={`${disabled && 'opacity-50'}`}>
        {label}
      </Label>
      <Select onValueChange={(value) => setValue(name, value)}>
        <SelectTrigger className="w-1/2" disabled={disabled}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id={name}>
          {data.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" {...register(name)} />
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
