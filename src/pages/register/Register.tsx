import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import registerStyles from "./Register.Styles";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import withRouter from "../../hoc/Hoc";

interface IState {
    userName: string,
    uid: string,
    successOrErrMsg: string,
}
interface MyProps {
    navigate: (path: string) => void;
}
class Register extends React.Component<MyProps, IState> {
    state: IState = {
        userName: "",
        uid: "",
        successOrErrMsg: "",
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        this.setState({ ...this.state, [name]: value });
    }


    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, uid } = this.state;
        let authKey = "d336b4662c0781d82de10fa0a659a36746592b3c";
        var UID = uid;
        var name = userName;
        var user = new CometChat.User(UID);
        user.setName(name);
        CometChat.createUser(user, authKey).then(
            user => {
                this.setState({ ...this.state, successOrErrMsg: "User created successfully" });
                setTimeout(() => {
                    this.props.navigate("/login");
                }, 2000)
            }, error => {
                this.setState({ ...this.state, successOrErrMsg: "User creation failed" });
            }
        )
    }

    loginHereHandler = () => {
        this.props.navigate("/login");
    }

    render() {
        return (
            <Box sx={registerStyles.mainContainer}>
                <Box sx={registerStyles.registerContainer}>
                    <Typography sx={registerStyles.title}>Register</Typography>
                    <Box sx={registerStyles.formContainer} component="form" onSubmit={this.handleSubmit}>
                        <TextField id="userName" fullWidth placeholder="Enter userName" type="text"
                            sx={registerStyles.textFieldStyle}
                            onChange={this.handleInputChange}
                            name="userName"
                            value={this.state.userName}
                        />
                        <TextField id="userName" fullWidth placeholder="Enter UID" type="text"
                            sx={registerStyles.textFieldStyle}
                            onChange={this.handleInputChange}
                            name="uid"
                            value={this.state.uid}
                        />
                        <Button type="submit" disableElevation disableFocusRipple disableRipple disableTouchRipple sx={registerStyles.signupButton}>Register</Button>
                        <Typography sx={registerStyles.alreadyText}>Already have an account? <Box component="span" onClick={this.loginHereHandler} sx={registerStyles.loginHereText}>Login here!</Box></Typography>
                    </Box>
                    {this.state.successOrErrMsg === "User creation failed" && <Typography sx={registerStyles.errMsg}>{this.state.successOrErrMsg}</Typography>}
                    {this.state.successOrErrMsg === "User created successfully" && <Typography sx={registerStyles.successMsg}>{this.state.successOrErrMsg}</Typography>}
                </Box>
            </Box>
        )
    }
}

export default withRouter(Register);