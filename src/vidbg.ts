import "./vidbg.css";

import convert from "hex-rgb";
import { defaultOptions } from "./definitions/defaultVidbgOptions";
import { defaultAttributes } from "./definitions/defaultVidbgAttributes";
import { VidbgAttributes, VidbgOptions } from "./types/types";
import InvalidSelectorError from "./errors/InvalidSelectorError";
import VideoSourceNotSpecifiedError from "./errors/VideoSourceNotSpecifiedError";

/**
 * The vidbg class. This will be the reference for the plugin.
 * For example: var videoBackground = new vidbg(selector, options, attributes)
 */
class vidbg {
  el: HTMLElement;
  options: VidbgOptions;
  attributes: VidbgAttributes;
  containerEl!: HTMLElement;
  overlayEl!: HTMLElement;
  videoEl!: HTMLVideoElement;

  /**
   * Setup our default options and config for our plugin.
   *
   * @param {String} selector The selector for the video background
   * @param {object} options The options for the plugin
   * @param {object} attributes The attributes for the HTML5 <video> attribute
   */
  constructor(
    selector: string,
    options?: VidbgOptions,
    attributes?: VidbgAttributes
  ) {
    if (!selector) {
      throw new InvalidSelectorError("A selector is required!");
    }

    const _el = document.querySelector(selector);

    if (!_el) {
      throw new InvalidSelectorError(
        `The selector you specified, "${selector}", does not exist!`
      );
    }

    this.el = _el as HTMLElement;

    // Use the spread operator to merge our default options with user supplied options.
    this.options = { ...defaultOptions, ...options };

    /**
     * Autoplay attribute has been removed from the default attributes as it was conflicting
     * with playback in Safari with the play promise. Now, the play promise handles the
     * autoplay.
     */

    // Use the spread operator to merge our default attributes with user supplied options.
    this.attributes = { ...defaultAttributes, ...attributes };

    if (!this.options.mp4 && !this.options.webm) {
      throw new VideoSourceNotSpecifiedError(
        `Please provide an mp4, webm, or both`
      );
    }

    this.init();
  }

  /**
   * init the video background to the DOM.
   */
  private init() {
    this.el.style.position = "relative";
    this.el.style.zIndex = "1";

    this.createContainer();
    this.createVideo();
    this.createOverlay();

    window.addEventListener("resize", this.resize);
  }

  /**
   * Create the container element and append it to the selector.
   */
  private createContainer = () => {
    this.containerEl = document.createElement("div");
    this.containerEl.className = "vidbg-container";

    this.createPoster();

    this.el.appendChild(this.containerEl);
  };

  /**
   * Create the overlay element and append it to the container.
   */
  private createOverlay = () => {
    this.overlayEl = document.createElement("div");
    this.overlayEl.className = "vidbg-overlay";

    if (this.options.overlay) {
      const [r, g, b] = convert(this.options.overlayColor, { format: "array" });
      const rgba = [r, g, b, this.options.overlayAlpha];

      this.overlayEl.style.backgroundColor = `rgba(${rgba.join(", ")})`;
    }

    this.containerEl.appendChild(this.overlayEl);
  };

  /**
   * If the poster option exists, add it to the container's backgroundImage style attribute.
   */
  private createPoster = () => {
    if (this.options.poster) {
      this.containerEl.style.backgroundImage = `url(${this.options.poster})`;
    }
  };

  /**
   * Create the HTML5 video element and append it to the container.
   */
  private createVideo = () => {
    this.videoEl = document.createElement("video");

    this.videoEl.addEventListener("playing", this.onPlayEvent);

    /**
     * Set the attributes for the <video> element.
     * It is important that these are added to the video element before the
     * play promise since autoplay primarily only works when the video is
     * muted.
     */
    for (const key in this.attributes) {
      // @ts-ignore
      this.videoEl[key] = this.attributes[key];
    }

    if (this.options.mp4) {
      const mp4Source = document.createElement("source");
      mp4Source.src = this.options.mp4;
      mp4Source.type = "video/mp4";

      this.videoEl.appendChild(mp4Source);
    }

    if (this.options.webm) {
      const webmSource = document.createElement("source");
      webmSource.src = this.options.webm;
      webmSource.type = "video/webm";

      this.videoEl.appendChild(webmSource);
    }

    this.containerEl.appendChild(this.videoEl);

    /**
     * Create a play promise for browsers that support it. If a browser
     * supports promises, we can determine if a video can be played. If
     * it can not, we will console an error message and remove the video
     * instance.
     *
     * If the browser does not support promises, the initialization of the
     * playPromise variable will call play() regardless, and the browser
     * will try to play the video.
     */
    let playPromise = this.videoEl.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error(err);
        console.error(
          "Autoplay is not supported. The video element will be removed."
        );

        // Remove the video if autoplay is not supported
        this.removeVideo();
      });
    }
  };

  /**
   * The play event once the video starts playing.
   *
   * @param {Object} event The play event
   */
  private onPlayEvent = () => {
    // Resize the video on play
    this.resize();

    // Show the video
    this.videoEl.style.opacity = "1";
  };

  /**
   * Removes the HTML5 <video> element
   */
  removeVideo = () => {
    this.videoEl.remove();
  };

  /**
   * Get the HTML <video> element
   */
  getVideo = () => {
    return this.videoEl;
  };

  isVideoPlaying = () => {
    return !this.videoEl.paused;
  };

  playVideo = () => {
    return this.videoEl.play();
  };

  pauseVideo = () => {
    return this.videoEl.pause();
  };

  /**
   * Destroy the vidbg instance
   */
  destroy = () => {
    this.containerEl.remove();
  };

  /**
   * Our resize method on initial load and browser resize.
   */
  resize = () => {
    // Get the width and height of the container we created
    const containerWidth = this.containerEl.offsetWidth;
    const containerHeight = this.containerEl.offsetHeight;

    // Get the width and height of the HTML5 <video> element we created
    const videoWidth = this.videoEl.videoWidth;
    const videoHeight = this.videoEl.videoHeight;

    /**
     * Depending on the width and height of the browser, we will either set the video width
     * to the container's width and the height to auto, or the width to auto and the height
     * to the container's height.
     */
    if (containerWidth / videoWidth > containerHeight / videoHeight) {
      this.videoEl.style.width = `${containerWidth}px`;
      this.videoEl.style.height = "auto";
    } else {
      this.videoEl.style.width = "auto";
      this.videoEl.style.height = `${containerHeight}px`;
    }
  };
}

export default vidbg;
