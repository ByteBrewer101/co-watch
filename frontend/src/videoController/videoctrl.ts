export function videoPlay(videoRef: React.RefObject<HTMLVideoElement | null>) {
  if (videoRef.current) {
    videoRef.current.play();
  }
}

export function videoPause(videoRef: React.RefObject<HTMLVideoElement | null>) {
  if (videoRef.current) {
    videoRef.current.pause();
  }
}

export function seekTo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  timeInSeconds: number,
) {
  if (videoRef.current) {
    videoRef.current.currentTime = timeInSeconds;
    console.log(timeInSeconds);
  }
}
