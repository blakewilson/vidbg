# vidbg.js

A minimal vanilla JavaScript video background plugin.

# Working With Wordpress

If you plan on using vidbg.js with WordPress, make your life a little bit easier and download the plugin I made on the [Wordpress Repo](https://wordpress.org/plugins/video-background/).

# Compatibility

* All modern web browsers
* IE 11+
* All mobile web browsers that support autoplaying HTML5 `<video>`

# Instructions

To get started, [download the script](https://github.com/blakedotvegas/supreme_theme/archive/master.zip). Once you have downloaded the script, include it in your project:


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

The selector argument is any JavaScript selector, the options are for configuring vidbg.js, and the attributes argument modifies the actual `<video>` element.

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


# License

vidbg.js is licensed under The MIT License. You can view it [here](https://github.com/blakedotvegas/vidbg/blob/master/LICENSE).
