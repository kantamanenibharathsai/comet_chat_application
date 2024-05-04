import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import loginStyles from "./Login.Styles";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import withRouter from "../../hoc/Hoc";

interface LoggedInUser {
    user: {
        authToken
        :
        string,
        blockedByMe
        :
        boolean,
        deactivatedAt
        :
        number,
        hasBlockedMe
        :
        boolean,
        name
        :
        string,
        role
        :
        string,
        status
        :
        string,
        uid
        :
        string
    }
}


interface IState {
    userName: string,
    uid: string,
    errorMsg: string
}

interface MyProps {
    navigate: (path: string) => void;
}

class Login extends React.Component<MyProps, IState> {
    state: IState = {
        userName: "",
        uid: "",
        errorMsg: ""
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        this.setState({ ...this.state, [name]: value });
    }


    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { uid } = this.state;
        let authKey = "d336b4662c0781d82de10fa0a659a36746592b3c";
        var UID = uid;
        CometChat.getLoggedinUser().then(
            () => {
                CometChat.login(UID, authKey).then(
                    (user: CometChat.User | any) => {
                        console.log("Login Successful:", { user });
                        const userObj = {
                            authToken: user.authToken,
                            blockedByMe: user.blockedByMe,
                            deactivatedAt: user.deactivatedAt,
                            hasBlockedMe: user.hasBlockedMe,
                            name: user.name,
                            role: user.role,
                        };
                        localStorage.setItem("userData", JSON.stringify(userObj));
                        this.props.navigate("/");
                    }, (error: CometChat.CometChatException) => {
                        console.log("Login failed with exception:", { error });
                        this.setState({
                            errorMsg: "Invalid User"
                        });
                    }
                );
            }, (error: CometChat.CometChatException) => {
                console.log("Some Error Occured", { error });
                this.setState({
                    errorMsg: "Invalid User"
                });
            }
        );
    }

    registerHereHandler = () => {
        this.props.navigate("/register");
    }

    render() {
        return (
            <Box sx={loginStyles.mainContainer}>
                <Box sx={loginStyles.registerContainer}>
                    <Typography sx={loginStyles.title}>Login</Typography>
                    <Box sx={loginStyles.formContainer} component="form" onSubmit={this.handleSubmit}>
                        <TextField id="userName" fullWidth placeholder="Enter UID" type="text"
                            sx={loginStyles.textFieldStyle}
                            onChange={this.handleInputChange}
                            name="uid"
                            value={this.state.uid}
                        />
                        <Button type="submit" disableElevation disableFocusRipple disableRipple disableTouchRipple sx={loginStyles.signupButton}>Login</Button>
                        <Typography sx={loginStyles.alreadyText}>Don't have an account? <Box component="span" onClick={this.registerHereHandler} sx={loginStyles.registerHereText}>Register here!</Box></Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
}


export default withRouter(Login);