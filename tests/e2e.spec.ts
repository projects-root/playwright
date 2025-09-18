import { test } from '@playwright/test';
import * as jimmyLion from '../pom/e2ejimmy';

test.describe('Automation E2E - Jimmy Lion', () => {
  test.setTimeout(30000);
  test.afterEach(async ({ page, }) => {
    await page.close();
  });
  test('E2E Journey Jimmy Lion', async ({ page }) => {
    await jimmyLion.homepageLanding(page);
    await jimmyLion.plpVerification(page);
    await jimmyLion.goToPDP(page);
    await jimmyLion.pdpVerification(page);
    await jimmyLion.add2Cart(page);
    await jimmyLion.cartVerification(page);
  })
})
