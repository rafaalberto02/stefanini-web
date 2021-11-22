import { PersonPhoneDto } from "../dtos/personPhoneDto";
import { BaseResponse } from "./baseResponse";

export interface PersonPhoneResponse extends BaseResponse {
  personPhoneObjects: PersonPhoneDto[];
}
