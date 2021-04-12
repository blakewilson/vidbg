class VideoSourceNotSpecifiedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoSourceNotSpecifiedError";
  }
}

export default VideoSourceNotSpecifiedError;
