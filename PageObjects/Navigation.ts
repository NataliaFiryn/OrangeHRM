import { expect, Locator, Page, request } from '@playwright/test';

export class Navigation {
    #page: Page;
    #search: Locator;
    #menuItem: {
        admin: Locator;
        pim: Locator;
        leave: Locator;
        time: Locator;
        recruitment: Locator;
        myInfo: Locator;
        performance: Locator;
        dashboard: Locator;
        directory: Locator;
        maintenance: Locator;
        claim: Locator;
    }


    #endpoint: {
        admin: string;
            pim: string;
            leave: string;
            time: string;
            recruitment: string;
            myInfo: string;
            performance: string;
            dashboard: string;
            directory: string;
            maintenance: string;
            claim: string;
    }

    constructor(page: Page) {
        this.#page = page;
        this.#search = this.#page.locator('[placeholder="Search"]')
        this.#menuItem = {
            admin: this.#page.locator('[href*="/admin/viewAdminModule"]'),
            pim: this.#page.locator('[href*="/pim/viewPimModule"]'),
            leave: this.#page.locator('[href*="/leave/viewLeaveModule"]'),
            time: this.#page.locator('[href*="/time/viewTimeModule"]'),
            recruitment: this.#page.locator('[href*="/recruitment/viewRecruitmentModule"]'),
            myInfo: this.#page.locator('[href*="/pim/viewMyDetails"]'),
            performance: this.#page.locator('[href*="/performance/viewPerformanceModule"]'),
            dashboard: this.#page.locator('[href*="/dashboard/index"]'),
            directory: this.#page.locator('[href*="/directory/viewDirectory"]'),
            maintenance: this.#page.locator('[href*="/maintenance/viewMaintenanceModule"]'),
            claim: this.#page.locator('href*="/claim/viewClaimModule"'),
        }
    

        this.#endpoint = {
            admin: '/web/index.php/admin/viewAdminModule',
            pim: '/web/index.php/pim/viewPimModule',
            leave: '/web/index.php/leave/viewLeaveModule',
            time: '/web/index.php/time/viewTimeModule',
            recruitment: '/web/index.php/recruitment/viewRecruitmentModule',
            myInfo: '/web/index.php/pim/viewMyDetails',
            performance: '/web/index.php/performance/viewPerformanceModule',
            dashboard: '/web/index.php/dashboard/index',
            directory: '/web/index.php/directory/viewDirectory',
            maintenance: '/web/index.php/maintenance/viewMaintenanceModule',
            claim: '/web/index.php/claim/viewClaimModule'
        }

    }

    async navigateToPage(page:PageNames) {
        await Promise.all([
            this.#page.waitForResponse(this.#endpoint[page]),
            this.#menuItem[page].click()
          ]);
    }

    async searchNavigationToPage(page:PageNames){
        await this.#search.click();
        await this.#search.fill(page);
        await expect (this.#menuItem[page]).toBeVisible();
        await Promise.all([
            this.#page.waitForResponse(this.#endpoint[page]),
            this.#menuItem[page].click()
          ]);
    }
}

type PageNames = 'admin' | 'pim' | 'leave' | 'time' | 'recruitment' | 'myInfo' | 'performance' | 'dashboard' | 'directory' | 'maintenance' | 'claim'