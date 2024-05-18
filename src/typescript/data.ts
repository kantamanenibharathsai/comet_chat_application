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
  typing? : boolean;
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
    createdAt?: number;
    guid?: string;
    hasJoined?: boolean;
    isBanned?: boolean;
    joinedAt?: number;
    membersCount?: number;
    owner?: string;
    scope?: string;
    type?: string;
  };
  lastMessage: {
    action?: string;
    actionBy?: {
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      lastActiveAt: number;
      name: string;
      role: string;
      status: string;
      uid: string;
    };
    actionFor?: {
      conversationId: string;
      createdAt: number;
      guid: string;
      hasJoined: boolean;
      isBanned: boolean;
      joinedAt: number;
      membersCount: number;
      name: string;
      owner: string;
      scope: string;
      type: string;
    };
    actionOn?: {
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
    message?: string;
    rawMessage: {
      action?: string;
      actionBy?: {
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        lastActiveAt: number;
        name: string;
        role: string;
        status: string;
        uid: string;
      };
      actionFor?: {
        conversationId: string;
        createdAt: number;
        guid: string;
        hasJoined: boolean;
        isBanned: boolean;
        joinedAt: number;
        membersCount: number;
        name: string;
        owner: string;
        scope: string;
        type: string;
      };
      actionOn?: {
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
      category: string;
      conversationId: string;
      data: {
        action?: string;
        entities: {
          by?: {
            entity: {
              uid: string;
              name: string;
              role: string;
              status: string;
              lastActiveAt: number;
            };
            entityType: string;
          };
          for?: {
            entity: {
              conversationId: string;
              createdAt: number;
              guid: string;
              hasJoined: boolean;
              joinedAt: number;
              membersCount: number;
              name: string;
              owner: string;
              scope: string;
              type: string;
            };
            entityType: string;
          };
          on?: {
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
          receiver?: {
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
          sender?: {
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
        text?: string;
      };
      id: string;
      mentionedMe: boolean;
      mentionedUsers: [];
      reactions: [];
      message?: string;
      receiver: {
        avatar?: string;
        blockedByMe: boolean;
        deactivatedAt: number;
        hasBlockedMe: boolean;
        name: string;
        role: string;
        status: string;
        uid: string;
        conversationId?: string;
        createdAt?: number;
        guid?: string;
        hasJoined?: boolean;
        isBanned?: boolean;
        joinedAt?: number;
        membersCount?: number;
        owner?: string;
        scope?: string;
        type?: string;
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
      updatedAt: number;
    };
    reactions: [];
    receiver: {
      avatar?: string;
      blockedByMe: boolean;
      deactivatedAt: number;
      hasBlockedMe: boolean;
      name: string;
      role: string;
      status: string;
      uid: string;
      conversationId?: string;
      createdAt?: number;
      guid?: string;
      hasJoined?: boolean;
      isBanned?: boolean;
      joinedAt?: number;
      membersCount?: number;
      owner?: string;
      scope?: string;
      type?: string;
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
          lastActiveAt?: number;
          name: string;
          role?: string;
          status?: string;
          uid?: string;
          createdAt?: number;
          guid?: string;
          membersCount?: number;
          onlineMembersCount?: number;
          owner?: string;
          type?: string;
          updatedAt?: number;
        };
        entityType: string;
      };
      sender: {
        entity: {
          conversationId?: string;
          avatar?: string;
          lastActiveAt?: number;
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
            lastActiveAt?: number;
            name: string;
            role?: string;
            status?: string;
            uid?: string;
            createdAt?: number;
            guid?: string;
            membersCount?: number;
            onlineMembersCount?: number;
            owner?: string;
            type?: string;
            updatedAt?: number;
          };
          entityType: string;
        };
        sender: {
          entity: {
            conversationId?: string;
            avatar?: string;
            lastActiveAt?: number;
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
    receiver?: {
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
    sender?: {
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
    blockedByMe?: boolean;
    deactivatedAt?: number;
    hasBlockedMe?: boolean;
    lastActiveAt?: number;
    name: string;
    role?: string;
    status?: string;
    uid?: string;
    conversationId?: string;
    createdAt?: number;
    guid?: string;
    hasJoined?: boolean;
    isBanned?: boolean;
    membersCount?: number;
    onlineMembersCount?: number;
    owner?: string;
    type?: string;
    updatedAt?: number;
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

export interface GroupInterface {
  conversationId: string;
  createdAt: number;
  guid: string;
  hasJoined: boolean;
  isBanned: boolean;
  joinedAt: number;
  membersCount: number;
  name: string;
  owner: string;
  scope: string;
  type: string;
}

export interface Members {
  [key: string]: string;
}

export interface CreatedGroup {
  group: GroupInterface;
  members: Members;
}

export interface GroupMemeberInterface {
  avatar?: string;
  blockedByMe?: boolean;
  conversationId?: string;
  deactivatedAt?: number;
  guid?: string;
  hasBlockedMe?: boolean;
  joinedAt?: number;
  name?: string;
  role?: string;
  scope?: string;
  status?: string;
  uid?: string;
}






// Anagram problem

// const checkEachCharFreq = (givenStr) => {
//   const eachCharCountMap = new Map();
//   for (let char of givenStr) eachCharCountMap.set(char, (eachCharCountMap.get(char) || 0) + 1);
//   return eachCharCountMap;
// }
// const checkIsAnagramOrNot = (strA, strB) => {
// //   if (strA.length !== strB.length) return false;
// //   const strAFreq = checkEachCharFreq(strA);
// //   const strBFreq = checkEachCharFreq(strB);
// //   for (let [char, count] of strAFreq) if (strBFreq.get(char) !== count) return false;
// //   return true;
//     return strA.split("").sort().join() === strB.split("").sort().join();
// }
// console.log(checkIsAnagramOrNot("t", "e"));




// Target Sum Indexes Problem

// const returnTargetSumIndices = (arrayNums, target) =>  {
//     let isTargetSumPresent = false;
//   for (let i = 0; i < arrayNums.length - 1; i++) {
//     for (let j = 0; j < arrayNums.length - (i + 1); j++) {
//       let secondIndex = i + j + 1;
//       let currentSum = arrayNums[i] + arrayNums[secondIndex];
//       if (currentSum === target) return [i, secondIndex];
//       }
//     }
//     if (!isTargetSumPresent) return "No indexes";
//   }


// console.log(returnTargetSumIndices([3, 3, 4, 7, 6], 110));


//Find Second Largest Number

// const returnSecondLargestNum = (arrNums) => {
//   const uniqueSortedDescArray = [...new Set(arrNums)].sort((a, b) => b - a);
//   return uniqueSortedDescArray.length > 1 ? uniqueSortedDescArray[1] : "Second Largest Number is not present";
// return  [...new Set(arrNums)].sort((a,b) => b - a)[1]
// }
const arrayNums = [25, 11, 30, -10, 25, 24];
arrayNums.sort(function(a,b) {return a-b})
console.log(arrayNums[1])
// console.log(returnSecondLargestNum(arrayNums));





//Rotate Array k times

// const returnRotatedArray = (arrayNums, k) => {
   // const arrayLength = arrayNums.length;
   // if (k === 0) return arrayNums;
   // const lastNum = arrayNums[arrayLength - 1];
   // for (let i = arrayLength - 1; i > 0; i--) arrayNums[i] = arrayNums[i - 1];
   // arrayNums[0] = lastNum;
   // return returnRotatedArray(arrayNums, k - 1);
   // Array(k).fill("").forEach((curr) => {
   // const lastEl = arrayNums.pop()
   // arrayNums.unshift(lastEl)
   // })
   // return arrayNums
// }

// const arrayNums = [1,2,3,4,5,6,7, 8, 9];
// const k = 5;
// console.log(returnRotatedArray(arrayNums, k));


// Remove Duplicates And Fill Underscores

// const removeDuplicatesAndFillUnderscores = (arrayNums) => {
//     const uniqueArray = Array.from(new Set(arrayNums)).sort((a, b) => a - b);
//     const underscoresCount = arrayNums.length - uniqueArray.length;
//     for (let i = 0; i < underscoresCount; i++) uniqueArray.push('_');
//     console.log(uniqueArray);
//     return uniqueArray.filter(eachNum => eachNum !== "_").length;
// }

// const arrayNums =  [-10, -10, 0,0,1,1,1,2,2,3,3,4];


// console.log(removeDuplicatesAndFillUnderscores(arrayNums));
// const arr=[1,2,34,3,3,1,2,3]
// const value =new Set(arr)
// console.log(value.size)
// let em=[]
// for(let i=0; i<arr.length; i++){
//    let str=''
// if(!em.includes(arr[i])){
//    em.push(arr[i])
// }
// else{
//    em.push('-')
// }
// }
// console.log(em)





// sort the persons Array based on Person Names

// const returnSortedPersonArray = (personsArray) => {
//     if (!personsArray.length) return "Persons Doesn't Exist";
//     return personsArray.sort((objA, objB) => {
//     const nameA = objA.personName.toLowerCase();
//     const nameB = objB.personName.toLowerCase();
//     if (nameA < nameB) return -1;
//     else if (nameA > nameB) return 1;
//     else return 0;
// });
// }


// sorting array based on person name alphabetcial order;
const personsArray = [
   { personName: "PAUl", personId: 1 },
   { personName: "Ramesh", personId: 2 },
   { personName: "Bharath", personId: 4 },
   { personName: "Pawan Kalyan", personId: 5 },
   { personName: "Ramireddy", personId: 6 },
   { personName: "Naga Prasanna", personId: 7 },
   { personName: "Naga Bhushan", personId: 8 },
   { personName: "Sriram", personId: 9 },
   { personName: "Sukeshini", personId: 10 },
   { personName: "Karunasri", personId: 11 },
   { personName: "Paul", personId: 12 },
];
console.log("sorted array", personsArray.sort((a,b) => a.personName < b.personName ? -1 : 1));




// Anagram code
const checkIsAnagramOrNot = (strA : string, strB : string) => strA.split("").sort().join() === strB.split("").sort().join();
console.log("Anagram", checkIsAnagramOrNot("tit", "tat"));
