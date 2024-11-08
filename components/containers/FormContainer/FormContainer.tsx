'use client';

import PageTitle from '@/components/common/PageTitle/PageTitle';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormModeType } from '@/lib/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
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
  validationSchema: ZodType<T>;
  closeUrl?: string;
  defaultValues: DefaultValues<T>;
  id?: string;
  title?: string;
  formTitle: string;
  mode: FormModeType;
}

const getSubmitButtonText = (mode: FormModeType) => {
  return mode === 'add' ? 'Utwórz' : 'Edytuj';
};

export default function FormContainer<T extends FieldValues>({
  children,
  onSubmit,
  title,
  formTitle,
  validationSchema,
  mode,
  defaultValues,
}: FormContainerProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PageTitle title={formTitle} />
        <Card className="w-[450px]">
          {title && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          )}
          <CardContent className="flex flex-col pb-0">{children}</CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">{getSubmitButtonText(mode)}</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
