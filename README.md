# vidbg.js

A minimal vanilla JavaScript video background plugin.

# Working With Wordpress

If you plan on using vidbg.js with WordPress, make your life a little bit easier and download the plugin I made on the [Wordpress Repo](https://wordpress.org/plugins/video-background/).

# Compatibility

* All modern web browsers
* IE 11+
* All mobile web browsers that support autoplaying HTML5 `<video>`

# Instructions

To get started, [download the script](https://github.com/blakewilson/vidbg/releases/latest.zip). Once you have downloaded the script, include it in your project:

```html
<!-- <head> -->
<link href="dist/vidbg.css" rel="stylesheet" type="text/css">

<!-- End of <body> -->
<script src="dist/vidbg.js"></script>
```

## Initializing the Script

The script accepts three arguments.

```js
var instance = new vidbg(selector, options, attributes)
```

The selector argument is any JavaScript selector, the [options](https://github.com/blakewilson/vidbg/tree/v2#options) are for configuring vidbg.js, and the [attributes](https://github.com/blakewilson/vidbg/tree/v2#attributes) argument modifies the actual `<video>` element.

```js

var instance = new vidbg('.vidbg-box', {
  mp4: 'http://example.com/video.mp4', // URL or relative path to MP4 video
  webm: 'path/to/video.webm', // URL or relative path to webm video
  poster: 'path/to/fallback.jpg', // URL or relative path to fallback image
  overlay: false, // Boolean to display the overlay or not
  overlayColor: '#000', // The overlay color as a HEX
  overlayAlpha: 0.3 // The overlay alpha. Think of this as the last integer in RGBA()
}, {
  // Attributes
})
```
Note: Supplying both `.mp4` and `.webm` will increase browser compatibility.

## Options

```js
const defaultOptions = {
  mp4: null,
  webm: null,
  poster: null,
  overlay: false,
  overlayColor: '#000',
  overlayAlpha: 0.3
}
```

## Attributes

```js
const defaultAttributes = {
  autoplay: true,
  controls: false,
  loop: true,
  muted: true,
  playsInline: true
}
```

## Overlay
Setting the `overlay` option to `true` will add an RGBA background over your video. This is helpful when you want to display text or meaningful content over the video background to increase legibility.

## Fallback Image Flashing
You may experience the fallback image flash on page load. This is because the fallback image is added through JavaScript. As a result of this, it will load after CSS styles are rendered.

If you'd like to combat this, you can preset the fallback image through CSS. For example, if your selector is `.video-box` you could do something like:

```css
.video-box .vidbg-container {
  background-image: url(/assets/link-to-fallback.png);
}
```

## Methods

Below are the methods that are available:

```js
// First, create the vidbg.js instance.
var instance = new vidbg('.vidbg-box', {
  mp4: 'http://example.com/video.mp4',
  webm: 'path/to/video.webm',
  poster: 'path/to/fallback.jpg',
})

// Manually resize the video background
instance.resize()

// Remove the <video> element
instance.removeVideo()
```

# License

vidbg.js is licensed under The MIT License. You can view it [here](https://github.com/blakedotvegas/vidbg/blob/master/LICENSE).
