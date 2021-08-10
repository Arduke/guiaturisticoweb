export interface IMessage {
  id: string;
  roomId: string;
  author: string;
  content: string;
  picture: any | null;
}
