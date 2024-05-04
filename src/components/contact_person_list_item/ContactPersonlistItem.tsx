import { Avatar, Box, Typography } from "@mui/material"
import contactPersonListItemStyles from "./ContactPersonListItem.Styles"


interface User {
    uid: string;
    name: string;
    message: string;
    profile: string;
    avatar: string;
    conversationId: string;
    status: string;
}

interface props {
    eachPersonContact: User,
    onChangeParticipantIdFunc: (participantId: string) => void,
    selected: boolean
}


const ContactPersonListItem = ({ eachPersonContact, onChangeParticipantIdFunc, selected }: props) => {

    const onClickContactPerson = (participantId: string) => {
        onChangeParticipantIdFunc(participantId)
    }


    return (
        <Box component="li" sx={{
            ...contactPersonListItemStyles.listItemPersonContact,
            backgroundColor: selected ? "#E5ECF6" : "transparent",
            borderRadius: selected ? "0px 30px 30px 0px" : "0px",
            borderBottom: selected ? "0px" : "1px solid #9e896a"
        }} onClick={() => onClickContactPerson(eachPersonContact.uid)}>
            {/* <Avatar sx={contactPersonListItemStyles.personContactProfilePic} alt="Cindy Baker" src={eachPersonContact.profile} /> */}
            <Typography sx={contactPersonListItemStyles.personContactProfilePic}>{eachPersonContact.name[0]}</Typography>
            <Box sx={contactPersonListItemStyles.personContentContainer}>
                <Box sx={contactPersonListItemStyles.personLeftContentContainer}>
                    <Typography sx={contactPersonListItemStyles.personLeftContentName}>{eachPersonContact.name}</Typography>
                    <Typography sx={contactPersonListItemStyles.personLeftContentLastMsg}>{eachPersonContact.message}</Typography>
                </Box>
                <Box sx={contactPersonListItemStyles.personRightContentContainer}>
                    <Typography sx={contactPersonListItemStyles.lastMsgTime}>{eachPersonContact.status}</Typography>
                    <Typography sx={contactPersonListItemStyles.unseenMsgsNumber}>5</Typography>
                </Box>
            </Box>
        </Box>
    )
}


export default ContactPersonListItem