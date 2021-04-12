export interface VidbgOptions {
  mp4: string | null;
  webm: string | null;
  poster: string | null;
  overlay: boolean;
  overlayColor: string;
  overlayAlpha: number;
}

export interface VidbgAttributes {
  controls: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}
