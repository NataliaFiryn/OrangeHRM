import { expect, Locator, Page} from '@playwright/test';
import { UserModel } from '../TestData/User/UserModel';
import { th } from '@faker-js/faker';
import ExistingLoginData from '../TestData/LoginData';
import LoginData from '../TestData/LoginData';

export class PIMPage {
    #page: Page;
    #addBtn: Locator;
    #searchBtn: Locator;
    #saveBtn: Locator;
    

    #searchField: {
        employeeName: Locator;
        employeeId: Locator;
        supervisorName: Locator;
    }

    #addEmployeeField: {
        firstName: Locator;
        middleName: Locator;
        lastName: Locator;
        employeeID: Locator;
        employeeImage: Locator;
        createLogin: Locator;
        enabledButton: Locator;
        disabledButton: Locator;
        userName: Locator;
        password: Locator;
        confirmPassword: Locator;
      }
    #endpoint: string;
    
  
    constructor(page: Page) {
      this.#page = page;
      this.#addBtn = this.#page.locator('.oxd-button[type="button"]');
      this.#searchBtn = this.#page.locator('[type="submit"]');
      this.#saveBtn = this.#page.locator('[type="submit"]');

      this.#searchField = {
        employeeName: this.#page.locator('.oxd-form input[placeholder="Type for hints..."]').nth(0),
        employeeId: this.#page.locator('.oxd-input-group.oxd-input-field-bottom-space input.oxd-input--active'),
        supervisorName: this.#page.locator('.oxd-form input[placeholder="Type for hints..."]').nth(1),
      }

      this.#addEmployeeField = {
        firstName: this.#page.locator('[name="firstName"]'),
        middleName: this.#page.locator('[name="middleName"]'),
        lastName: this.#page.locator('[name="lastName"]'),
        employeeID: this.#page.locator('.orangehrm-employee-form .oxd-grid-2 .oxd-input'),
        employeeImage: this.#page.locator('.orangehrm-employee-image button'),
        createLogin: this.#page.locator('[[type="checkbox"]'),
        enabledButton: this.#page.getByText('Enabled'),
        disabledButton: this.#page.getByText('Disabled'),
        userName: this.#page.locator('.oxd-input.oxd-input--active[autocomplete="off"]').nth(0),
        password: this.#page.locator('[type="password"]').nth(0),
        confirmPassword: this.#page.locator('[type="password"]').nth(1)
      }
      
      this.#endpoint = '/web/index.php/api/v2/pim/employees'
    }

    async addEmployee (user: UserModel){
        await Promise.all([
          this.#page.waitForResponse(this.#endpoint),
          this.#addBtn.click()
        ]);
        await this.#addEmployeeField.firstName.fill(user.firstName);
        await this.#addEmployeeField.middleName.fill(user.middleName);
        await this.#addEmployeeField.lastName.fill(user.lastName);
        const employeeID = await (this.#addEmployeeField.employeeID).inputValue();
        const newUser = {id: employeeID, userName: user.firstName+'.'+user.lastName}
        ExistingLoginData.push(newUser)
        await Promise.all([
          this.#page.waitForResponse(this.#endpoint),
          this.#saveBtn.click()
        ]);
    }
  
    async searchByField(fieldName:FieldName, value: string) {
        await this.#searchField[fieldName].click();
      if(fieldName === 'userName' || fieldName === 'employeeName' ){
        await this.#searchField[fieldName].fill(value);
      } else {
        await this.#page.getByRole('option', { name: value }).click()
      }
        await this.#searchBtn.click();
    }

}
type FieldName = 'userName' | 'userRole' | 'employeeName' | 'userStatus'