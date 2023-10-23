import { faker } from "@faker-js/faker";
import CommonData from "../../CommonData";
import { UserModel, UserRole, UserStatus } from "../UserModel";

export class UserEnabledAdmin implements UserModel {
    employeeName = 'EnabledAdmin';
    userName = faker.person.fullName();
    role = UserRole.admin;
    status = UserStatus.enabled;
    password = CommonData.uniwersalPassword;
}