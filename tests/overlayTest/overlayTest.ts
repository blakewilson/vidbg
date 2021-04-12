import path from "path";

const globalVideoBackgroundInstanceName = "videoBackground";
const videoBackgroundTestSelector = ".instance";

test("it renders a white overlay with 50% opacity", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasOverlay = await page.evaluate((videoBackgroundTestSelector) => {
    const overlay = document.querySelector(
      `${videoBackgroundTestSelector} > .vidbg-container .vidbg-overlay`
    ) as HTMLElement;

    if (!overlay) {
      return false;
    }

    if (overlay.style.backgroundColor === "rgba(255, 255, 255, 0.5)") {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasOverlay).toBe(true);
});
