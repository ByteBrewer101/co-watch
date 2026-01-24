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

export function videoSync() {}
