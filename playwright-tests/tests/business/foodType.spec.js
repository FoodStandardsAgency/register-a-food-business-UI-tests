import { test, expect } from "@playwright/test";
import { FoodType } from "../../page-objects/FoodType.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Food Type Page @food_type", () => {
  let foodType;

  test.beforeEach(async ({ page }) => {
    foodType = new FoodType(page);
  });

  test("food type page check one box @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue(); // Check feature logic: click button initially
    await foodType.checkRawMeat(); // firstCheckbox
    await expect(page.locator(foodType.selectors.firstCheckbox)).toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food_type page check all boxes @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.checkRawMeat(); // firstCheckbox
    await expect(page.locator(foodType.selectors.firstCheckbox)).toBeChecked();

    await foodType.checkReadyToEat(); // secondCheckbox
    await expect(page.locator(foodType.selectors.secondCheckbox)).toBeChecked();

    await foodType.checkCookedOrReheated(); // thirdCheckbox
    await expect(page.locator(foodType.selectors.thirdCheckbox)).toBeChecked();

    await foodType.checkImported(); // fourthCheckbox
    await expect(page.locator(foodType.selectors.fourthCheckbox)).toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food type page check none box @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue();
    await foodType.checkNone(); // fifthCheckbox
    await expect(page.locator(foodType.selectors.fifthCheckbox)).toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food type page check dont know box @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue();
    await foodType.checkDontKnow(); // sixthCheckbox
    await expect(page.locator(foodType.selectors.sixthCheckbox)).toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food type page check first checkbox is unchecked after dont know checkbox is checked @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue();
    await foodType.checkRawMeat(); // firstCheckbox
    await expect(page.locator(foodType.selectors.firstCheckbox)).toBeChecked();

    await foodType.checkDontKnow(); // sixthCheckbox
    await expect(page.locator(foodType.selectors.sixthCheckbox)).toBeChecked();
    await expect(page.locator(foodType.selectors.firstCheckbox)).not.toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food type page check first checkbox is unchecked after none checkbox is checked @food_type_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue();
    await foodType.checkRawMeat();
    await expect(page.locator(foodType.selectors.firstCheckbox)).toBeChecked();

    await foodType.checkNone(); // fifthCheckbox
    await expect(page.locator(foodType.selectors.fifthCheckbox)).toBeChecked();
    await expect(page.locator(foodType.selectors.firstCheckbox)).not.toBeChecked();

    await foodType.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*food-type/);
  });

  test("food_type page check invalid selection @food_type_page_invalid", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/food-type");

    await foodType.clickContinue();
    await expect(page.locator(foodType.selectors.error)).toContainText(
      "Please select all options that apply to your business"
    );
  });
});
