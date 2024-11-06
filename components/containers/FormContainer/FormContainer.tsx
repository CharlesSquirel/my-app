'use client';

import PageTitle from '@/components/common/PageTitle/PageTitle';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  title?: string;
  formTitle: string;
}

export default function FormContainer<T extends FieldValues>({
  children,
  onSubmit,
  title,
  formTitle,
}: FormContainerProps<T>) {
  const form = useForm<T>();
  // const onSubmit = (data: ChillerDTO) => console.log(data);
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
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
