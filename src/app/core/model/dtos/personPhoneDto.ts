import { PhoneNumberTypeDto } from "./phoneNumberTypeDto";

export interface PersonPhoneDto {
  businessEntityID: number;
  phoneNumber: string;
  phoneNumberTypeID: number;
  phoneNumberType: PhoneNumberTypeDto;
}
