import { z } from 'zod';
import { createNumberValidator, createStringValidator } from './zodHelpers';

const validationMessages = {
  invalidEmailFormat: 'To nie jest poprawny format email',
  invalidPhoneFormat: 'To nie jest poprawny numer telefonu',
  invalidPostCodeFormat: 'To nie jest poprawny kod pocztowy!',
  invalidPostCodeLetters: 'Kod pocztowy musi składać się z 6 znaków!',
  invalidEmptyString: 'To pole nie może być puste',
};

const getvalidationStringMessage = (num: number): string => {
  return `To pole nie może mieć więcej niż ${num} znaków!`;
};

const getValidationNumberMessage = (num: number): string => {
  return `To pole musi być większe niż ${num}`;
};

const ProtocolType = z.union([z.literal('valve'), z.literal('chiller')]);
export type ProtocolType = z.infer<typeof ProtocolType>;

const AirPollution = z
  .string()
  .refine(
    (val) =>
      [
        'Bardzo brudny',
        'Brudny',
        'Koniecznie do mycia',
        'Czysty',
        'Bardzo czysty',
      ].includes(val),
    {
      message: validationMessages.invalidEmptyString,
    },
  );

const TermalInsulation = z
  .string()
  .refine(
    (val) =>
      ['Bardzo słaby', 'Słaby', 'Średni', 'Dobry', 'Bardzo dobry'].includes(
        val,
      ),
    {
      message: validationMessages.invalidEmptyString,
    },
  );

const IsValid = z
  .string()
  .refine(
    (val) =>
      ['Poprawny', 'Niepoprawny', 'Prawidłowa', 'Nieprawidłowa'].includes(val),
    {
      message: validationMessages.invalidEmptyString,
    },
  );

const FreonTypes = z
  .string()
  .refine(
    (val) =>
      ['R134A', 'R410A', 'R407C', 'R32', 'R404A', 'R22', 'R290'].includes(val),
    {
      message: validationMessages.invalidEmptyString,
    },
  );

const Refrigerant = z
  .string()
  .refine((val) => ['Woda', 'Roztwór glikolu'].includes(val), {
    message: validationMessages.invalidEmptyString,
  });

const SwitchField = z
  .string()
  .refine((val) => ['Wyłączony', 'Załączony'].includes(val), {
    message: validationMessages.invalidEmptyString,
  });

const WaterField = z
  .string()
  .refine((val) => ['Wejście wody', 'Wyjście wody'].includes(val), {
    message: validationMessages.invalidEmptyString,
  });
const ControlMethod = z
  .string()
  .refine((val) => ['Bezpośrednio', 'Pośrednio'].includes(val), {
    message: validationMessages.invalidEmptyString,
  });

const NecessaryField = z
  .string()
  .refine((val) => ['Konieczna', 'Niekonieczna'].includes(val), {
    message: validationMessages.invalidEmptyString,
  });

const DeviceType = z
  .string()
  .refine(
    (val) =>
      ['Sprężarka', 'Wentylator', 'Pompa WL', 'Silnik', 'Falownik'].includes(
        val,
      ),
    {
      message: validationMessages.invalidEmptyString,
    },
  );

const CircuitValidationSchema = z.object({
  dischargePressure: createNumberValidator(),
  condensationTemperature: createNumberValidator(),
  subcooling: createNumberValidator(),
  airTemperature: createNumberValidator(),

  suctionPressure: createNumberValidator(),
  suctionTemperature: createNumberValidator(),
  overHeat: createNumberValidator(),

  inWaterPressure: createNumberValidator(),
  outWaterPressure: createNumberValidator(),
  inTemperature: createNumberValidator(),
  outTemperature: createNumberValidator(),
});

const PowerConsumptionSchema = z.object({
  deviceType: DeviceType,
  amperage_1: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  amperage_2: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  amperage_3: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  interphaseOk: IsValid,
  interphase: createNumberValidator().optional(),
});

export const ChillerValidationSchema = z.object({
  userId: createStringValidator(),
  userSignature: createStringValidator(),
  lastName: createStringValidator(),
  firstName: createStringValidator(),
  protocolType: ProtocolType,

  firma: createStringValidator(),
  location: createStringValidator(),

  type: createStringValidator(),
  serialNumber: createStringValidator(),
  driverType: createStringValidator(),
  airTemperature: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  interphaseOK: IsValid,
  interphase: createNumberValidator().optional(),
  refrigerationCircuits: z
    .array(z.number())
    .min(1, { message: 'Musi być minimum 1 obieg' }),
  refrigerant: Refrigerant,
  settingsTemperature: z
    .array(z.number())
    .min(1, { message: 'Musi być minimum 1 temperatura' }),
  controlledParameter: WaterField,
  supplyVoltage: createNumberValidator(),
  supplyPhase: createNumberValidator(),
  freonType: FreonTypes,
  freonAmount: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  highPressure: SwitchField,
  lowPressure: SwitchField,
  antiFrezzeTermostat: SwitchField,
  measuredVoltage_1: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  measuredVoltage_2: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  measuredVoltage_3: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),

  pollution: AirPollution,
  termalInsulation: TermalInsulation,
  termalAndPressureControl: IsValid,
  oilLevel: IsValid,
  indicatorColor: IsValid,
  currentConsumption: IsValid,
  fansConsumption: IsValid,
  tightSystem: IsValid,

  controlMethod: ControlMethod,
  leakGasTest: NecessaryField,
  gasAdded: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
  gasRegain: createNumberValidator().min(1, {
    message: getValidationNumberMessage(1),
  }),
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
  signed: z.boolean(),
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
