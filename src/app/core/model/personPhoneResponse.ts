import { BaseResponse } from "./baseResponse";
import { PersonPhoneDto } from "./personPhoneDto";

export interface PersonPhoneResponse extends BaseResponse {
  personPhoneObjects: PersonPhoneDto[];
}
