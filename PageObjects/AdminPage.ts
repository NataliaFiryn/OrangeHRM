import { th } from '@faker-js/faker';
import { expect, Locator, Page} from '@playwright/test';
import { UserModel } from '../TestData/User/UserModel';

export class AdminPage {
    #page: Page;
    #addBtn: Locator;
    #searchBtn: Locator;
    

    #searchField: {
        userName: Locator;
        userRole: Locator;
        employeeName: Locator;
        userStatus: Locator; 
    }

    #addUserField: {
        name: Locator;
        role: Locator;
        employeeName: Locator;
        status: Locator;
        password: Locator;
        confirmPassword: Locator;
      }
    #endpoint: string;
    
  
    constructor(page: Page) {
      this.#page = page;
      this.#addBtn = this.#page.locator('.orangehrm-header-container [type="button"]');
      this.#searchBtn = this.#page.locator('[type="submit"]');

      this.#searchField = {
        userName: this.#page.locator('.oxd-form input.oxd-input'),
        userRole: this.#page.locator('.oxd-form .oxd-input-group .oxd-select-text').nth(0),
        employeeName: this.#page.locator('.oxd-form input[placeholder="Type for hints..."]'),
        userStatus: this.#page.locator('.oxd-form .oxd-input-group .oxd-select-text').nth(1),
      }

      this.#addUserField = {
        name: this.#page.locator('.oxd-grid-item input.oxd-input').nth(0),
        role: this.#page.locator('.oxd-form .oxd-input-group .oxd-select-text').nth(0),
        employeeName:this.#page.locator('[placeholder="Type for hints..."]'),
        status: this.#page.locator('.oxd-form .oxd-input-group .oxd-select-text').nth(1),
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

    async addUser(user: UserModel){
        await this.#addBtn.click(); 
        await this.#addUserField.role.click();
        await this.#page.getByRole('option', {name: user.role}).click();
        await this.#addUserField.status.click();
        await this.#page.getByRole('option', {name: user.status}).click();
        await this.#addUserField.name.fill(user.userName);
        await expect (this.#addUserField.name).not.toBeEmpty();
        await this.#addUserField.employeeName.fill(user.employeeName);
        await expect (this.#addUserField.employeeName).not.toBeEmpty();
        await this.#addUserField.password.fill(user.password);
        await expect (this.#addUserField.password).not.toBeEmpty();
        await this.#addUserField.confirmPassword.fill(user.password);
        await expect (this.#addUserField.confirmPassword).not.toBeEmpty();
        await this.saveNewUser();
    }

    async saveNewUser(){
      await Promise.all([
        this.#page.waitForResponse(this.#endpoint),
        this.#searchBtn.click()
      ]);
    }

}
type FieldName = 'userName' | 'userRole' | 'employeeName' | 'userStatus'