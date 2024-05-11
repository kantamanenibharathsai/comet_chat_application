export interface LoggedInUser {
  authToken: string;
  blockedByMe: boolean;
  deactivatedAt: number;
  hasBlockedMe: boolean;
  lastActiveAt: number;
  name: string;
  role: string;
  status: string;
  uid: string;
}

export type ChatMsgsInterface = {
  category: string;
  conversationId: string;
  data: {
    attachments?: {
      extension: string;
      mimeType: string;
      name: string;
      size: number;
      url: string;
    }[];
    category?: string;
    entities: {
      receiver: {
        entity: {
          conversationId?: string;
          avatar?: string;
          lastActiveAt: number;
          name: string;
          role: string;
          status: string;
          uid: string;
        };
        entityType: string;
      };
      sender: {
        entity: {
          conversationId?: string;
          avatar?: string;
          lastActiveAt: number;
          name: string;
          role: string;
          status: string;
          uid: string;
        };
        entityType: string;
      };
    };
    resource: string;
    type?: string;
    text?: string;
    url?: string;
  };
  id: string;
  mentionedMe: boolean;
  mentionedUsers: [];
  rawMessage: {
    category: string;
    conversationId: string;
    data: {
      entities: {
        receiver: {
          entity: {
            avatar: string;
            conversationId: string;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
        sender: {
          entity: {
            avatar: string;
            lastActiveAt: number;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
      };
      resource: string;
      text: string;
    };
    id: string;
    mentionedMe: boolean;
    mentionedUsers: [];
    reactions: [];
    receiver: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    receiverId: string;
    receiverType: string;
    sender: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    sentAt: number;
    text: string;
    type: string;
    updatedAt: number;
  };
  reactions: [];
  receiver: {
    blockedByMe: boolean;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    lastActiveAt: number;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  receiverId: string;
  receiverType: string;
  sender: {
    blockedByMe: boolean;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    lastActiveAt: number;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  sentAt: number;
  text?: string;
  type: string;
  updatedAt: number;
  lastReadMessageId: string;
  unreadMentionsCount: undefined;
  unreadMessageCount: number;
};

export type LeftSideUser = {
  conversationId: string;
  conversationType: string;
  conversationWith: {
    avatar?: string;
    blockedByMe: boolean;
    conversationId: string;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    lastActiveAt?: number;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  lastMessage: {
    category: string;
    conversationId: string;
    data: {
      attachments?: {
        extension: string;
        mimeType: string;
        name: string;
        size: number;
        url: string;
      }[];
      category?: string;
      entities: {
        receiver: {
          entity: {
            conversationId?: string;
            avatar?: string;
            lastActiveAt: number;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
        sender: {
          entity: {
            conversationId?: string;
            avatar?: string;
            lastActiveAt: number;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
      };
      resource: string;
      type?: string;
      text?: string;
      url?: string;
    };
    id: string;
    mentionedMe: string;
    mentionedUsers: [];
    rawMessage: {
      category: string;
      conversationId: string;
      data: {
        entities: {
          receiver: {
            entity: {
              avatar: string;
              conversationId: string;
              name: string;
              role: string;
              status: string;
              uid: string;
            };
            entityType: string;
          };
          sender: {
            entity: {
              avatar: string;
              lastActiveAt: number;
              name: string;
              role: string;
              status: string;
              uid: string;
            };
            entityType: string;
          };
        };
        resource: string;
        text: string;
      };
      id: string;
      mentionedMe: boolean;
      mentionedUsers: [];
      reactions: [];
      receiver: {
        avatar: string;
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        name: string;
        role: string;
        status: string;
        uid: string;
      };
      receiverId: string;
      receiverType: string;
      sender: {
        avatar: string;
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        lastActiveAt: number;
        name: string;
        role: string;
        status: string;
        uid: string;
      };
      sentAt: number;
      text: string;
      type: string;
      updatedAt: number;
    };
    reactions: [];
    receiver: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    receiverId: string;
    receiverType: string;
    sender: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    sentAt: number;
    text: string;
    type: string;
    updatedAt: number;
  };
  lastReadMessageId: string;
  unreadMentionsCount: number | undefined;
  unreadMessageCount: number;
};

export const groupUsersList: { personUID: string; personName: string }[] = [
  {
    personUID: "1238",
    personName: "shaya",
  },
  {
    personUID: "8021",
    personName: "kantamaneni",
  },
  {
    personUID: "123",
    personName: "dundi",
  },
  {
    personUID: "superhero1",
    personName: "Iron Man",
  },
  {
    personUID: "superhero2",
    personName: "Captain America",
  },
  {
    personUID: "superhero3",
    personName: "Spiderman",
  },
  {
    personUID: "superhero4",
    personName: "Wolverine",
  },
];

export type Conversation = {
  conversationId: string;
  conversationType: string;
  conversationWith: {
    avatar: string;
    blockedByMe: boolean;
    conversationId: string;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  lastMessage: {
    category: string;
    conversationId: string;
    data: {
      entities: {
        receiver: {
          entity: {
            avatar: string;
            conversationId: string;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
        sender: {
          entity: {
            avatar: string;
            lastActiveAt: string;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
      };
      resource: string;
      text: string;
    };
    id: string;
    mentionedMe: string;
    mentionedUsers: [];
    rawMessage: {
      category: string;
      conversationId: string;
      data: {
        entities: {
          receiver: {
            entity: {
              avatar: string;
              conversationId: string;
              name: string;
              role: string;
              status: string;
              uid: string;
            };
            entityType: string;
          };
          sender: {
            entity: {
              avatar: string;
              lastActiveAt: number;
              name: string;
              role: string;
              status: string;
              uid: string;
            };
            entityType: string;
          };
        };
        resource: string;
        text: string;
      };
      id: string;
      mentionedMe: boolean;
      mentionedUsers: [];
      reactions: [];
      receiver: {
        avatar: string;
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        name: string;
        role: string;
        status: string;
        uid: string;
      };
      receiverId: string;
      receiverType: string;
      sender: {
        avatar: string;
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        lastActiveAt: number;
        name: string;
        role: string;
        status: string;
        uid: string;
      };
      sentAt: number;
      text: string;
      type: string;
      updatedAt: number;
    };
    reactions: [];
    receiver: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    receiverId: string;
    receiverType: string;
    sender: {
      avatar: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    sentAt: number;
    text: string;
    type: string;
    updatedAt: number;
  };
  lastReadMessageId: string;
  unreadMentionsCount: number | undefined;
  unreadMessageCount: number;
};

// export interface IMessageDataType {
//   reactions: [];
//   mentionedUsers: never[];
//   mentionedMe: boolean;
//   receiverId: string;
//   type: string;
//   receiverType: string;
//   category: string;
//   data: {
//     url: string;
//     text: string;
//     attachments?: {
//       name: string;
//       extension: string;
//       size: number;
//       mimeType: string;
//       url: string;
//     }[];
//     entities: {
//       sender: {
//         entity: {
//           uid: string;
//           name: string;
//           role: string;
//           status: string;
//           lastActiveAt: number;
//         };
//         entityType: string;
//       };
//       receiver: {
//         entity: {
//           uid: string;
//           name: string;
//           role: string;
//           avatar: string;
//           status: string;
//           conversationId: string;
//         };
//         entityType: string;
//       };
//     };
//     resource: string;
//   };
//   text: string;
//   id: string;
//   conversationId: string;
//   sender: {
//     hasBlockedMe: boolean;
//     blockedByMe: boolean;
//     deactivatedAt: number;
//     uid: string;
//     name: string;
//     lastActiveAt: number;
//     role: string;
//     status: string;
//   };
//   receiver: {
//     hasBlockedMe: boolean;
//     blockedByMe: boolean;
//     deactivatedAt: number;
//     uid: string;
//     name: string;
//     avatar: string;
//     role: string;
//     status: string;
//   };
//   sentAt: number;
//   updatedAt: number;
//   rawMessage: {
//     reactions: never[];
//     mentionedUsers: never[];
//     mentionedMe: boolean;
//     receiverId: string;
//     type: string;
//     receiverType: string;
//     category: string;
//     data: {
//       text: string;
//       entities: {
//         sender: {
//           entity: {
//             uid: string;
//             name: string;
//             role: string;
//             status: string;
//             lastActiveAt: number;
//           };
//           entityType: string;
//         };
//         receiver: {
//           entity: {
//             uid: string;
//             name: string;
//             role: string;
//             avatar: string;
//             status: string;
//             conversationId: string;
//           };
//           entityType: string;
//         };
//       };
//       resource: string;
//     };
//     text: string;
//     id: string;
//     conversationId: string;
//     sender: {
//       hasBlockedMe: boolean;
//       blockedByMe: boolean;
//       deactivatedAt: number;
//       uid: string;
//       name: string;
//       lastActiveAt: number;
//       role: string;
//       status: string;
//     };
//     receiver: {
//       hasBlockedMe: boolean;
//       blockedByMe: boolean;
//       deactivatedAt: number;
//       uid: string;
//       name: string;
//       avatar: string;
//       role: string;
//       status: string;
//     };
//     sentAt: number;
//     updatedAt: number;
//   };
// }

export interface ChatMsgsDataType {
  category: string;
  conversationId: string;
  data: {
    attachments?: {
      extension: string;
      mimeType: string;
      name: string;
      size: number;
      url: string;
    }[];
    category?: string;
    entities: {
      receiver: {
        entity: {
          conversationId?: string;
          avatar?: string;
          lastActiveAt: number;
          name: string;
          role: string;
          status: string;
          uid: string;
        };
        entityType: string;
      };
      sender: {
        entity: {
          conversationId?: string;
          avatar?: string;
          lastActiveAt: number;
          name: string;
          role: string;
          status: string;
          uid: string;
        };
        entityType: string;
      };
    };
    resource: string;
    type?: string;
    text?: string;
    url?: string;
  };
  id: string;
  mentionedMe: boolean;
  mentionedUsers: [];
  rawMessage: {
    category: string;
    conversationId: string;
    data: {
      attachments?: {
        extension: string;
        mimeType: string;
        name: string;
        size: number;
        url: string;
      }[];
      category?: string;
      entities: {
        receiver: {
          entity: {
            conversationId?: string;
            avatar?: string;
            lastActiveAt: number;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
        sender: {
          entity: {
            conversationId?: string;
            avatar?: string;
            lastActiveAt: number;
            name: string;
            role: string;
            status: string;
            uid: string;
          };
          entityType: string;
        };
      };
      resource: string;
      type?: string;
      text?: string;
      url?: string;
    };
    id: string;
    mentionedMe: boolean;
    mentionedUsers: [];
    reactions: [];
    receiver: {
      avatar?: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    receiverId: string;
    receiverType: string;
    sender: {
      avatar?: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    sentAt: number;
    type: string;
    updatedAt?: number;
  };
  reactions: [];
  receiver: {
    blockedByMe: boolean;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    lastActiveAt: number;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  receiverId: string;
  receiverType: string;
  sender: {
    avatar?: string;
    blockedByMe: boolean;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    lastActiveAt: number;
    name: string;
    role: string;
    status: string;
    uid: string;
  };
  sentAt: number;
  text?: string;
  type: string;
  updatedAt?: number;
}
