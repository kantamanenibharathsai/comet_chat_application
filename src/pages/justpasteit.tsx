import React, { Component, createRef } from "react";
import {
    CometChat,
    // Conversation,
    BaseMessage,
    TextMessage,
    MediaMessage,
    CustomMessage,
    TypingIndicator,
    // Group,
} from "@cometchat/chat-sdk-javascript";
import ContactsIcon from "@mui/icons-material/Contacts";
import ImageIcon from "@mui/icons-material/Image";

import {
    Avatar,
    Badge,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { LogoutOutlined as LogoutOutlinedIcon } from "@mui/icons-material";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

import { Divider } from "@mui/material";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { styles } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
// import { Conversation, Group, Messages } from "./types";
import { pink } from "@mui/material/colors";



export type Messages = {
    category: string;
    conversationId: string;
    data: {
        attachments: {
            extension: string;
            mimeType: string;
            name: string;
            size: number;
            url: string;
        }[];
        category: string;
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
        type: string;
        url: string;
    };
    id: string;
    mentionedMe: string;
    mentionedUsers: [];
    rawMessage: {
        category: string;
        conversationId: string;
        data: {
            attachments: {
                extension: string;
                mimeType: string;
                name: string;
                size: number;
                url: string;
            }[];
            category: string;
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
            type: string;
            url: string;
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
        guid: string
    };
    lastMessage: Messages;
    lastReadMessageId: string;
    unreadMentionsCount: number | undefined;
    unreadMessageCount: number;
};

export type Group = {
    conversationId: string;
    createdAt: number;
    guid: string;
    hasJoined: boolean;
    isBanned: boolean;
    membersCount: number;
    name: string;
    owner: string
    type: string;
};

interface User {
    uid: string;
    name: string;
    profile: string;
    guid: string;
}

interface ConversationsOfUser {
    uid: string;
    name: string;
    profile: string;
    unreadMessageCount: number;
    conversationType: string;
    status: string;
    lastMessage: Messages;
    typing?: boolean;
}

interface Message {
    text: string;
    sender: string;
    readBy: boolean;
    media?: string;
    sentAt: number;
}

interface SelectedUser {
    uid: string;
    name: string;
    profile: string;
    status: string;
    guid: string;
    type: string;
    typing?: boolean;
}

interface AppState {
    isLoggedIn: boolean;
    messages: Message[];
    users: User[];
    selectedUser: SelectedUser;
    messageText: string;
    currentUser: User | null;
    conversations: any;
    selectedConversation: Conversation | null;
    unreadMessageCounts: Record<string, number>;
    allContacts: boolean;
    typingStatus: boolean;
    mediaMessage?: File;
    showImage: boolean;
    activeTab: string;
    isLoading: boolean;
    openModal: boolean;
    groupID: string;
    groupName: string;
    addGroupMembers: string[];
}

class ChatApp extends Component<{}, AppState> {
    fileInputRef: React.RefObject<HTMLInputElement>;
    messageRef: React.RefObject<unknown>;
    typingRef: NodeJS.Timer | null;
    constructor(props: {}) {
        super(props);
        this.state = {
            isLoggedIn: false,
            messages: [],
            users: [],
            selectedUser: {
                name: "",
                profile: "",
                uid: "",
                status: "",
                guid: "",
                type: "",
            },
            messageText: "",
            currentUser: null,
            conversations: [],
            selectedConversation: null,
            unreadMessageCounts: {} as Record<string, number>,
            allContacts: false,
            typingStatus: false,
            mediaMessage: undefined,
            showImage: false,
            activeTab: "0",
            isLoading: false,
            openModal: false,
            groupID: "",
            groupName: "",
            addGroupMembers: [],
        };
        this.fileInputRef = createRef();
        this.messageRef = React.createRef();
        this.typingRef = null;
    }

    componentDidMount() {
        this.receiveMessages();
        this.getConversations();
        this.getLoggedInUser();
        this.addTypingIndicatorListener();
        this.loadUsers();
    }

    startTyping = () => {
        const receiverId: string = this.state.selectedUser.uid;
        const receiverType: string = CometChat.RECEIVER_TYPE.USER;
        const typingNotification: CometChat.TypingIndicator =
            new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.startTyping(typingNotification);
    };

    stopTyping = () => {
        let receiverId: string = this.state.selectedUser.uid;
        let receiverType: string = CometChat.RECEIVER_TYPE.USER;
        let typingNotification: CometChat.TypingIndicator =
            new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.endTyping(typingNotification);
    };

    typingDebounce = (dealy: number) => {
        return () => {
            if (this.typingRef) {
                clearTimeout(this.typingRef);
                this.typingRef = null;
            }
            this.typingRef = setTimeout(() => {
                this.stopTyping();
            }, dealy);
        };
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ messageText: e.target.value });
        this.startTyping();
        this.typingDebounce(1000)();
    };

    addTypingIndicatorListener = async () => {
        const selectedUserUid: string = this.state.selectedUser.uid;
        CometChat.addMessageListener(
            selectedUserUid,
            new CometChat.MessageListener({
                onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
                    console.log("Typing started...", typingIndicator);
                    const conversationsData = this.state.conversations.map(
                        (item: any) => {
                            if (item.uid === typingIndicator.getSender().getUid()) {
                                return { ...item, typing: true };
                            } else {
                                return item;
                            }
                        }
                    );
                    if (
                        this.state.selectedUser.uid === typingIndicator.getSender().getUid()
                    ) {
                        this.setState((prevState) => ({
                            selectedUser: {
                                ...prevState.selectedUser,
                                typing: true,
                            },
                        }));
                    }
                    this.setState({ conversations: conversationsData });
                },
                onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
                    console.log("Typing ended...", typingIndicator);
                    const conversationData = this.state.conversations.map((item: any) => {
                        if (item.uid === typingIndicator.getSender().getUid()) {
                            return { ...item, typing: false };
                        } else {
                            return item;
                        }
                    });
                    if (
                        this.state.selectedUser.uid === typingIndicator.getSender().getUid()
                    ) {
                        this.setState((prevState) => ({
                            selectedUser: {
                                ...prevState.selectedUser,
                                typing: false,
                            },
                        }));
                    }

                    this.setState({ conversations: conversationData });
                },
            })
        );
    };

    getLoggedInUser = async () => {
        try {
            const user: CometChat.User | null = await CometChat.getLoggedinUser();
            if (user) {
                this.setState({
                    currentUser: {
                        uid: user.getUid(),
                        name: user.getName(),
                        profile: user.getAvatar(),
                        guid: "",
                    },
                });
            }
        } catch (error) {
            console.error("Error getting logged-in user:", error);
        }
    };

    loadUsers = async () => {
        try {
            const usersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(30)
                .build();
            const users: User[] = (await usersRequest.fetchNext()).map(
                (user: CometChat.User) => ({
                    uid: user.getUid(),
                    name: user.getName(),
                    profile: user.getAvatar(),
                    guid: "",
                })
            );
            console.log(users, "usersssssssssssssssssssss");
            this.setState({ users });
        } catch (error) {
            console.log("Load Users Error:", error);
        }
    };

    handleLogout = () => {
        CometChatUIKit.logout();
        window.location.pathname = "/login";
    };

    getConversations = async () => {
        try {
            let conversationsRequest = new CometChat.ConversationsRequestBuilder()
                .setLimit(30)
                .build();
            const conversationList = (await conversationsRequest.fetchNext()) as Conversation[];
            console.log("Conversations list received:", conversationList);
            const unreadMessageCounts: Record<string, number> = {};
            // conversationList.forEach((conversation) => {
            // unreadMessageCounts[conversation.getConversationId()] =
            // conversation.getUnreadMessageCount();
            // });
            const conversations = conversationList.map((conversation) => {
                return {
                    uid: conversation.conversationWith.uid
                        ? conversation.conversationWith.uid
                        : conversation.conversationWith.guid,
                    name: conversation.conversationWith.name,
                    profile: conversation.conversationWith.avatar,
                    status: conversation.conversationWith.status,
                    conversationType: conversation.conversationType,
                    unreadMessageCount: conversation.unreadMessageCount,
                    lastMessage: conversation.lastMessage,
                    // unreadMessageCount: unreadMessageCounts[conversation.getConversationId()],
                };
            });
            this.setState({ conversations: conversations });
        } catch (error) {
            console.log("Conversations list fetching failed with error:", error);
        }
    };

    receiveMessages = async () => {
        const MESSAGE_LISTENER_ID = "MESSAGE_LISTENER_ID";
        CometChat.addMessageListener(
            MESSAGE_LISTENER_ID,
            new CometChat.MessageListener({
                onTextMessageReceived: async (message: CometChat.TextMessage) => {
                    console.log(message, "recive message");
                    const newMessage: Message = {
                        text: message.getText(),
                        sender: message.getSender().getUid(),
                        readBy: false,
                        media: message.getData().url,
                        sentAt: message.getSentAt(),
                    };
                    this.setState((prevState) => ({
                        messages: [...prevState.messages, newMessage],
                    }));
                    setTimeout(() => {
                        if (this.messageRef.current) {
                            (this.messageRef.current as HTMLElement)?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    }, 100);
                },
            })
        );
    };

    loadMessages = async (conversation: ConversationsOfUser) => {
        const updatedConversation = {
            ...conversation,
            unreadMessageCount: "",
        };
        console.log(updatedConversation, "updateddddddddddddddddddddd");
        // this.setState({
        // selectedUser: {
        // name: conversation.name,
        // uid: conversation.uid,
        // profile: conversation.profile,
        // status: conversation.status,
        // guid: "",
        // type: conversation.conversationType,
        // },
        // messages: [],
        // });
        this.setState((prevState) => ({
            ...prevState,
            selectedUser: {
                name: conversation.name,
                uid: conversation.uid,
                profile: conversation.profile,
                status: conversation.status,
                guid: "",
                type: conversation.conversationType,
            },
            messages: [],
            conversation: updatedConversation,
        }));
        console.log(conversation, "user and grop");
        try {
            const messageRequest =
                conversation.conversationType === "group"
                    ? new CometChat.MessagesRequestBuilder()
                        .setGUID(conversation.uid)
                        .setLimit(30)
                        .build()
                    : new CometChat.MessagesRequestBuilder()
                        .setUID(conversation.uid)
                        .setLimit(30)
                        .build();

            const messages: BaseMessage[] = await messageRequest.fetchPrevious();
            console.log("Messages loaded for user:", messages);

            await CometChat.markAsRead(
                messages[0]?.getId(),
                conversation.uid,
                "user",
                messages[0]?.getSender()?.getUid()
            );

            if (messages.length > 0 && typeof messages[0]?.getId() === "string") {
                await CometChat.markAsRead(
                    messages[0]?.getId(),
                    conversation.uid,
                    "user",
                    messages[0]?.getSender()?.getUid()
                );
            } else {
                console.error("Invalid message ID:", messages[0]?.getId());
            }

            const formattedMessages: Message[] = messages.map((message) => ({
                text:
                    message instanceof CometChat.TextMessage
                        ? message.getText() || ""
                        : "",
                sender: message.getSender().getUid(),
                readBy: message.getReadAt() !== 0,
                media: message.getData().url,
                sentAt: message.getSentAt(),
            }));

            const updatedUnreadMessageCounts = {
                ...this.state.unreadMessageCounts,
            };

            updatedUnreadMessageCounts[conversation.uid] = 0;

            this.setState({
                messages: formattedMessages,
                // selectedUser: { ...this.state.selectedUser, uid: conversation.uid },
                unreadMessageCounts: updatedUnreadMessageCounts,
                activeTab: conversation.uid,
            });
            console.log(this.state.unreadMessageCounts, "updatedMessagescount");
            setTimeout(() => {
                if (this.messageRef.current) {
                    (this.messageRef.current as HTMLElement)?.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            }, 100);
        } catch (error) {
            console.log("Message fetching failed with error:", error);
        }
    };

    loadAllContacts = () => {
        console.log("allcontactssssssss");
        this.setState({ allContacts: !this.state.allContacts }, () => {
            this.loadUsers();
        });
    };

    handleImageIconClick = () => {
        this.fileInputRef?.current?.click();
        this.setState({ showImage: true });
    };

    handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        this.setState({ mediaMessage: file });
    };

    sendMessage = async () => {
        const { messageText, selectedUser, mediaMessage } = this.state;
        if ((!messageText && !mediaMessage) || !selectedUser) return;

        let receiverID: string = selectedUser.uid;
        let receiverType: string =
            selectedUser.type === "user"
                ? CometChat.RECEIVER_TYPE.USER
                : CometChat.RECEIVER_TYPE.GROUP;

        try {
            if (mediaMessage) {
                // If there's a media message, send it
                let messageType: string = CometChat.MESSAGE_TYPE.IMAGE;
                let mediaMessageInstance: CometChat.MediaMessage =
                    new CometChat.MediaMessage(
                        receiverID,
                        mediaMessage,
                        messageType,
                        receiverType
                    );

                const message = await CometChat.sendMediaMessage(mediaMessageInstance);
                if (message instanceof CometChat.MediaMessage) {
                    console.log("Media message sent successfully:", message);
                    const sender = message.getSender();
                    const mediaData = message.getData() as { url: string };
                    const mediaUrl = mediaData.url || "";
                    this.setState((prevState) => ({
                        messages: [
                            ...prevState.messages,
                            {
                                text: "",
                                sender: sender ? sender.getUid() : "",
                                readBy: false,
                                media: mediaUrl,
                                sentAt: message.getSentAt(),
                            },
                        ],
                    }));
                    setTimeout(() => {
                        if (this.messageRef.current) {
                            (this.messageRef.current as HTMLElement)?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    }, 100);
                } else {
                    console.log("Received non-media message:", message);
                }
            }

            if (messageText) {
                // If there's a text message, send it
                let textMessage: CometChat.TextMessage = new CometChat.TextMessage(
                    receiverID,
                    messageText,
                    receiverType
                );

                const message = await CometChat.sendMessage(textMessage);
                if (message instanceof CometChat.TextMessage) {
                    console.log("Text message sent successfully:", message);

                    const sender = message.getSender();
                    this.setState((prevState) => ({
                        messages: [
                            ...prevState.messages,
                            {
                                text: message.getText(),
                                sender: sender ? sender.getUid() : "",
                                readBy: false,
                                media: "",
                                sentAt: message.getSentAt(),
                            },
                        ],
                    }));
                    setTimeout(() => {
                        if (this.messageRef.current) {
                            (this.messageRef.current as HTMLElement)?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    }, 100);
                } else {
                    console.log("Received non-text message:", message);
                }
            }

            this.setState({ messageText: "", mediaMessage: undefined });
        } catch (error) {
            console.log("Send Message Error:", error);
        }
    };

    createGroup = () => {
        this.setState({ openModal: true });
    };

    handleModalClose = () => {
        this.setState({ openModal: false });
    };

    handleCreateGroup = async () => {
        const { groupID, groupName, addGroupMembers } = this.state;
        var group = new CometChat.Group(
            groupID,
            groupName,
            CometChat.GROUP_TYPE.PUBLIC,
            ""
        );
        let banMembers: Array<string> = [""];
        let members: Array<CometChat.GroupMember> = addGroupMembers.map((each) => {
            return new CometChat.GroupMember(
                each,
                CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
            );
        });
        try {
            const createdGroup = await CometChat.createGroupWithMembers(
                group,
                members,
                banMembers
            );
            console.log("Group created successfully:", createdGroup);
            //@ts-ignore
            this.setState((prevState) => ({
                conversations: [...prevState.conversations, createdGroup],
                openModal: false,
            }));
            // this.setState({conversations:createdGroup})
        } catch (error) {
            console.log("Group creation failed with exception:", error);
        }
    };

    render() {
        const {
            messages,
            users,
            selectedUser,
            messageText,
            currentUser,
            conversations,
            unreadMessageCounts,
            allContacts,
            activeTab,
            openModal,
            groupID,
            groupName,
        } = this.state;
        console.log(users, "ueserssssssssss");
        console.log(this.state.addGroupMembers, "groupmembers");
        console.log(conversations, "conversationsssssssssssssssssssssss");
        return (
            <Box>
                <Modal
                    open={openModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ width: "80%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={styles.registeSubCont}>
                                <Typography sx={styles.registerText}> Create Group</Typography>
                                <TextField
                                    fullWidth
                                    label="Group ID"
                                    name="name"
                                    value={groupID}
                                    onChange={(e) => this.setState({ groupID: e.target.value })}
                                    variant="outlined"
                                    required
                                    sx={styles.textFeildStyles}
                                    InputLabelProps={{
                                        style: {
                                            color: "#fff",
                                            fontWeight: "bold",
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Group Name"
                                    name="uid"
                                    value={groupName}
                                    onChange={(e) => this.setState({ groupName: e.target.value })}
                                    variant="outlined"
                                    required
                                    sx={styles.textFeildStyles}
                                    InputLabelProps={{
                                        style: {
                                            color: "#fff",
                                            fontWeight: "bold",
                                        },
                                    }}
                                />
                                <Box sx={{ height: "400px", overflow: "auto", mb: 5 }}>
                                    {users.map((user) => (
                                        <Box key={user.uid}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Checkbox
                                                    onChange={(e) =>
                                                        this.setState((prevState) => ({
                                                            addGroupMembers: [
                                                                ...prevState.addGroupMembers,
                                                                user.uid,
                                                            ],
                                                        }))
                                                    }
                                                    sx={{
                                                        color: "#fff",
                                                        "&.Mui-checked": {
                                                            color: "#fff",
                                                        },
                                                    }}
                                                />
                                                <Typography
                                                    sx={{ ...styles.registerText, fontSize: "20px" }}
                                                >
                                                    {user.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleCreateGroup}
                                    sx={styles.btnStyles}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Box sx={styles.chatMainConatainer}>
                    <Box sx={styles.chatListContainer}>
                        <Box sx={styles.chatListHeader}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* <Box sx={styles.searchContainer}>
<SearchIcon sx={styles.searchIconStyles} />
<TextField placeholder="Search..." sx={styles.inputStyles} />
</Box> */}
                                <Box
                                    sx={{
                                        ...styles.iconsStyles,
                                        background: "#fa4d4d",
                                        color: "#fff",
                                    }}
                                >
                                    <ContactsIcon onClick={this.loadAllContacts} />
                                </Box>
                                <Button
                                    sx={{
                                        background: "#fa4d4d",
                                        color: "#fff",
                                        "&:hover": {
                                            background: "#fa4d4d",
                                            color: "#fff",
                                        },
                                    }}
                                    onClick={this.createGroup}
                                >
                                    <Typography>Create A Group</Typography>
                                </Button>
                            </Box>
                            <Box sx={{ textAlign: "start" }}>
                                <Typography sx={styles.slecletedName}>
                                    LoggedInUser:
                                    {currentUser && currentUser ? currentUser.name : "Guest"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={styles.chatListConversations}>
                            {allContacts &&
                                users.map((user) => (
                                    <Box key={user.uid}>
                                        <Box
                                            sx={styles.chatListConversationsListContainer}
                                            className={selectedUser.uid == user.uid ? "active" : ""}
                                            onClick={() => {
                                                // this.getSelectedUser(user.uid, user.guid);
                                                // this.loadMessages(user.uid);
                                            }}
                                        >
                                            <Box sx={styles.chatListConversationsListItemContainer}>
                                                <Avatar src={user.profile} sx={styles.imageContainer} />
                                                <Box sx={styles.messagesConatiner}>
                                                    <Typography sx={styles.name}>{user.name}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </Box>
                                ))}
                            {!allContacts &&
                                conversations.map((conversation: any) => (
                                    <Box key={conversation.uid}>
                                        <Box
                                            sx={styles.chatListConversationsListContainer}
                                            className={
                                                selectedUser.uid === conversation.uid ? "active" : ""
                                            }
                                            onClick={() => {
                                                this.loadMessages(conversation);
                                            }}
                                        >
                                            <Box sx={styles.chatListConversationsListItemContainer}>
                                                <Box sx={{ position: "relative" }}>
                                                    <Avatar
                                                        src={conversation.profile}
                                                        sx={styles.imageContainer}
                                                    />
                                                    {conversation.status === "online" && (
                                                        <FiberManualRecordIcon
                                                            sx={{
                                                                ...styles.dotStyles,
                                                                position: "absolute",
                                                                bottom: 0,
                                                                fontSize: "20px",
                                                                background: "#fff",
                                                                borderRadius: "100%",
                                                            }}
                                                        />
                                                    )}{" "}
                                                </Box>

                                                <Box sx={styles.messagesConatiner}>
                                                    <Typography sx={styles.name}>
                                                        {" "}
                                                        {conversation.name ? conversation.name : "Unknown"}
                                                    </Typography>
                                                    <Typography sx={styles.message}>
                                                        {" "}
                                                        {conversation.typing ? (
                                                            <Typography
                                                                sx={{ color: "#f04242", fontSize: "18px" }}
                                                            >
                                                                typing...
                                                            </Typography>
                                                        ) : (
                                                            conversation.lastMessage?.data?.text
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={styles.timeContainenr}>
                                                <Typography sx={styles.timeStyles}>
                                                    {new Date().toLocaleString("en-US", {
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}
                                                </Typography>
                                                <Box>
                                                    {conversation.unreadMessageCount >= 1 ? (
                                                        <Badge
                                                            sx={styles.badgeStyles}
                                                            color="error"
                                                            badgeContent={conversation.unreadMessageCount}
                                                        ></Badge>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                    {selectedUser.uid && selectedUser.uid ? (
                        <Box sx={styles.chatDescContainer}>
                            <Box sx={styles.chatDescContainerHeader}>
                                <Box sx={styles.chatDescContainerHeaderNameConatiner}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Avatar
                                            src={selectedUser.profile}
                                            sx={styles.imageContainer}
                                        />
                                        <Box>
                                            <Typography sx={styles.slecletedName}>
                                                {selectedUser.name}
                                            </Typography>
                                            <Typography sx={styles.status}>
                                                {selectedUser.status === "online" && (
                                                    <FiberManualRecordIcon sx={styles.dotStyles} />
                                                )}{" "}
                                                {selectedUser.typing && selectedUser.uid ? (
                                                    <Typography>typing....</Typography>
                                                ) : (
                                                    <Typography>{selectedUser.status}</Typography>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={styles.chatDescContainerHeaderCallsConatiner}>
                                    <Box sx={styles.iconsStyles}>
                                        <VideocamOutlinedIcon />
                                    </Box>
                                    <Box sx={styles.iconsStyles}>
                                        <PhoneOutlinedIcon />
                                    </Box>
                                    <Box sx={styles.iconsStyles}>
                                        <LogoutOutlinedIcon onClick={this.handleLogout} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={styles.divider}>
                                <Divider />
                            </Box>

                            <Box sx={styles.chatDescContainerBody}>
                                {selectedUser && messages.length > 0 ? (
                                    messages.map((message) => (
                                        <Box
                                            sx={{
                                                textAlign:
                                                    message.sender === currentUser?.uid
                                                        ? styles.sendcont
                                                        : styles.incomecont,
                                                mb: 1,
                                            }}
                                            key={messages.indexOf(message)}
                                        >
                                            <Box sx={styles.messageContainer}>
                                                <Typography
                                                    sx={{ mt: 0.5, textTransform: "capitalize" }}
                                                >
                                                    {message.text}
                                                </Typography>
                                                <Box ref={this.messageRef}></Box>
                                                {message.media && (
                                                    <img
                                                        src={message.media}
                                                        alt="Media"
                                                        width="100px"
                                                        height="100px"
                                                    />
                                                )}
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", ml: 6 }}
                                                >
                                                    {message.readBy &&
                                                        message.sender === currentUser?.uid && (
                                                            <span role="img" aria-label="read">
                                                                <DoneAllIcon sx={styles.doneRead} />
                                                            </span>
                                                        )}
                                                    {!message.readBy &&
                                                        message.sender === currentUser?.uid && (
                                                            <span role="img" aria-label="read">
                                                                <DoneAllIcon sx={styles.notDoneRead} />
                                                            </span>
                                                        )}
                                                    {new Date(message.sentAt * 1000).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                        }
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No Messages Yet</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                {this.state.showImage && this.state.mediaMessage && (
                                    <Box
                                        component="img"
                                        width="150px"
                                        src={
                                            typeof this.state.mediaMessage === "string"
                                                ? this.state.mediaMessage
                                                : URL.createObjectURL(this.state.mediaMessage)
                                        }
                                    />
                                )}
                            </Box>
                            <Box sx={styles.divider}>
                                <Divider />
                            </Box>
                            <Box sx={styles.chatDescContainerFooter}>
                                <Box sx={styles.emojiContainer}>
                                    <Box sx={styles.iconsStyles}>
                                        <TagFacesIcon />
                                    </Box>
                                    <Box>
                                        <TextField
                                            placeholder="Your message here..."
                                            sx={styles.inputStyles}
                                            value={messageText}
                                            onChange={this.handleChange}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Box sx={styles.chatDescContainerHeaderCallsConatiner}>
                                        <Box sx={styles.iconsStyles}>
                                            <input
                                                ref={this.fileInputRef}
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={this.handleImageChange}
                                            />
                                            <AttachFileOutlinedIcon
                                                onClick={this.handleImageIconClick}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                ...styles.iconsStyles,
                                                background: "#fa4d4d",
                                                color: "#fff",
                                            }}
                                        >
                                            <TelegramIcon onClick={this.sendMessage} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                flex: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "35px",
                                color: "#fa4d4d",
                            }}
                        >
                            Select a user to start chatting
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }
}

export default ChatApp;