export interface LocationDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: string;
  localNumber?: string;
  postCode: string;
  city: string;
  tel?: string;
  contactEmail?: string;
}

export interface FirmaDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: string;
  localNumber?: string;
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
  houseNumber: '',
  localNumber: '',
  postCode: '',
  city: '',
  tel: '',
  contactEmail: '',
  locations: [],
};
