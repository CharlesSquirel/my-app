import { z } from 'zod';

export const createNumberValidator = () =>
  z
    .number({
      required_error: 'To pole jest wymagane!',
      invalid_type_error: 'To pole jest wymagane!',
    })
    .min(0, { message: 'Wartość nie może być mniejsze niż 0' });
export const createStringValidator = () =>
  z
    .string({ required_error: 'To pole jest wymagane!' })
    .min(1, { message: 'To pole jest wymagane!' });
