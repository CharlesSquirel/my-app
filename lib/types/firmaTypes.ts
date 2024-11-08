export interface LocationDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: number;
  localNumber?: number;
  postCode: string;
  city: string;
  tel?: string;
  contactEmail?: string;
}

export interface FirmaDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: number;
  localNumber?: number;
  postCode: string;
  city: string;
  tel?: string;
  contactEmail?: string;
  locations: LocationDTO[];
}

export const firmaDefaultValues: FirmaDTO = {
  fullName: '',
  shortName: '',
  street: '',
  houseNumber: 0,
  localNumber: 0,
  postCode: '',
  city: '',
  tel: '',
  contactEmail: '',
  locations: [],
};
