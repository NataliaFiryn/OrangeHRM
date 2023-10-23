import { expect, Locator, Page, request } from '@playwright/test';

export class LoginPage {
    #page: Page;
    #username: Locator;
    #password: Locator;
    #loginBtn: Locator;

    #endpoint: {
        dashboard: string
    }
    
  
    constructor(page: Page) {
      this.#page = page;
      this.#username = page.locator('[name="username"]');
      this.#password = page.locator('[name="password"]');
      this.#loginBtn = page.locator('[type="submit"]')

      this.#endpoint = {
        dashboard: '/web/index.php/dashboard/index' ,
      }
      
    }
  
    async login() {
      await this.#username.fill('Admin');
      await this.#password.fill('admin123');
      await Promise.all([
        this.#page.waitForResponse(this.#endpoint.dashboard),
        this.#loginBtn.click()
      ]);

    }

}