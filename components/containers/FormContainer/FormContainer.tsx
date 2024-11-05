'use client';

import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '../../ui/button';

interface FormContainerProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  validationSchema?: ZodType<any, any, any>;
  closeUrl?: string;
  defaultValues?: DefaultValues<T>;
  id?: string;
}

export default function FormContainer<T extends FieldValues>({
  children,
  onSubmit,
}: FormContainerProps<T>) {
  const form = useForm<T>();
  // const onSubmit = (data: ChillerDTO) => console.log(data);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {children}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
