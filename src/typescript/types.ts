export interface LoggedInUser {
  loggedInUserId: number;
  loggedInUserProfilePic: string;
}

export interface User {
  userId: number;
  userName: string;
  userProfileUrl: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Message {
  messageId: number;
  messageSenderId: number;
  content: string;
  timestamp: Date;
  imagePath?: string
}

export interface Chat {
  chatId: number;
  participants: number[];
  messages: Message[];
}

export interface AppData {
  loggedInUser: LoggedInUser;
  users: User[];
  chats: Chat[];
}
