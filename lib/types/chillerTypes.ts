type AirPollution =
  | 'Bardzo brudny'
  | 'Brudny'
  | 'Koniecznie do mycia'
  | 'Czysty'
  | 'Bardzo czysty'
  | undefined;

type TermalInsulation =
  | 'Bardzo słaby'
  | 'Słaby'
  | 'Średni'
  | 'Dobry'
  | 'Bardzo dobry'
  | undefined;

type IsValid = 'Prawidłowy' | 'Nieprawidłowy' | undefined;

type FreonTypes =
  | 'R134A'
  | 'R410A'
  | 'R407C'
  | 'R32'
  | 'R404A'
  | 'R22'
  | 'R290'
  | undefined;

type Refrigerant = 'Woda' | 'Roztwór glikolu' | undefined;

type SwitchField = 'Wyłączony' | 'Załączony' | undefined;

type WaterField = 'Wejście wody' | 'Wyjście wody' | undefined;

type ControlMethod = 'Bezpośrednio' | 'Pośrednio' | undefined;

type NecessaryField = 'Konieczna' | 'Niekonieczna' | undefined;

type DeviceType =
  | 'Sprężarka'
  | 'Wentylator'
  | 'Pompa WL'
  | 'Silnik'
  | 'Falownik'
  | undefined;

export interface PowerConsumption {
  deviceType: DeviceType;
  amperage_1: number;
  amperage_2: number;
  amperage_3: number;
  interphaseOk: string;
  interphase?: number;
  editKey: string;
}

export interface Circuit {
  dischargePressure: number;
  condensationTemperature: number;
  subcooling: number;
  airTemperature: number;
  suctionPressure: number;
  suctionTemperature: number;
  overHeat: number;
  inTemperature: number;
  outTemperature: number;
  inWaterPressure: number;
  outWaterPressure: number;
  editKey: string;
}

export interface ChillerDTO {
  firma: string;
  location: string;
  type: string;
  serialNumber: string;
  pollution: AirPollution;
  termalInsulation: TermalInsulation;
  termalAndPressureControl: IsValid;
  supplyVoltage: number;
  supplyPhase: number;
  measuredVoltage_1: number;
  measuredVoltage_2: number;
  measuredVoltage_3: number;
  interphaseOK: string;
  interphase?: number;
  freonType: FreonTypes;
  freonAmount: number;
  refrigerationCircuits: number[] | undefined;
  driverType: string;
  refrigerant: Refrigerant;
  airTemperature: number;
  oilLevel: IsValid;
  indicatorColor: IsValid;
  tightSystem: IsValid;
  currentConsumption: IsValid;
  fansConsumption: IsValid;
  highPressure: SwitchField;
  lowPressure: SwitchField;
  antiFrezzeTermostat: SwitchField;
  settingsTemperature: number[] | undefined;
  controlledParameter: WaterField;
  controlMethod: ControlMethod;
  leakGasTest: NecessaryField;
  gasAdded: number;
  gasRegain: number;
  description?: string;
  circuits: Circuit[] | undefined;
  powerConsumptions: PowerConsumption[] | undefined;
}
export const chillerDefaultValues: ChillerDTO = {
  firma: '',
  location: '',
  type: '',
  serialNumber: '',
  pollution: undefined,
  termalInsulation: undefined,
  termalAndPressureControl: undefined,
  supplyVoltage: 0,
  supplyPhase: 0,
  measuredVoltage_1: 0,
  measuredVoltage_2: 0,
  measuredVoltage_3: 0,
  interphaseOK: '',
  interphase: undefined,
  freonType: undefined,
  freonAmount: 0,
  refrigerationCircuits: undefined,
  driverType: '',
  refrigerant: undefined,
  airTemperature: 0,
  oilLevel: undefined,
  indicatorColor: undefined,
  tightSystem: undefined,
  currentConsumption: undefined,
  fansConsumption: undefined,
  highPressure: undefined,
  lowPressure: undefined,
  antiFrezzeTermostat: undefined,
  settingsTemperature: undefined,
  controlledParameter: undefined,
  controlMethod: undefined,
  leakGasTest: undefined,
  gasAdded: 0,
  gasRegain: 0,
  description: undefined,
  circuits: undefined,
  powerConsumptions: undefined,
};
