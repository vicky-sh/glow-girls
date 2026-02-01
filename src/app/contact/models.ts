export interface ContactModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface ContactDto extends Omit<ContactModel, 'firstName' | 'lastName' | 'email'> {
  senderName: string;
  senderEmail: string;
}

export interface ResponseDto {
  succeeded: boolean;
  errors: Error[];
}

export interface Error {
  code: number;
  message: string;
}
