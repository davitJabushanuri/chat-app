export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  conversations: IConversation[] | null;
  sentMessages: IMessage[];
  receivedMessages: IMessage[];
}

export interface IConversation {
  id: string;
  messages: IMessage[];
  users: IUser[];
}

export interface IMessage {
  id: string;
  content: string;
  image?: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
}

export interface IProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export interface ISetLayout {
  setLayout: (layout: boolean) => void;
}
