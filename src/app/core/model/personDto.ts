import { PersonPhoneDto } from "./personPhoneDto";

export interface PersonDto {
  businessEntityID: number;
  name: string;
  phones: PersonPhoneDto[];
}
