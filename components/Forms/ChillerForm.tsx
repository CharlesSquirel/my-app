'use client';

import { ChillerDTO } from '@/lib/types/chillerTypes';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../common/TextInput.tsx/TextInput';
import { Button } from '../ui/button';

export default function ChillerForm() {
  const form = useForm<ChillerDTO>();
  const onSubmit = (data: ChillerDTO) => console.log(data);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <TextInput placeholder="Wpisz" name="firma" label="asdasd" />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
