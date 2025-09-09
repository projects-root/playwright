import { Page } from "playwright"
import { expect } from "@playwright/test";

export const locators = {
  subscriptionEmail: (page: Page) => page.locator('#NewsletterForm__custom-popup'),
  closeSubscription: (page: Page) => page.locator('.email-popup-inner > .btn-close'),
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
  cardInPLP1: (page: Page) => page.locator('.custom_feature_items_list_link').first(),
  cardInPLP2: (page: Page) => page.getByRole('link', { name: 'In Dude We Trust - White' }),
  geoPopup: (page: Page) => page.getByText('Please, choose another shipping country available. Remember that we can only'),
  btnCloseGeoPopup: (page: Page) => page.getByRole('button', { name: 'Close' }),
  productTitle: (page: Page) => page.locator('h1.product__title-wrapper, h1[class*="product__title"]').first(),
  productPrice: (page: Page) => page.locator('.product-price-mb.price__regular').first().innerText(),
  pdpRecommendations: (page: Page) => page.locator('product-recommendations .related-products__heading'),
  slideRecommendations: (page: Page) => page.locator('.splide__track .splide__list').first(),
  loyaltyPointsTxt: (page: Page) => page.locator('#yotpo-product-points-widget div').nth(1),
  sizeBtn: (page: Page) => page.locator('.form__label').first(),
  add2CartBtn: (page: Page) => page.locator('.product-form__buttons button.product-form__submit'),
  promoBadge: (page: Page) => page.getByTestId('credit-promotion-badge'),
  productDescription1: (page: Page) => page.getByRole('heading', { name: 'DESCRIPCIÓN +' }),
  productDescription2: (page: Page) => page.getByRole('heading', { name: 'DESCRIPCIÓN -' }),
  productCare1: (page: Page) => page.getByRole('heading', { name: 'CUIDADOS +' }),
  productCare2: (page: Page) => page.getByRole('heading', { name: 'CUIDADOS -' }),
  productCompose1: (page: Page) => page.getByRole('heading', { name: 'COMPOSICIÓN +' }),
  productCompose2: (page: Page) => page.getByRole('heading', { name: 'COMPOSICIÓN -' }),
  productOpinions1: (page: Page) => page.getByRole('heading', { name: 'OPINIONES +' }),
  productOpinions2: (page: Page) => page.getByRole('heading', { name: 'OPINIONES -' }),
}


export async function closeNewsletterModal(page:Page) {
  if (await locators.subscriptionEmail(page).isVisible({ timeout: 10000 })) {
    console.log('Newsletter modal is visible');
    await locators.closeSubscription(page).click();
    await expect(locators.subscriptionEmail(page)).not.toBeVisible({ timeout: 3000 });
    console.log('Newsletter modal was closed');
  }
} 

export async function closeCookieModal(page:Page) {
  console.log('Cookie modal is visible');
  if (await locators.cookieBar(page).isVisible({ timeout: 10000 })) {
    await expect(locators.acceptBtn(page), "Accept button is not visible").toBeVisible();
    await locators.acceptBtn(page).click();
    await expect(locators.cookieBar(page)).not.toBeVisible({ timeout: 3000 });
    console.log('Cookie modal was closed');
  }
} 

export async function closeGeoPopup(page:Page) {
  if (await locators.geoPopup(page).isVisible({ timeout: 10000 })) {
    console.log('Geolocalization modal is visible');
    await locators.btnCloseGeoPopup(page).click();
    await expect(locators.geoPopup(page)).not.toBeVisible({ timeout: 3000 });
    console.log('Geolocalization modal was closed');
  }
} 

export async function menuCheck(page: Page) {
  console.log('Header elements check... started');
  await Promise.all([
    await page.keyboard.press("Home"),
    expect(locators.logo(page)).toBeVisible(),
    expect(locators.menu1(page)).toBeVisible(),
    expect(locators.menu2(page)).toBeVisible(),
    expect(locators.menu4(page)).toBeVisible(),
    expect(locators.menu5(page)).toBeVisible(),
    expect(locators.ayuda(page)).toBeVisible()
  ]);
  console.log('Header elements check... completed');
}

export async function footerCheck(page: Page) {
  console.log('Footer modal check... started');
  await locators.privacyPolicy(page).scrollIntoViewIfNeeded({timeout: 5000});
  await Promise.all([
    expect(locators.faq(page)).toBeVisible(),
    expect(locators.refunds(page)).toBeVisible(),
    expect(locators.aboutUs(page)).toBeVisible(),
    expect(locators.stores(page)).toBeVisible(),
    expect(locators.followUs(page)).toBeVisible()
  ]);
  console.log('Footer modal check... completed');
}

export async function homepageLanding(page: Page) {
  console.log("----------------------------------------------");
  console.log("Step 1: Home page check...stared")
  await page.goto("https://es.jimmylion.com/", { waitUntil: "load" })
  await expect(page.url()).toContain("jimmylion")
  await page.waitForLoadState("domcontentloaded");
  await closeGeoPopup(page);
  await closeNewsletterModal(page);
  await page.waitForLoadState("domcontentloaded");
  await closeCookieModal(page);
  await footerCheck(page);
  await expect(locators.hashtag(page), "Hashtag is not visible, check home page").toBeVisible();
  await locators.title4(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title3(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title2(page).scrollIntoViewIfNeeded({timeout: 3000});
  await locators.title1(page).scrollIntoViewIfNeeded({timeout: 3000});
  await menuCheck(page);
  await page.screenshot({ path: "step1.png", fullPage: true })
  console.log("Step 1: Home page check....complete");
  console.log("----------------------------------------------");
}

export async function plpVerification(page: Page) {
  console.log("----------------------------------------------");
  console.log("Step 2: PLP check....")
  await page.waitForLoadState("domcontentloaded");
  await closeGeoPopup(page);
  await closeNewsletterModal(page);
  await closeCookieModal(page);
  await locators.menu1(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/hombre");
  console.log('collections/hombre site loading correctly');
  await locators.menu2(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/mujer");
  console.log('collections/mujer site loading correctly');
  await locators.menu4(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/packs-regalo-calcetines");
  console.log('collection/packs-regalo-calcetines site loading correctly');
  await page.screenshot({ path: "step2.png", fullPage: true })
  console.log("Step 2: PLP check....complete");
  console.log("----------------------------------------------");
}

export async function goToPDP(page: Page) {
  console.log("----------------------------------------------");
  console.log("Step 3: Go to specific PDP check... started")
  await locators.menu5(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  await expect(page.url()).toBe("https://es.jimmylion.com/collections/coleccion-calcetines-edicion-limitada");
  await expect(locators.pdpContent(page)).toBeVisible();
  await expect(locators.cardInPLP1(page)).toBeVisible();
  await locators.cardInPLP1(page).scrollIntoViewIfNeeded({timeout: 5000});
  await locators.cardInPLP1(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  await locators.cardInPLP2(page).scrollIntoViewIfNeeded({timeout: 5000});
  await page.screenshot({ path: "step3.png", fullPage: true })
  await locators.cardInPLP2(page).click();
  await page.waitForLoadState('domcontentloaded');
  await footerCheck(page);
  await menuCheck(page);
  console.log("Step 3: Go to specific PDP check...completed")
  console.log("----------------------------------------------");
}

export async function pdpVerification(page: Page) {
  console.log("----------------------------------------------");
  console.log("Step 4: Verify PDP elements... started")
  try {
    await expect(locators.productTitle(page)).toBeVisible({ timeout: 5000 });
    const titleText = await locators.productTitle(page).textContent();
    console.log(`Product title: ${titleText?.trim()}`);
  } catch (error) {
    throw new Error(`Product title element not found or not visible: ${error}`);
  }
  try {
    const priceContainer = page.locator('.price__container');
    const firstPrice = priceContainer.locator('.price-item').first();
    const priceValue = await firstPrice.textContent();
    console.log(`Product price: ${priceValue?.trim()}`);
  } catch (error) {
    throw new Error(`Product price not found or not visible: ${error}`);
  }
  await expect(locators.loyaltyPointsTxt(page)).toBeVisible({ timeout: 5000 });
  await expect(locators.sizeBtn(page)).toBeVisible({ timeout: 5000 });
  await expect(locators.add2CartBtn(page)).toBeVisible({ timeout: 5000 });
  await expect(locators.promoBadge(page)).toBeVisible({ timeout: 5000 });
  if (await locators.productDescription1(page).isVisible({ timeout: 5000 })) {
    console.log('Product description is visible');
    await locators.productDescription1(page).click();
    await expect(locators.productDescription2(page)).toBeVisible({ timeout: 10000 });
    await locators.productDescription2(page).click();
    await expect(locators.productDescription1(page)).toBeVisible({ timeout: 5000 });
  }
  if (await locators.productCare1(page).isVisible({ timeout: 5000 })) {
    console.log('Product care is visible');
    await locators.productCare1(page).click();
    await expect(locators.productCare2(page)).toBeVisible({ timeout: 10000 });
    await locators.productCare2(page).click();
    await expect(locators.productCare1(page)).toBeVisible({ timeout: 5000 });
  }
  if (await locators.productCompose1(page).isVisible({ timeout: 5000 })) {
    console.log('Product composition is visible');
    await locators.productCompose1(page).click();
    await expect(locators.productCompose2(page)).toBeVisible({ timeout: 5000 });
    await locators.productCompose2(page).click();
    await expect(locators.productCompose1(page)).toBeVisible({ timeout: 5000 });
  }
  if (await locators.productOpinions1(page).isVisible({ timeout: 5000 })) {
    console.log('Product opinions is visible');
    await locators.productOpinions1(page).click();
    await expect(locators.productOpinions2(page)).toBeVisible({ timeout: 5000 });
    await locators.productOpinions2(page).click();
    await expect(locators.productOpinions1(page)).toBeVisible({ timeout: 5000 });
  }
  await locators.pdpRecommendations(page).scrollIntoViewIfNeeded({timeout: 5000});
  await expect(locators.slideRecommendations(page)).toBeVisible({ timeout: 5000 });
  console.log('Recommendations section is visible');
  await page.screenshot({ path: "step4.png", fullPage: true })
  console.log("Step 4: Verify PDP elements... completed")
  console.log("----------------------------------------------");
}
