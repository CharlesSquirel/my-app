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
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';

type SelectOptions = {
  value: string;
  label: string;
  key: string;
};

interface SelectInputProps {
  label: string;
  name: string;
  data: SelectOptions[];
  placeholder: string;
  isAsync?: boolean;
  secondaryData?: SelectOptions[];
}

export default function SelectInput({
  label,
  name,
  data,
  placeholder,
  isAsync,
  secondaryData,
}: SelectInputProps) {
  if (isAsync && !secondaryData) {
    throw new Error('secondaryData is required when isAsync is true');
  }
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [displayData, setDisplayData] = useState<SelectOptions[]>(data);
  console.log(data);
  useEffect(() => {
    if (isAsync && secondaryData) {
      const currentFirma = watch('firma');
      const displayLocation = secondaryData.filter(
        (item) => item.value === currentFirma,
      );
      setDisplayData(displayLocation);
    }
  }, [isAsync, watch, name, data, setValue]);
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Select onValueChange={(value) => setValue(name, value)}>
        <SelectTrigger className="w-1/2">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id={name} {...register(name)}>
          {displayData.map((item, index) => (
            <SelectItem value={item.value} key={item.key}>
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
