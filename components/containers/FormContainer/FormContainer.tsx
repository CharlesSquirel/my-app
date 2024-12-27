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
import { LoaderCircle } from 'lucide-react';
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
  isLoading?: boolean;
  subTitle?: string;
  badgeColor?: 'valve' | 'chiller';
  isSigned?: boolean;
}

export default function FormContainer<T extends FieldValues>({
  children,
  onSubmit,
  title,
  formTitle,
  validationSchema,
  mode,
  defaultValues,
  isLoading,
  subTitle,
  badgeColor,
  isSigned,
}: FormContainerProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  if (mode === 'edit' && isSigned === undefined) {
    throw new Error('isSigned is required in edit mode');
  }

  const getSubmitButtonText = (mode: FormModeType) => {
    return mode === 'add'
      ? 'Utwórz'
      : !isSigned
        ? 'Zapisz'
        : 'Zapisz i wyślij ponownie';
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 md:w-[700px]"
      >
        <PageTitle
          title={formTitle}
          subTitle={subTitle}
          badgeColor={badgeColor}
        />
        <Card>
          {title && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          )}
          <CardContent className="flex flex-col gap-2 pb-0">
            {children}
          </CardContent>
          <CardFooter className="justify-end">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                getSubmitButtonText(mode)
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
