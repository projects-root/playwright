import { Page } from "playwright"
import { expect } from "@playwright/test";

export const locators = {
  cookieBar: (page: Page) => page.getByRole('dialog', { name: 'cookie bar' }).locator('div').first(),
  acceptBtn: (page: Page) => page.getByRole('button', { name: 'Aceptar' }),
  privacyPolicy: (page: Page) => page.getByRole('link', { name: 'Privacy Policy' }),
  faq: (page: Page) => page.getByRole('link', { name: 'Preguntas Frecuentes' }),
  refunds: (page: Page) => page.getByRole('link', { name: 'Devoluciones' }),
  aboutUs: (page: Page) => page.getByRole('link', { name: 'Sobre Nosotros' }),
  stores: (page: Page) => page.getByRole('link', { name: 'Tiendas' }),
  followUs: (page: Page) => page.getByText('FOLLOW US'),
  hashtag: (page: Page) => page.getByRole('heading', { name: '#JIMMYLION' }),
  title1: (page: Page) => page.getByRole('heading', { name: 'BACK TO SCHOOL' }),
  title2: (page: Page) => page.getByRole('heading', { name: 'CAMISETAS' }),
  title3: (page: Page) => page.getByRole('heading', { name: '#DAMETOPVENTAS' }),
  title4: (page: Page) => page.getByRole('heading', { name: 'LOONEY TUNES X JIMMY LION' }),
  logo: (page: Page) => page.getByRole('link', { name: 'Jimmy Lion', exact: true }),
  menu1: (page: Page) => page.getByRole('button', { name: 'Hombre' }),
  menu2: (page: Page) => page.getByRole('button', { name: 'Mujer' }),
  menu4: (page: Page) => page.getByRole('link', { name: 'Packs', exact: true }),
  menu5: (page: Page) => page.getByRole('link', { name: 'Collabs', exact: true }),
  ayuda: (page: Page) => page.getByRole('link', { name: 'Ayuda y FAQs' }),
  pdpContent: (page: Page) => page.locator('#MainContent'),
  firstCardInPLP: (page: Page) => page.locator('.custom_feature_items_list_link').first(),
  firstCardInPDP: (page: Page) => page.locator('.tw-w-full.md\\:tw-block').first(),

}

export async function homepageLanding(page: Page) {
  console.log("Step 1: Home page check....")
  await page.goto("https://es.jimmylion.com/", { waitUntil: "load" })
  await expect(page.url()).toContain("jimmylion")
  await expect(locators.cookieBar(page), "Cookie bar is not visible").toBeVisible();
  await expect(locators.acceptBtn(page), "Accept button is not visible").toBeVisible();
  await locators.acceptBtn(page).click();
  await footerCheck(page);
  await expect(locators.hashtag(page), "Hashtag is not visible, check home page").toBeVisible();
  await locators.title4(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title3(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title2(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title1(page).scrollIntoViewIfNeeded({timeout: 3000});
  await menuCheck(page);
  await page.screenshot({ path: "homepage_screenshot.png", fullPage: true })
  console.log("Step 1: Home page check....complete")
}

export async function menuCheck(page: Page) {
  await Promise.all([
    await page.keyboard.press("Home"),
    expect(locators.logo(page)).toBeVisible(),
    expect(locators.menu1(page)).toBeVisible(),
    expect(locators.menu2(page)).toBeVisible(),
    expect(locators.menu4(page)).toBeVisible(),
    expect(locators.menu5(page)).toBeVisible(),
    expect(locators.ayuda(page)).toBeVisible()
  ]);
}

export async function footerCheck(page: Page) {
  await locators.privacyPolicy(page).scrollIntoViewIfNeeded({timeout: 5000});
  await Promise.all([
    expect(locators.faq(page)).toBeVisible(),
    expect(locators.refunds(page)).toBeVisible(),
    expect(locators.aboutUs(page)).toBeVisible(),
    expect(locators.stores(page)).toBeVisible(),
    expect(locators.followUs(page)).toBeVisible()
  ]);
}
  
export async function plpVerification(page: Page) {
  console.log("Step 2: PLP check....")
  await locators.menu1(page).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/hombre");
  await footerCheck(page);
  await menuCheck(page);
  await locators.menu2(page).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/mujer");
  await footerCheck(page);
  await menuCheck(page);
  await locators.menu4(page).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/packs-regalo-calcetines");
  await footerCheck(page);
  await menuCheck(page);
  console.log("Step 2: PLP check....complete")
}

export async function pdpVerification(page: Page) {
  console.log("Step 3: PDP check....")
  await locators.menu5(page).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/coleccion-calcetines-edicion-limitada");
  await footerCheck(page);
  await menuCheck(page);
  await expect(locators.pdpContent(page)).toBeVisible();
  await expect(locators.firstCardInPLP(page)).toBeVisible();
  await locators.firstCardInPLP(page).scrollIntoViewIfNeeded({timeout: 5000});
  await locators.firstCardInPLP(page).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.url()).toContain("collections");
  await expect(locators.firstCardInPDP(page)).toBeVisible();
  await page.pause();
  console.log("Step 3: PDP check....complete")
}
