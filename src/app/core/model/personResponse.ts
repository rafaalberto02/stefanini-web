import { BaseResponse } from "./baseResponse";
import { PersonDto } from "./personDto";

export interface PersonResponse extends BaseResponse {
  personObjects: PersonDto[];
}
