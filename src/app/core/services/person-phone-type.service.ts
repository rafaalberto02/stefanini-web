import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PhoneNumberTypeListResponse } from "../model/phoneNumberTypeListResponse";

@Injectable({
  providedIn: "root",
})
export class PersonPhoneTypeService {
  private apiUrl = `${environment.api}PersonPhoneType`;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<PhoneNumberTypeListResponse> {
    return this.httpClient.get<PhoneNumberTypeListResponse>(this.apiUrl);
  }
}
