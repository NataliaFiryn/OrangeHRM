import { UserModel } from "./UserModel";
import { UserEnabledAdmin } from "./UserTestScenarios/UserEnabledAdmin";

export class UserScenario {
    [key:string]: UserModel;

    EnabledAdmin = new UserEnabledAdmin();



}