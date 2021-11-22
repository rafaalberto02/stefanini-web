import { PhoneNumberTypeDto } from "../dtos/phoneNumberTypeDto";
import { BaseResponse } from "./baseResponse";

export interface PhoneNumberTypeListResponse extends BaseResponse {
  phoneNumberObjects: PhoneNumberTypeDto[];
}
