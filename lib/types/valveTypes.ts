// interface ValvesInfoBlock {
//   valveLocation: string;
//   valveType: string;
//   valveSerialNumber: string;
//   pressureOpen: number;
//   pressureClose: number;
//   pressureSetting: number;
//   description?: string;
// }

import { ValveDTO } from '../zod/zodSchema';

// export interface ValveDTO {
//   firma: string;
//   location: string;
//   type: string;
//   serialNumber: string;
//   userId: string;
//   userSignature: string;
//   firstName: string;
//   lastName: string;
//   infoBlocks: ValvesInfoBlock[];
//   description?: string;
// }

export const valveDefaultValues: ValveDTO = {
  firma: '',
  location: '',
  type: '',
  serialNumber: '',
  userId: 'asd',
  userSignature: 'FGASD/ASD',
  firstName: 'Karol',
  lastName: 'Wiewiórka',
  infoBlocks: [],
};