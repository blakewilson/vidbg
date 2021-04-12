import path from "path";

test("it renders both instances playing", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const isInstance1Playing = await page.evaluate(() => {
    return (window as any)["videoBackground1"].isVideoPlaying();
  });

  const isInstance2Playing = await page.evaluate(() => {
    return (window as any)["videoBackground2"].isVideoPlaying();
  });

  expect(isInstance1Playing).toBe(true);
  expect(isInstance2Playing).toBe(true);
});
