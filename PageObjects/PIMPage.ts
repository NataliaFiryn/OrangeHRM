import { expect, Locator, Page} from '@playwright/test';
import { UserModel } from '../TestData/User/UserModel';
import { th } from '@faker-js/faker';

export class AdminPage {
    #page: Page;
    #addBtn: Locator;
    #searchBtn: Locator;
    

    #searchField: {
        employeeName: Locator;
        employeeId: Locator;
        supervisorName: Locator;
    }

    #addEmployeeField: {
        firstName: Locator;
        middleName: Locator;
        lastName: Locator;
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

      this.#searchField = {
        employeeName: this.#page.locator('.oxd-form input[placeholder="Type for hints..."]').nth(0),
        employeeId: this.#page.locator('.oxd-input-group.oxd-input-field-bottom-space input.oxd-input--active'),
        supervisorName: this.#page.locator('.oxd-form input[placeholder="Type for hints..."]').nth(1),
      }

      this.#addEmployeeField = {
        firstName: this.#page.locator('[name="firstName"]'),
        middleName: this.#page.locator('[name="middleName"]'),
        lastName: this.#page.locator('[name="lastName"]'),
        employeeImage: this.#page.locator('.orangehrm-employee-image button'),
        createLogin: this.#page.locator('[[type="checkbox"]'),
        enabledButton: this.#page.getByText('Enabled'),
        disabledButton: this.#page.getByText('Disabled'),
        userName: this.#page.locator('.oxd-input.oxd-input--active[autocomplete="off"]').nth(0),
        password: this.#page.locator('[type="password"]').nth(0),
        confirmPassword: this.#page.locator('[type="password"]').nth(1)
      }
      
      this.#endpoint = '/web/index.php/api/v2/admin/'
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