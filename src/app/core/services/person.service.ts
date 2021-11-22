import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PersonResponse } from "../model/response/personResponse";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  private apiUrl = `${environment.api}Person`;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<PersonResponse> {
    return this.httpClient.get<PersonResponse>(this.apiUrl);
  }
}
