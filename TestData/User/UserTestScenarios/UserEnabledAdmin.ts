import { faker } from "@faker-js/faker";
import CommonData from "../../CommonData";
import { UserModel, UserRole, UserStatus } from "../UserModel";

export class UserEnabledAdmin implements UserModel {
    firstName = faker.person.firstName()
    middleName = faker.person.middleName()
    lastName = faker.person.lastName()
    userName = this.firstName + '.' + this.lastName
    employeeName = this.firstName + ' ' + this.middleName + ' ' + this.lastName
    role = UserRole.admin;
    status = UserStatus.enabled;
    password = CommonData.uniwersalPassword;
}