'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface TextareaInputProps {
  label: string;
  placeholder: string;
  name: string;
}

export default function TextareaInput({
  label,
  placeholder,
  name,
}: TextareaInputProps) {
  const { register, getValues } = useFormContext();
  console.log(getValues());
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        placeholder={placeholder}
        id={name}
        {...register(name)}
        className="min-h-[100px]"
      ></Textarea>
    </div>
  );
}
