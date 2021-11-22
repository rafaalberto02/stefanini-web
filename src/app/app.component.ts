import { PersonDto } from "./core/model/dtos/personDto";
import { PersonPhoneService } from "./core/services/person-phone.service";
import { Component, OnInit } from "@angular/core";
import { PersonService } from "./core/services/person.service";
import { PersonPhoneTypeService } from "./core/services/person-phone-type.service";
import { PhoneNumberTypeDto } from "./core/model/dtos/phoneNumberTypeDto";
import { PersonPhoneRequest } from "./core/model/request/personPhoneRequest";
import { PersonPhoneResponse } from "./core/model/response/personPhoneResponse";
import { PersonResponse } from "./core/model/response/personResponse";
import { PhoneNumberTypeListResponse } from "./core/model/response/phoneNumberTypeListResponse";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  phoneNumbers: string[] = [];
  selectedPerson: PersonDto;
  phoneNumberTypes: PhoneNumberTypeDto[] = [];
  persons: PersonDto[];

  constructor(
    private personPhoneService: PersonPhoneService,
    private personService: PersonService,
    private phoneNumberTypeService: PersonPhoneTypeService
  ) {}

  ngOnInit(): void {
    this.getPerson();
    this.getPhoneNumberTypes();
  }

  changeSelectedUser(id: number): void {
    this.selectedPerson = this.getPersonById(id);
    this.phoneNumbers = [];
    this.phoneNumberTypes.forEach((type, i) => {
      let number = this.getSelectedUserNumberByType(type.phoneNumberTypeID);
      this.phoneNumbers[i] = number;
    });
  }

  deletePhoneNumber(
    phoneNumberTypeID: number,
    businessEntityID: number = this.selectedPerson.businessEntityID
  ): void {
    const request = {
      businessEntityID: businessEntityID,
      phoneNumberTypeID: phoneNumberTypeID,
    } as PersonPhoneRequest;

    this.personPhoneService.delete(request).subscribe({
      next: (res: PersonPhoneResponse) => {
        this.getPerson();
        window.location.reload();
      },
      error: (error) => {
        this.getPerson();
      },
    });
  }

  updatePhoneNumber(
    indexOfPhoneNumber: number,
    phoneNumberTypeID: number,
    businessEntityID: number = this.selectedPerson.businessEntityID
  ): void {
    const request = {
      businessEntityID: businessEntityID,
      phoneNumber: this.phoneNumbers[indexOfPhoneNumber],
      phoneNumberTypeID: phoneNumberTypeID,
    } as PersonPhoneRequest;

    this.personPhoneService.post(request).subscribe({
      next: (res: PersonPhoneResponse) => {
        this.getPerson();
        window.location.reload();
      },
      error: (error) => {
        this.getPerson();
      },
    });
  }

  getPhoneNumber(index: number): string {
    return this.phoneNumbers[index];
  }

  private getPerson(): void {
    this.personService.get().subscribe({
      next: (res: PersonResponse) => {
        this.persons = res.personObjects;
      },
    });
  }

  private getPhoneNumberTypes(): void {
    this.phoneNumberTypeService.get().subscribe({
      next: (res: PhoneNumberTypeListResponse) => {
        this.phoneNumberTypes = res.phoneNumberObjects;
      },
    });
  }

  private getPersonById(id: number): PersonDto {
    return this.persons.filter((person) => person.businessEntityID == id)[0];
  }

  private getSelectedUserNumberByType(phoneNumberTypeId: number): string {
    const phone = this.selectedPerson.phones.find((phone) => {
      return phone.phoneNumberTypeID == phoneNumberTypeId;
    });

    if (phone != null) return phone.phoneNumber;

    return null;
  }
}
