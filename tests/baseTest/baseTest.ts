import path from "path";

const globalVideoBackgroundInstanceName = "videoBackground";
const videoBackgroundTestSelector = ".instance";

test("it autoplays the video", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const isVideoBackgroundAutoplaying = await page.evaluate(
    (globalVideoBackgroundInstanceName) => {
      return (window as any)[
        globalVideoBackgroundInstanceName
      ].isVideoPlaying();
    },
    globalVideoBackgroundInstanceName
  );

  expect(isVideoBackgroundAutoplaying).toBe(true);
});

test("it renders the <video> element", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasVideo = await page.evaluate((videoBackgroundTestSelector) => {
    if (document.querySelector(`${videoBackgroundTestSelector} video`)) {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasVideo).toBe(true);
});

test("it renders the mp4 video source", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasMp4 = await page.evaluate((videoBackgroundTestSelector) => {
    if (
      document.querySelector(
        `${videoBackgroundTestSelector} > .vidbg-container video source[type="video/mp4"]`
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasMp4).toBe(true);
});

test("it renders the webm video source", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasMp4 = await page.evaluate((videoBackgroundTestSelector) => {
    if (
      document.querySelector(
        `${videoBackgroundTestSelector} > .vidbg-container video source[type="video/webm"]`
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasMp4).toBe(true);
});

test("it renders the container element", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasContainer = await page.evaluate((videoBackgroundTestSelector) => {
    if (
      document.querySelector(
        `${videoBackgroundTestSelector} > .vidbg-container`
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasContainer).toBe(true);
});

test("it renders a transparent overlay without overlay specified", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasOverlay = await page.evaluate((videoBackgroundTestSelector) => {
    if (
      document.querySelector(`${videoBackgroundTestSelector} .vidbg-overlay`)
    ) {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasOverlay).toBe(true);
});

test("it renders the video with controls off", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasControls = await page.evaluate(
    (globalVideoBackgroundInstanceName) => {
      const videoEl = (window as any)[
        globalVideoBackgroundInstanceName
      ].getVideo();

      return videoEl.controls;
    },
    globalVideoBackgroundInstanceName
  );

  expect(hasControls).toBe(false);
});

test("it renders the video with loop on", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasLoop = await page.evaluate((globalVideoBackgroundInstanceName) => {
    const videoEl = (window as any)[
      globalVideoBackgroundInstanceName
    ].getVideo();

    return videoEl.loop;
  }, globalVideoBackgroundInstanceName);

  expect(hasLoop).toBe(true);
});

test("it renders the video with playsInline", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasPlaysInline = await page.evaluate(
    (globalVideoBackgroundInstanceName) => {
      const videoEl = (window as any)[
        globalVideoBackgroundInstanceName
      ].getVideo();

      return videoEl.playsInline;
    },
    globalVideoBackgroundInstanceName
  );

  expect(hasPlaysInline).toBe(true);
});

test("it renders the video muted", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const isVideoMuted = await page.evaluate(
    (globalVideoBackgroundInstanceName) => {
      const videoEl = (window as any)[
        globalVideoBackgroundInstanceName
      ].getVideo();

      return videoEl.muted;
    },
    globalVideoBackgroundInstanceName
  );

  expect(isVideoMuted).toBe(true);
});

test("it should render the poster", async () => {
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, "index.html")}`);

  const hasPoster = await page.evaluate((videoBackgroundTestSelector) => {
    const vidbgContainer = document.querySelector(
      `${videoBackgroundTestSelector} > .vidbg-container`
    ) as HTMLElement;

    if (!vidbgContainer) {
      return false;
    }

    if (vidbgContainer.style.backgroundImage === 'url("../setup/poster.jpg")') {
      return true;
    } else {
      return false;
    }
  }, videoBackgroundTestSelector);

  expect(hasPoster).toBe(true);
});
