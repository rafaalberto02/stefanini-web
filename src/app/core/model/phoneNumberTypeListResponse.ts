import { BaseResponse } from "./baseResponse";
import { PhoneNumberTypeDto } from "./phoneNumberTypeDto";

export interface PhoneNumberTypeListResponse extends BaseResponse {
  phoneNumberObjects: PhoneNumberTypeDto[];
}
