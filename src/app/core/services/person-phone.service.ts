import { PersonPhoneResponse } from "./../model/personPhoneResponse";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PersonPhoneRequest } from "../model/personPhoneRequest";

@Injectable({
  providedIn: "root",
})
export class PersonPhoneService {
  private apiUrl = `${environment.api}PersonPhone`;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<PersonPhoneResponse> {
    return this.httpClient.get<PersonPhoneResponse>(this.apiUrl);
  }

  post(request: PersonPhoneRequest): Observable<PersonPhoneResponse> {
    return this.httpClient.post<PersonPhoneResponse>(this.apiUrl, request);
  }

  put(request: PersonPhoneRequest): Observable<PersonPhoneResponse> {
    return this.httpClient.put<PersonPhoneResponse>(this.apiUrl, request);
  }

  delete(request: PersonPhoneRequest): Observable<PersonPhoneResponse> {
    return this.httpClient.request<PersonPhoneResponse>("DELETE", this.apiUrl, {
      body: request,
    });
  }
}
