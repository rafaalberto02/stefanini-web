import { PersonDto } from "../dtos/personDto";
import { BaseResponse } from "./baseResponse";

export interface PersonResponse extends BaseResponse {
  personObjects: PersonDto[];
}
