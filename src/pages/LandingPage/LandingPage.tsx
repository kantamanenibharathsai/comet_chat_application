import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import landingPageStyles from "./LandingPage.Styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Component } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../components/navbar/Navbar";
import "../../index.css";
import {
    CometChat,
    Conversation,
} from "@cometchat/chat-sdk-javascript";
import LogoutIcon from "@mui/icons-material/Logout";
import withRouter from "../../hoc/Hoc";
import { LoggedInUser, LeftSideUser, groupUsersList, ChatMsgsDataType, GroupMemeberInterface } from "../../typescript/data";
import AddIcon from '@mui/icons-material/Add';
interface MyProps {
    navigate: (path: string) => void;
    name: string;
}

interface Message {
    text: string | "text" | "image" | "file" | "audio";
    sender: string;
}

interface State {
    userEnteredMsg: string;
    messagesList: Message[];
    isPickerVisible: boolean;
    isChatMobileContainerDisplayed: boolean;
    imageFile: string;
    usersList: LeftSideUser[];
    loggedInUser: null | LoggedInUser;
    selectedConversation: Conversation | null;
    selectedUser: { selectedUserUid: string, typing: boolean };
    chatMsgs: ChatMsgsDataType[];
    selectedUserUid: string;
    openModal: boolean;
    groupUID: string;
    groupName: string;
    checkBoxes: string[];
    addGroupMembers: string[];
    groupMembersArray: GroupMemeberInterface[];
    groupMsgsArray: ChatMsgsDataType[];
    isGroupOrNot: boolean
}

type EmojiEvent = {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    emoticons: string[];
    shortcodes: string[];
};


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};


class LandingPage extends Component<MyProps, State> {
    typingRef: NodeJS.Timer | null;


    constructor(props: MyProps) {
        super(props);
        // console.log("constructor method called");
        this.state = {
            userEnteredMsg: "",
            messagesList: [],
            isPickerVisible: false,
            isChatMobileContainerDisplayed: false,
            imageFile: "",
            usersList: [],
            loggedInUser: null,
            selectedConversation: null,
            selectedUser: { selectedUserUid: "", typing: false },
            chatMsgs: [],
            selectedUserUid: "",
            openModal: false,
            groupUID: "",
            groupName: "",
            checkBoxes: [],
            addGroupMembers: [],
            groupMembersArray: [],
            groupMsgsArray: [],
            isGroupOrNot: false
        };
        this.typingRef = null;

    }

    fetchLoggedInUser = async () => {
        try {
            const user = await CometChat.getLoggedinUser();
            if (user !== null) {
                this.setState({
                    loggedInUser: {
                        authToken: user.getAuthToken(),
                        blockedByMe: user.getBlockedByMe(),
                        deactivatedAt: user.getDeactivatedAt(),
                        hasBlockedMe: user.getHasBlockedMe(),
                        lastActiveAt: user.getLastActiveAt(),
                        name: user.getName(),
                        role: user.getRole(),
                        status: user.getStatus(),
                        uid: user.getUid(),
                    },
                    addGroupMembers: [...this.state.addGroupMembers, user.getUid()]
                }, () => {
                    console.log("logged in user", this.state.loggedInUser?.uid);
                    this.addTypingIndicatorListener(this.state.loggedInUser?.uid);
                });
            }
        } catch (error) { }
    };

    getConversations = async () => {
        try {
            let conversationsRequest = new CometChat.ConversationsRequestBuilder()
                .setLimit(30)
                .build();
            const conversationList = await conversationsRequest.fetchNext() as LeftSideUser[];
            console.log("vcnvbnm", conversationList);
            this.setState({ usersList: conversationList });
        } catch (error) { }
    };

    receiveMessages = () => {
        const MESSAGE_lISTENER_ID = this.state.selectedUserUid;
        console.log(MESSAGE_lISTENER_ID);
        CometChat.addMessageListener(
            MESSAGE_lISTENER_ID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage: ChatMsgsDataType) => {
                    // console.log(`text msg received ${textMessage.receiverType}`);
                    if (textMessage.receiverType === "user") {
                        this.setState((prevState) => ({
                            chatMsgs: [...prevState.chatMsgs, textMessage],
                        }));
                    }
                    else {
                        this.setState((prevState) => ({
                            groupMsgsArray: [...prevState.groupMsgsArray, textMessage],
                        }));
                    }
                },
                onMediaMessageReceived: (mediaMessage: ChatMsgsDataType) => {
                    if (mediaMessage.receiverType === "user") {
                        this.setState((prevState) => ({
                            chatMsgs: [...prevState.chatMsgs, mediaMessage],
                        }));
                    }
                    else {
                        this.setState((prevState) => ({
                            groupMsgsArray: [...prevState.groupMsgsArray, mediaMessage],
                        }))
                    }
                },
            })
        );
    };


    addTypingIndicatorListener = async (uid: string | undefined) => {
        if (uid) {
            const selectedUserUid: string = uid;
            console.log("addTypingIndicatorListener", selectedUserUid);
            CometChat.addMessageListener(
                selectedUserUid,
                new CometChat.MessageListener({
                    onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
                        console.log("Typing started...", typingIndicator);
                        const leftSideUsersData = this.state.usersList.map(
                            (item: LeftSideUser) => {
                                if (item.conversationWith.uid === typingIndicator.getSender().getUid()) {
                                    return { ...item, typing: true };
                                } else {
                                    return item;
                                }
                            }
                        );
                        if (
                            this.state.loggedInUser?.uid === typingIndicator.getSender().getUid()
                        ) {
                            this.setState((prevState) => ({
                                selectedUser: {
                                    ...prevState.selectedUser,
                                    typing: true,
                                },
                            }));
                        }
                        this.setState({ usersList: leftSideUsersData });
                    },
                    onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
                        console.log("Typing ended...", typingIndicator);
                        const leftSideUsersData = this.state.usersList.map(
                            (item: LeftSideUser) => {
                                if (item.conversationWith.uid === typingIndicator.getSender().getUid()) {
                                    return { ...item, typing: false };
                                } else {
                                    return item;
                                }
                            }
                        );
                        if (
                            this.state.loggedInUser?.uid === typingIndicator.getSender().getUid()
                        ) {
                            this.setState((prevState) => ({
                                selectedUser: {
                                    ...prevState.selectedUser,
                                    typing: false,
                                },
                            }));
                        }
                        this.setState({ usersList: leftSideUsersData });
                    },
                })
            );
        }
    };

    componentDidMount() {
        console.log("componentDidMount method called");
        this.fetchLoggedInUser();
        this.getConversations();
        this.receiveMessages();
    }


    // static getDerivedStateFromProps(nextProps: any, prevState: State) {
    //     if (prevState.selectedUserUid) {
    //         return {
    //             selectedUserUid: nextProps.selectedUserUid,
    //             selectedUser: nextProps.selectedUser,
    //         };
    //     }
    //     return null;
    // }


    startTyping = () => {
        const receiverId: string = this.state.selectedUserUid;
        console.log("starttyping", receiverId);
        const receiverType: string = CometChat.RECEIVER_TYPE.USER;
        const typingNotification: CometChat.TypingIndicator =
            new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.startTyping(typingNotification);
    };

    stopTyping = () => {
        let receiverId: string = this.state.selectedUserUid;
        console.log("stopyping", receiverId);
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

    onChangeMsgInputElement = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userEnteredMsg: event.target.value });
        this.startTyping();
        this.typingDebounce(1000)();
    };

    onChangeParticipantIdFunc = (participantId: string) => {
        this.setState({ selectedUserUid: participantId, isChatMobileContainerDisplayed: true });
    };

    onClickEmojiIconButtonHandler = () => {
        this.setState({ isPickerVisible: !this.state.isPickerVisible });
    };

    onEmojiSelectEventHandler = (event: EmojiEvent) => {
        this.setState({
            userEnteredMsg: event.native,
            isPickerVisible: !this.state.isPickerVisible,
        });
    };

    sendMessage = async () => {
        try {
            let receiverID: string = this.state.selectedUserUid;
            let messageText: string = this.state.userEnteredMsg;
            let receiverType: string = CometChat.RECEIVER_TYPE.USER;
            let textMessage: CometChat.TextMessage = new CometChat.TextMessage(
                receiverID,
                messageText,
                receiverType
            );
            const message = await CometChat.sendMessage(textMessage)
            if (message) {
                this.setState({ chatMsgs: [...this.state.chatMsgs, JSON.parse(JSON.stringify(message))], userEnteredMsg: "" });
            }
        } catch (error) { }
    };

    sendGroupMsg = async () => {
        try {
            let receiverID: string = this.state.selectedUserUid;
            let messageText: string = this.state.userEnteredMsg;
            let receiverType: string = CometChat.RECEIVER_TYPE.GROUP;
            let textMessage: CometChat.TextMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);
            const message = await CometChat.sendMessage(textMessage);
            console.log("Message sent successfully:", message);
            this.setState({ groupMsgsArray: [...this.state.groupMsgsArray, JSON.parse(JSON.stringify(message))], userEnteredMsg: "" });
        } catch (error) {
            console.log("Message sending failed with error:", error);
        }
    }


    fetchMessages = async (receiverID: string) => {
        this.receiveMessages();
        this.setState({ isGroupOrNot: false, selectedUser: { ...this.state.selectedUser, selectedUserUid: receiverID } });
        try {
            // let UID: string = receiverID.lastIndexOf("_") !== -1 ? receiverID.substring(receiverID.lastIndexOf("_") + 1) : receiverID
            this.setState({ selectedUserUid: receiverID, isChatMobileContainerDisplayed: true });
            let limit: number = 30;
            let messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
                .setUID(receiverID)
                .setLimit(limit)
                .build();
            const messages = (await messagesRequest.fetchPrevious()) as State["chatMsgs"];
            // console.log(messages)
            this.setState({ chatMsgs: messages, groupMsgsArray: [] });
        } catch (error) {
            //  console.log("messages failed to fetch ")
        }
    }


    sendMediaMessageAsync = async () => {
        try {
            const inputFile: HTMLInputElement | null = document.getElementById(
                "fileInput"
            ) as HTMLInputElement;
            if (!inputFile) {
                throw new Error("Input file element not found.");
            }
            const file = inputFile.files?.[0].type;
            if (!file) {
                throw new Error("No file selected.");
            }
            let receiverID: string = this.state.selectedUserUid;
            let messageType = CometChat.MESSAGE_TYPE.AUDIO;
            let receiverType = !this.state.isGroupOrNot ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE.GROUP;
            let mediaMessage = new CometChat.MediaMessage(
                receiverID,
                file,
                messageType,
                receiverType
            );
            await CometChat.sendMediaMessage(mediaMessage);
            if (!this.state.isGroupOrNot) this.fetchMessages(receiverID);
            else this.fetchGroupMsgs(receiverID);
            this.setState({ imageFile: "" });
        } catch (error) {
        }
    };

    onClickSendIconButtonHandler = () => {
        this.sendMessage();
    };

    onClickSendGroupIconBtnHandler = () => {
        this.sendGroupMsg();
    }

    handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ imageFile: reader.result as string });
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };

    onClickImageIconButtonHandler = () => {
        document.getElementById("fileInput")?.click();
    };

    onClickUploadImageContainer = () => {
        this.setState({ imageFile: "" });
    };

    onClickSendIconImageButtonHandler = () => {
        if (this.state.imageFile) {
            this.sendMediaMessageAsync();
        }
    };

    logoutIconEventHandler = () => {
        CometChat.logout();
        this.props.navigate("/login");
    };


    displayMsgFunction = (message: ChatMsgsDataType) => {
        switch (message.type) {
            case "file":
                if (message.data.attachments) {
                    switch (message.data.attachments[0].extension) {
                        case "mp3":
                            return (
                                <audio controls>
                                    <source src={message.data.attachments[0].url} type="audio/mpeg" />
                                </audio>
                            );
                        case "mp4":
                            return (
                                <video controls width="300" height="300">
                                    <source src={message.data.attachments[0].url} type="video/mp4" />
                                </video>
                            );
                        default:
                            return <Box sx={landingPageStyles.image} alt="image" component={"img"} src={message.data.url} />;
                    }
                } else {
                    return <Box sx={landingPageStyles.image} alt="image" component={"img"} src={message.data.url} />;
                }
            default:
                return <Typography sx={{ ...landingPageStyles.msgText, color: this.state.isGroupOrNot === false ? ((this.state.loggedInUser && this.state.loggedInUser.uid) === message.receiverId ? "#000" : "#fff") : (this.state.loggedInUser && this.state.loggedInUser.uid) === message.sender.uid ? "#fff" : "#000" }}>{message.data.text?.slice(0, 200)}</Typography>;
        }
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<MyProps>, prevState: Readonly<State>) {
        //  console.log("getSnapShotBeforeUpdate method called");
        if (prevState.chatMsgs !== this.state.chatMsgs || prevState.groupMsgsArray !== this.state.groupMsgsArray) {
            if (!this.state.isGroupOrNot) return this.state.chatMsgs;
            else return this.state.groupMsgsArray;
        }
        return null;
    }


    componentDidUpdate(prevProps: MyProps, prevState: State, snapshot: ChatMsgsDataType | null) {
        // console.log("snapshot", snapshot);
        console.log("componentDidUpdate method called");
        if (snapshot) {
            const chatContainer = document.getElementById("chatContainer");
            if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }


    openModalFunc = () => {
        this.setState({
            openModal: true,
        });
    };

    closeModalFunc = () => {
        this.setState({
            openModal: false,
        });
    };

    groupUIDHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ groupUID: e.target.value });
    }

    groupNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ groupName: e.target.value });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            this.setState({
                addGroupMembers: [...this.state.addGroupMembers, event.target.value]
            })
        }
    }

    displayMobileUsersOrNotFunc = (isChatDisplayed: boolean) => {
        this.setState({ isChatMobileContainerDisplayed: isChatDisplayed });
    }

    handleCreateGroup = async () => {
        const { groupUID, groupName, addGroupMembers } = this.state;
        var group = new CometChat.Group(
            groupUID,
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
            //  console.log("Group created successfully:", createdGroup);
        } catch (error) {
            //  console.log("Group creation failed with exception:", error);
        }
    };


    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.handleCreateGroup();
        this.closeModalFunc();
    }


    fetchGroupMembers = async (groupId: string) => {
        try {
            let GUID: string = groupId;
            let limit: number = 30;
            let groupMembersRequest: CometChat.GroupMembersRequest = new CometChat.GroupMembersRequestBuilder(GUID)
                .setLimit(limit)
                .build();
            const groupMembers: CometChat.GroupMember[] = await groupMembersRequest.fetchNext();
            console.log("Group Member list fetched successfully:", groupMembers as GroupMemeberInterface);
            this.setState({ groupMembersArray: JSON.parse(JSON.stringify(groupMembers)) });
            return groupMembers;
        } catch (error) {
            // Handle error
            console.log("Group Member list fetching failed with exception:", error);
        }
    }


    fetchGroupMsgs = async (groupId: string) => {
        this.setState({ isGroupOrNot: true, selectedUserUid: groupId, });
        // this.setState({ isGroupOrNot: false, selectedUser : {...this.state.selectedUser, selectedUserUid : groupId} });
        try {
            await this.fetchGroupMembers(groupId);
            this.setState({ isChatMobileContainerDisplayed: true });
            let GUID: string = groupId;
            let limit: number = 30;
            let messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
                .setGUID(GUID)
                .setLimit(limit)
                .build();
            const messages: CometChat.BaseMessage[] = await messagesRequest.fetchPrevious();
            console.log("Group Messages list fetched:", messages);
            this.setState({ groupMsgsArray: JSON.parse(JSON.stringify(messages)), chatMsgs: [] });
        } catch (error) {
            console.log("Message fetching failed with error:", error);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<MyProps>, nextState: Readonly<State>, nextContext?: any): boolean {
        console.log("shouldComponentUpdate method called")
        console.log(nextState.chatMsgs.length, this.state.chatMsgs.length);
        if (nextState.chatMsgs !== this.state.chatMsgs) {
            return true;
        }
        return true;
    }



    render() {
        //   console.log("render method called")
        console.log("this.props", this.props);
        return (<>
            <Box sx={landingPageStyles.mainContainer}>
                <Box sx={landingPageStyles.childContainer}>
                    <Navbar displayMobileUsersOrNotFunc={this.displayMobileUsersOrNotFunc} isLeftArrowIconDisplayed={this.state.isChatMobileContainerDisplayed} />
                    <Box sx={landingPageStyles.rightContainer}>
                        <Box sx={landingPageStyles.rightChildContainer}>
                            <Box sx={landingPageStyles.rightNavContainer}>
                                <Box onClick={this.openModalFunc} sx={landingPageStyles.profileIconContainer}>
                                    <AddIcon sx={landingPageStyles.profileIcon} />
                                    <Typography sx={landingPageStyles.chatText}>Group</Typography>
                                </Box>
                                <Box sx={landingPageStyles.searchInputNotificationContainer}>
                                    {/* <Box sx={landingPageStyles.searchInputContainer}>
                                        <CiSearch className="search-icon" />
                                        <Box
                                            component="input"
                                            sx={landingPageStyles.inputElement}
                                            placeholder="Search"
                                        />
                                    </Box> */}
                                    <Typography sx={landingPageStyles.LoginUID}>LoginUID: <Box component="span" sx={landingPageStyles.selectedUserUid}>{this.state.loggedInUser?.uid}</Box></Typography>
                                    <LogoutIcon
                                        sx={landingPageStyles.logoutIcon}
                                        onClick={this.logoutIconEventHandler}
                                    />
                                </Box>
                            </Box>
                            <Box sx={landingPageStyles.rightBodyContainer}>
                                <Box
                                    sx={{
                                        ...landingPageStyles.leftSearchContactsContainer,
                                        display: this.state.isChatMobileContainerDisplayed
                                            ? { xs: "none", lg: "flex" }
                                            : { xs: "flex", lg: "flex" },
                                    }}
                                >
                                    {/* <TextField
                                        placeholder="search"
                                        sx={landingPageStyles.textFieldStyle}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={landingPageStyles.searchIcon} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    /> */}
                                    <Box
                                        component="ul"
                                        sx={landingPageStyles.contactsPersonsListContainer}
                                    >
                                        {this.state.usersList.map((eachPersonContact) => (
                                            <Box
                                                sx={{ ...landingPageStyles.listItemContainer, backgroundColor: eachPersonContact.conversationWith?.uid ? (this.state.selectedUserUid === eachPersonContact.conversationWith.uid ? "#e6e6e6" : "transparent") : this.state.selectedUserUid === eachPersonContact.conversationWith?.guid ? "#e6e6e6" : "transparent" }}
                                                onClick={() => eachPersonContact.conversationWith?.guid ? this.fetchGroupMsgs(eachPersonContact.conversationWith.guid) : this.fetchMessages(eachPersonContact.conversationWith?.uid)}
                                                component="li"
                                                key={this.state.usersList.indexOf(eachPersonContact)}
                                            >
                                                <Stack direction={"row"} alignItems={"flex-start"} gap={1}>
                                                    <Avatar src={eachPersonContact.conversationWith.avatar} />
                                                    <Stack>
                                                        <Typography>{eachPersonContact.conversationWith.name}</Typography>
                                                        {(eachPersonContact.lastMessage?.text && !eachPersonContact?.typing) && (<Typography sx={landingPageStyles.lastMessageTextStyle}>{eachPersonContact.lastMessage?.text}</Typography>)}
                                                        {/* {eachPersonContact.lastMessage.data?.attachments && eachPersonContact.lastMessage.data?.attachments[0].extension === "png" && <Stack direction={"row"} alignItems={"center"} gap={1}>
                                                            <Box component={"img"} src={eachPersonContact.lastMessage.data?.attachments[0].url} width={20} height={20} alt={"image"} />
                                                            <Typography>Photo</Typography>
                                                        </Stack>} */}
                                                        {eachPersonContact?.typing === true && (<Typography sx={landingPageStyles.lastMessageTextStyle}>Typing...</Typography>)}
                                                    </Stack>
                                                </Stack>
                                                <Typography>{new Date(eachPersonContact.lastMessage?.sentAt * 1000).toLocaleString('en-US',
                                                    { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        ...landingPageStyles.rightChartParentContainer,
                                        display: this.state.isChatMobileContainerDisplayed
                                            ? { xs: "flex" }
                                            : { xs: "none", lg: "flex" },
                                    }}
                                >
                                    <Box sx={landingPageStyles.loggedInUserContainer}>
                                        <Box
                                            sx={landingPageStyles.loggedInUserProfileContentContainer}
                                        >
                                            <Box sx={landingPageStyles.personContentContainer}>
                                                <Stack direction={"row"} gap={2.0} alignItems={"center"}>
                                                    {this.state.usersList.find(eachUser => eachUser.conversationWith?.uid === this.state.selectedUserUid)?.conversationWith.avatar &&
                                                        <Avatar src={this.state.usersList.find(eachUser => eachUser.conversationWith?.uid === this.state.selectedUserUid)?.conversationWith.avatar} />}
                                                    {this.state.usersList.find(eachUser => eachUser.conversationWith?.guid === this.state.selectedUserUid)?.conversationWith.avatar &&
                                                        <Avatar src={this.state.usersList.find(eachUser => eachUser.conversationWith?.guid === this.state.selectedUserUid)?.lastMessage.actionOn?.avatar} />
                                                    }
                                                    <Stack direction={"column"} gap={0} alignItems={"flex-start"}>
                                                        {this.state.usersList.find(eachUser => eachUser.conversationWith?.guid === this.state.selectedUserUid)?.conversationWith.name &&
                                                            <Typography sx={landingPageStyles.personContentName}>
                                                                {this.state.usersList.find(eachUser => eachUser.conversationWith.guid === this.state.selectedUserUid)?.conversationWith.name}
                                                            </Typography>}
                                                        {this.state.usersList.find(eachUser => eachUser.conversationWith?.uid === this.state.selectedUserUid)?.conversationWith.name &&
                                                            <Typography sx={landingPageStyles.personContentName}>
                                                                {this.state.usersList.find(eachUser => eachUser.conversationWith.uid === this.state.selectedUserUid)?.conversationWith.name}
                                                            </Typography>}
                                                        {((this.state.usersList.find(eachUser => eachUser.typing === true) === undefined) && this.state.usersList.find(eachUser => eachUser.conversationWith?.uid === this.state.selectedUserUid)?.conversationWith.status)
                                                            && (<Typography sx={landingPageStyles.personContentLastMsg}>
                                                                {this.state.usersList.find(eachUser => eachUser.conversationWith.uid === this.state.selectedUserUid)?.conversationWith.status}
                                                            </Typography>)}
                                                        {this.state.usersList.find(eachUser => eachUser.typing === true)?.typing
                                                            && (<Typography sx={landingPageStyles.personContentLastMsg}>
                                                                Typing...</Typography>
                                                            )}
                                                        {/* {this.state.usersList.find(eachUser => eachUser.conversationWith?.guid === this.state.selectedUserUid)?.conversationWith.membersCount
                                                            && (<Typography sx={landingPageStyles.personContentLastMsg}>
                                                                members count : {this.state.usersList.find(eachUser => eachUser.conversationWith.guid === this.state.selectedUserUid)?.conversationWith.membersCount}
                                                            </Typography>)} */}
                                                        {(this.state.groupMembersArray.length > 0 && (this.state.usersList.find(eachUser => eachUser.conversationWith?.guid === this.state.selectedUserUid)) && (
                                                            <Stack direction={"row"} gap={1} alignItems={"center"}>
                                                                {this.state.groupMembersArray.map((eachMember) => (
                                                                    <Typography key={this.state.groupMembersArray.indexOf(eachMember)}>{eachMember.name},</Typography>
                                                                ))}
                                                            </Stack>
                                                        ))}
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            disableFocusRipple
                                            disableRipple
                                            disableTouchRipple
                                            color="primary"
                                        >
                                            <MoreHorizIcon sx={landingPageStyles.moreHorizIcon} />
                                        </IconButton>
                                    </Box>
                                    {this.state.isPickerVisible && (
                                        <Box sx={landingPageStyles.pickerContainer}>
                                            <Picker
                                                style={{ width: "100%" }}
                                                theme="light"
                                                data={data}
                                                previewPosition="none"
                                                onEmojiSelect={this.onEmojiSelectEventHandler}
                                            />
                                        </Box>
                                    )}
                                    <Box sx={landingPageStyles.chartBodyContainer}>
                                        {this.state.chatMsgs.length === 0 && (
                                            <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} height={"inherit"}>
                                                <Typography sx={landingPageStyles.noChatMsg}>No Chat Msgs Are Displayed</Typography>
                                            </Stack>
                                        )}
                                        <Box
                                            id="chatContainer"
                                            component="ul"
                                            sx={{
                                                ...landingPageStyles.chartContainer,
                                                height: this.state.imageFile
                                                    ? { xs: "400px", lg: "300px", xl: "300px" }
                                                    : { xs: "500px", lg: "300px", xl: "200px" },
                                            }}
                                        >
                                            {this.state.chatMsgs.length > 0 && (this.state.chatMsgs.map((eachMessage: ChatMsgsDataType, index: number) => {
                                                //  console.log("eachMessage", eachMessage);
                                                return (
                                                    <Box key={index} sx={landingPageStyles.chartMsgsContainer}>
                                                        {(this.state.loggedInUser && this.state.loggedInUser.uid) !== eachMessage.receiverId && (<Box component="li" sx={landingPageStyles.chartMsgSendListItem} alignSelf={"flex-end"}>
                                                            {this.displayMsgFunction(eachMessage)}
                                                            <Typography sx={landingPageStyles.chartMsgTime}>{new Date(eachMessage.sentAt * 1000).toLocaleString('en-US',
                                                                { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                                                        </Box>)}
                                                        {(this.state.loggedInUser && this.state.loggedInUser.uid) === eachMessage.receiverId && (<Box component="li" sx={landingPageStyles.chartMsgRecieveListItem} alignSelf={"flex-start"}>
                                                            {this.displayMsgFunction(eachMessage)}
                                                            <Typography sx={{ ...landingPageStyles.chartMsgTime, color: "#00000" }}>{new Date(eachMessage.sentAt * 1000).toLocaleString('en-US',
                                                                { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                                                        </Box>)}
                                                    </Box >)
                                            }))}
                                            {this.state.groupMsgsArray.length > 0 && (this.state.groupMsgsArray.map((eachMessage: ChatMsgsDataType, index: number) => {
                                                console.log("eachMessage", eachMessage);
                                                return (
                                                    <Box key={index} sx={landingPageStyles.chartMsgsContainer}>
                                                        {(this.state.loggedInUser && this.state.loggedInUser.uid) === eachMessage.sender.uid && (<Box component="li" sx={landingPageStyles.chartMsgSendListItem} alignSelf={"flex-end"}>
                                                            {this.displayMsgFunction(eachMessage)}
                                                            <Typography sx={landingPageStyles.chartMsgTime}>{new Date(eachMessage.sentAt * 1000).toLocaleString('en-US',
                                                                { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                                                        </Box>)}
                                                        {(this.state.loggedInUser && this.state.loggedInUser.uid) !== eachMessage.sender.uid && (<Box component="li" sx={landingPageStyles.chartMsgRecieveListItem} alignSelf={"flex-start"}>
                                                            {this.displayMsgFunction(eachMessage)}
                                                            <Typography sx={{ ...landingPageStyles.chartMsgTime, color: "#00000" }}>{new Date(eachMessage.sentAt * 1000).toLocaleString('en-US',
                                                                { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                                                        </Box>)}
                                                    </Box >)
                                            }))}
                                        </Box>
                                        <Box sx={landingPageStyles.textFieldImageContainer}>
                                            <TextField
                                                fullWidth
                                                sx={landingPageStyles.rightBottomMsgInputContainer}
                                                placeholder="Type message"
                                                onChange={this.onChangeMsgInputElement}
                                                value={this.state.userEnteredMsg}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton
                                                                disableFocusRipple
                                                                disableRipple
                                                                disableTouchRipple
                                                                onClick={this.onClickImageIconButtonHandler}
                                                            >
                                                                <Box
                                                                    component="input"
                                                                    type="file"
                                                                    display={"none"}
                                                                    id="fileInput"
                                                                    onChange={this.handleImageChange}
                                                                />
                                                                <ImageOutlinedIcon
                                                                    sx={{
                                                                        ...landingPageStyles.searchIcon,
                                                                        ...landingPageStyles.ImageOutlinedIcon,
                                                                    }}
                                                                />
                                                            </IconButton>
                                                            <IconButton
                                                                disableFocusRipple
                                                                disableRipple
                                                                disableTouchRipple
                                                                onClick={this.onClickEmojiIconButtonHandler}
                                                            >
                                                                <SentimentSatisfiedAltOutlinedIcon
                                                                    sx={landingPageStyles.searchIcon}
                                                                />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {!this.state.imageFile && (
                                                                <IconButton
                                                                    disableFocusRipple
                                                                    disableRipple
                                                                    disableTouchRipple
                                                                    onClick={this.state.usersList.find(eachUserOrGroup => eachUserOrGroup.conversationType === "group" && eachUserOrGroup.conversationWith.guid === this.state.selectedUserUid) ? this.onClickSendGroupIconBtnHandler : this.onClickSendIconButtonHandler}
                                                                    disabled={this.state.userEnteredMsg === ""}
                                                                    sx={landingPageStyles.sendIconButton}
                                                                >
                                                                    <SendOutlinedIcon
                                                                        sx={landingPageStyles.searchIcon}
                                                                    />
                                                                </IconButton>
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            {this.state.imageFile && (
                                                <Box
                                                    sx={landingPageStyles.uploadImageContainer}
                                                    onClick={this.onClickUploadImageContainer}
                                                >
                                                    <Box
                                                        component={"img"}
                                                        src={this.state.imageFile}
                                                        sx={landingPageStyles.uploadImage}
                                                    />
                                                    <Box sx={landingPageStyles.circleWhite}>
                                                        <CloseIcon />
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                        {this.state.imageFile && (
                                            <Box sx={landingPageStyles.circleWhiteSend}>
                                                <IconButton
                                                    sx={landingPageStyles.sendIconButton}
                                                    disableFocusRipple
                                                    disableRipple
                                                    disableTouchRipple
                                                    onClick={this.onClickSendIconImageButtonHandler}
                                                    disabled={this.state.imageFile === ""}
                                                >
                                                    <SendOutlinedIcon sx={landingPageStyles.searchIcon} />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={this.state.openModal}
                onClose={this.closeModalFunc}
            >
                <Box sx={style}>
                    <Stack direction={"column"} gap={"14px"}>
                        <TextField placeholder="group UID" onChange={this.groupUIDHandler} value={this.state.groupUID} />
                        <TextField placeholder="group Name" onChange={this.groupNameHandler} value={this.state.groupName} />
                        <Stack direction={"column"} gap={"10px"}>
                            <Box component={"form"} onSubmit={this.handleSubmit}>
                                {groupUsersList.map(eachPerson => (
                                    <FormGroup key={eachPerson.personUID}>
                                        <FormControlLabel
                                            key={eachPerson.personUID}
                                            control={
                                                <Checkbox onChange={this.handleChange} name={eachPerson.personName} value={eachPerson.personUID} />
                                            }
                                            label={eachPerson.personName}
                                        />
                                    </FormGroup>
                                ))}
                                <Button type="submit" fullWidth variant="contained">Create Group</Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
        );
    }
}

export default withRouter(LandingPage);
