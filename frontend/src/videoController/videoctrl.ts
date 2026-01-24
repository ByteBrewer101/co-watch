import type React from "react";

export function videoPlay(videoRef: React.RefObject<HTMLVideoElement>) {
  videoRef.current?.play();
}

export function videoPause(videoRef: React.RefObject<HTMLVideoElement>) {
  videoRef.current?.pause();
}

export function videoSync() {}
