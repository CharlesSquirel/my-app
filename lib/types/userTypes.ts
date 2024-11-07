export interface UserDTO {
  firstName: string;
  lastName: string;
  userSignature: string;
  email: string;
}

export const defaultUserValues: UserDTO = {
  firstName: '',
  lastName: '',
  userSignature: '',
  email: '',
};
