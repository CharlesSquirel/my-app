import { z } from 'zod';
import { createNumberValidator, createStringValidator } from './zodHelpers';

const validationMessages = {
  invalidEmailFormat: 'To nie jest poprawny format email',
  invalidPhoneFormat: 'To nie jest poprawny numer telefonu',
  invalidPostCodeFormat: 'To nie jest poprawny kod pocztowy!',
  invalidPostCodeLetters: 'Kod pocztowy musi składać się z 6 znaków!',
};

const getvalidationStringMessage = (num: number): string => {
  return `To pole nie może mieć więcej niż ${num} znaków!`;
};

const ProtocolType = z.union([z.literal('valve'), z.literal('chiller')]);

const AirPollution = z.union([
  z.literal('Bardzo brudny'),
  z.literal('Brudny'),
  z.literal('Koniecznie do mycia'),
  z.literal('Czysty'),
  z.literal('Bardzo czysty'),
  z.literal('Brak informacji'),
]);

const TermalInsulation = z.union([
  z.literal('Bardzo słaby'),
  z.literal('Słaby'),
  z.literal('Średni'),
  z.literal('Dobry'),
  z.literal('Bardzo dobry'),
  z.literal('Brak informacji'),
]);

const IsValid = z.union([
  z.literal('Poprawny'),
  z.literal('Niepoprawny'),
  z.literal('Brak informacji'),
]);

const FreonTypes = z.union([
  z.literal('R134A'),
  z.literal('R410A'),
  z.literal('R407C'),
  z.literal('R32'),
  z.literal('R404A'),
  z.literal('R22'),
  z.literal('R290'),
  z.literal('Brak informacji'),
]);

const Refrigerant = z.union([
  z.literal('Woda'),
  z.literal('Roztwór glikolu'),
  z.literal('Brak informacji'),
]);

const SwitchField = z.union([
  z.literal('Wyłączony'),
  z.literal('Załączony'),
  z.literal('Brak informacji'),
]);

const WaterField = z.union([
  z.literal('Wejście wody'),
  z.literal('Wyjście wody'),
  z.literal('Brak informacji'),
]);

const ControlMethod = z.union([
  z.literal('Bezpośrednio'),
  z.literal('Pośrednio'),
  z.literal('Brak informacji'),
]);

const NecessaryField = z.union([
  z.literal('Konieczna'),
  z.literal('Niekonieczna'),
  z.literal('Brak informacji'),
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
  firma: createStringValidator(),
  location: createStringValidator(),
  userId: createStringValidator(),
  userSignature: createStringValidator(),
  firstName: createStringValidator(),
  lastName: createStringValidator(),
  type: createStringValidator(),
  serialNumber: createStringValidator(),
  protocolType: ProtocolType,
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
    message: validationMessages.invalidEmailFormat,
  }),
});

export const LocationValidationSchema = z.object({
  fullName: createStringValidator(),
  shortName: createStringValidator().max(10, {
    message: getvalidationStringMessage(10),
  }),
  street: createStringValidator(),
  houseNumber: createStringValidator(),
  localNumber: z.string().optional(),
  postCode: createStringValidator()
    .length(6, {
      message: validationMessages.invalidPostCodeLetters,
    })
    .regex(/^\d{2}-\d{3}$/, {
      message: validationMessages.invalidPostCodeFormat,
    }),
  city: createStringValidator(),
  tel: z
    .string()
    .optional()
    .refine((value) => !value || /^[\d\s-]+$/.test(value), {
      message: validationMessages.invalidPhoneFormat,
    }),
  contactEmail: z.string().optional(),
});

export const FirmaValidationSchema = z.object({
  fullName: createStringValidator(),
  shortName: createStringValidator().max(10, {
    message: getvalidationStringMessage(10),
  }),
  street: createStringValidator(),
  houseNumber: createStringValidator(),
  localNumber: z.string().optional(),
  postCode: createStringValidator()
    .length(6, {
      message: validationMessages.invalidPostCodeLetters,
    })
    .regex(/^\d{2}-\d{3}$/, {
      message: validationMessages.invalidPostCodeFormat,
    }),
  city: createStringValidator(),
  tel: z
    .string()
    .optional()
    .refine((value) => !value || /^[\d\s-]+$/.test(value), {
      message: validationMessages.invalidPhoneFormat,
    }),
  contactEmail: z.string().optional(),
  locations: z
    .array(LocationValidationSchema)
    .min(1, { message: 'Musi być minimum 1 obiekt' }),
});

const ValvesInfoBlockSchema = z.object({
  valveLocation: createStringValidator(),
  valveType: createStringValidator(),
  valveSerialNumber: createStringValidator(),
  pressureOpen: createNumberValidator(),
  pressureClose: createNumberValidator(),
  pressureSetting: createNumberValidator(),
  description: z.string().optional(),
});

export const ValvesValidationSchema = z.object({
  userId: createStringValidator(),
  userSignature: createStringValidator(),
  firstName: createStringValidator(),
  lastName: createStringValidator(),
  firma: createStringValidator(),
  location: createStringValidator(),
  type: createStringValidator(),
  serialNumber: createStringValidator(),
  infoBlocks: z.array(ValvesInfoBlockSchema).min(1),
  description: z.string().optional(),
  protocolType: createStringValidator(),
});

export type ValveDTO = z.infer<typeof ValvesValidationSchema>;
export type ChillerDTO = z.infer<typeof ChillerValidationSchema>;
