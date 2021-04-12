export interface VidbgOptions {
  mp4: string | null;
  webm: string | null;
  poster: string | null;
  overlay: boolean;
  overlayColor: string;
  overlayAlpha: number;
}

export interface VidbgAttributes extends HTMLVideoElement {
  controls: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}
