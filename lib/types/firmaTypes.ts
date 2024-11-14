export interface LocationDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: string;
  localNumber?: string | null;
  postCode: string;
  city: string;
  tel?: string | null;
  contactEmail?: string | null;
}

export interface FirmaDTO {
  fullName: string;
  shortName: string;
  street: string;
  houseNumber: string;
  localNumber?: string | null;
  postCode: string;
  city: string;
  tel?: string | null;
  contactEmail?: string | null;
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
