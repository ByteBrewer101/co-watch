// types.ts
export interface ChatMessage {
  userName: string;
  msg: string;
  timestamp: string;
}

export interface ControlMessage {
  type: string;
  timeInSeconds?: number;
}

export interface GlobalContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
  SendControl: (msg: ControlMessage) => void;
  msgs: ChatMessage[];
  sendMessage: (msg: ChatMessage) => void;
}
