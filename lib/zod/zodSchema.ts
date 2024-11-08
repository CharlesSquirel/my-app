import { z } from 'zod';
import { createNumberValidator, createStringValidator } from './zodHelpers';

const AirPollution = z.union([
  z.literal('Bardzo brudny'),
  z.literal('Brudny'),
  z.literal('Koniecznie do mycia'),
  z.literal('Czysty'),
  z.literal('Bardzo czysty'),
]);

const TermalInsulation = z.union([
  z.literal('Bardzo słaby'),
  z.literal('Słaby'),
  z.literal('Średni'),
  z.literal('Dobry'),
  z.literal('Bardzo dobry'),
]);

const IsValid = z.union([z.literal('Poprawny'), z.literal('Niepoprawny')]);

const FreonTypes = z.union([
  z.literal('R134A'),
  z.literal('R410A'),
  z.literal('R407C'),
  z.literal('R32'),
  z.literal('R404A'),
  z.literal('R22'),
  z.literal('R290'),
]);

const Refrigerant = z.union([z.literal('Woda'), z.literal('Roztwór glikolu')]);

const SwitchField = z.union([z.literal('Wyłączony'), z.literal('Załączony')]);

const WaterField = z.union([
  z.literal('Wejście wody'),
  z.literal('Wyjście wody'),
]);

const ControlMethod = z.union([
  z.literal('Bezpośrednio'),
  z.literal('Pośrednio'),
]);

const NecessaryField = z.union([
  z.literal('Konieczna'),
  z.literal('Niekonieczna'),
]);

const DeviceType = z.union([
  z.literal('Sprężarka'),
  z.literal('Wentylator'),
  z.literal('Pompa WL'),
  z.literal('Silnik'),
  z.literal('Falownik'),
]);

const CircuitValidationSchema = z.object({
  dischargePressure: createNumberValidator(),
  condensationTemperature: createNumberValidator(),
  subcooling: createNumberValidator(),
  airTemperature: createNumberValidator(),
  suctionPressure: createNumberValidator(),
  suctionTemperature: createNumberValidator(),
  overHeat: createNumberValidator(),
  inTemperature: createNumberValidator(),
  outTemperature: createNumberValidator(),
  inWaterPressure: createNumberValidator(),
  outWaterPressure: createNumberValidator(),
});

const PowerConsumptionSchema = z.object({
  deviceType: DeviceType,
  amperage_1: createNumberValidator(),
  amperage_2: createNumberValidator(),
  amperage_3: createNumberValidator(),
  interphase: createNumberValidator().optional(),
  interphaseOk: IsValid,
});

export const ChillerValidationSchema = z.object({
  location: createStringValidator(),
  firma: createStringValidator(),
  type: createStringValidator(),
  serialNumber: createStringValidator(),
  pollution: AirPollution,
  termalInsulation: TermalInsulation,
  termalAndPressureControl: IsValid,
  supplyVoltage: createNumberValidator(),
  supplyPhase: createNumberValidator(),
  measuredVoltage_1: createNumberValidator(),
  measuredVoltage_2: createNumberValidator(),
  measuredVoltage_3: createNumberValidator(),
  interphase: createNumberValidator().optional(),
  interphaseOK: IsValid,
  freonType: FreonTypes,
  freonAmount: createNumberValidator(),
  refrigerationCircuits: z
    .array(z.number())
    .min(1, { message: 'Musi być minimum 1 obieg' }),
  driverType: createStringValidator(),
  refrigerant: Refrigerant,
  airTemperature: createNumberValidator(),
  oilLevel: IsValid,
  indicatorColor: IsValid,
  tightSystem: IsValid,
  currentConsumption: IsValid,
  fansConsumption: IsValid,
  highPressure: SwitchField,
  lowPressure: SwitchField,
  antiFrezzeTermostat: SwitchField,
  settingsTemperature: z
    .array(z.number())
    .min(1, { message: 'Musi być minimum 1 temperatura' }),
  controlledParameter: WaterField,
  controlMethod: ControlMethod,
  leakGasTest: NecessaryField,
  gasAdded: createNumberValidator(),
  gasRegain: createNumberValidator(),
  description: z.string().optional(),
  circuits: z
    .array(CircuitValidationSchema)
    .min(1, { message: 'Musi być minimum 1 obieg' }),
  powerConsumptions: z
    .array(PowerConsumptionSchema)
    .min(1, { message: 'Musi być minimum 1' }),
});

export type SchemaTypeChiller = z.infer<typeof ChillerValidationSchema>;

export const UserValidationSchema = z.object({
  firstName: createStringValidator(),
  lastName: createStringValidator(),
  userSignature: createStringValidator(),
  email: createStringValidator().email({
    message: 'Nieprawidłowy format email',
  }),
});

export const LocationValidationSchema = z.object({
  fullName: createStringValidator(),
  shortName: createStringValidator().max(10, {
    message: 'To pole nie może mieć więcej niż 10 znaków!',
  }),
  street: createStringValidator(),
  houseNumber: createNumberValidator(),
  localNumber: z
    .number({
      invalid_type_error: 'To pole jest wymagane!',
    })
    .optional(),
  postCode: createStringValidator()
    .length(6, {
      message: 'Kod pocztowy musi składać się z 6 znaków!',
    })
    .regex(/^\d{2}-\d{3}$/, { message: 'To nie jest poprawny kod pocztowy!' }),
  city: createStringValidator(),
  tel: z
    .string()
    .optional()
    .refine((value) => !value || /^[\d\s-]+$/.test(value), {
      message: 'To nie jest poprawny numer telefonu!',
    }),
  contactEmail: z.string().optional(),
});

export const FirmaValidationSchema = z.object({
  fullName: createStringValidator(),
  shortName: createStringValidator().max(10, {
    message: 'To pole nie może mieć więcej niż 10 znaków!',
  }),
  street: createStringValidator(),
  houseNumber: createNumberValidator(),
  localNumber: z
    .number({
      invalid_type_error: 'To pole jest wymagane!',
    })
    .optional(),
  postCode: createStringValidator()
    .length(6, {
      message: 'Kod pocztowy musi składać się z 6 znaków!',
    })
    .regex(/^\d{2}-\d{3}$/, { message: 'To nie jest poprawny kod pocztowy!' }),
  city: createStringValidator(),
  tel: z
    .string()
    .optional()
    .refine((value) => !value || /^[\d\s-]+$/.test(value), {
      message: 'To nie jest poprawny numer telefonu!',
    }),
  contactEmail: z.string().optional(),
  locations: z
    .array(LocationValidationSchema)
    .min(1, { message: 'Musi być minimum 1 obiekt' }),
});
