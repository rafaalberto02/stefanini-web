import { PersonPhoneResponse } from "./core/model/personPhoneResponse";
import { PhoneNumberTypeListResponse } from "./core/model/phoneNumberTypeListResponse";
import { PersonDto } from "./core/model/personDto";
import { PersonPhoneService } from "./core/services/person-phone.service";
import { Component, OnInit } from "@angular/core";
import { PersonService } from "./core/services/person.service";
import { PersonResponse } from "./core/model/personResponse";
import { PersonPhoneTypeService } from "./core/services/person-phone-type.service";
import { PhoneNumberTypeDto } from "./core/model/phoneNumberTypeDto";
import { PersonPhoneRequest } from "./core/model/personPhoneRequest";

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

  changeSelectedUser(id: Number): void {
    this.selectedPerson = this.persons.filter(
      (person) => person.businessEntityID == id
    )[0];
    this.phoneNumbers = [];
    this.phoneNumberTypes.forEach((type, i) => {
      this.selectedPerson.phones.forEach(
        (phone) =>
          (this.phoneNumbers[i] =
            type.phoneNumberTypeID == phone.phoneNumberTypeID
              ? phone.phoneNumber
              : this.phoneNumbers[i])
      );
    });
  }

  deletePhoneNumber(businessEntityID, phoneNumberTypeID): void {
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
    businessEntityID,
    indexOfPhoneNumber,
    phoneNumberTypeID
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
  title = "project-v1-web";
}
