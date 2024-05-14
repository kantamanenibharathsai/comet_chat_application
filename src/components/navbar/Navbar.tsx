import { Avatar, Box, IconButton, Typography } from "@mui/material"
import navbarStyles from "./Navbar.Styles"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import extendedLogo from "../../assets/extendedLogo.png"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface IState {
    isDrawerOpened: boolean
}

interface IProps {
    displayMobileUsersOrNotFunc : (isChatDisplayed : boolean) => void;
    isLeftArrowIconDisplayed: boolean;
}

const Navbar: React.FC<IProps> = ({ displayMobileUsersOrNotFunc, isLeftArrowIconDisplayed }) => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<IState["isDrawerOpened"]>(false);

    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsDrawerOpened(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenDrawer = () => {
        setIsDrawerOpened(true)
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpened(false)
    }


    const handleLeftArrowIcon = () => {
        displayMobileUsersOrNotFunc(false);
    }

    return (
        <>
            <Box sx={navbarStyles.navbarContainer}>
                <Box sx={navbarStyles.navbarChildContainer}>
                    <IconButton disableFocusRipple disableRipple disableTouchRipple onClick={handleLeftArrowIcon}>
                        {/* <MenuOutlinedIcon sx={navbarStyles.menuIcon} /> */}
                        {isLeftArrowIconDisplayed && <KeyboardArrowLeftIcon sx={navbarStyles.menuIcon}/>}
                    </IconButton>
                    <Typography sx={navbarStyles.chatText}>Chat</Typography>
                    <Avatar alt="user-profile-image" src="/static/images/avatar/3.jpg" sx={navbarStyles.userProfileImage} />
                </Box>
            </Box>

            <Box ref={drawerRef} sx={isDrawerOpened ? navbarStyles.leftContainer : navbarStyles.leftCloseContainer}>
                <IconButton onClick={handleCloseDrawer} aria-label="close" size="medium" disableFocusRipple disableRipple disableTouchRipple sx={navbarStyles.closeIconButton}>
                    <CloseIcon sx={navbarStyles.closeIcon} />
                </IconButton>
                <Box sx={navbarStyles.leftChildContainer}>
                    <Box component="img" alt="extended-logo" sx={navbarStyles.extendedLogo} src={extendedLogo} />
                    <Box sx={navbarStyles.profileContentContainer}>
                        <Avatar sx={navbarStyles.userProfileDrawerImage} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Typography sx={navbarStyles.userNameText}>Bharath Sai</Typography>
                        <Typography sx={navbarStyles.sellerText}>kantamanenibharath21@gmail.com</Typography>
                    </Box>
                    <Box component="ul" sx={navbarStyles.unorderedList}>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <HomeOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Home</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <GridViewOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Category</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <Inventory2OutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Product</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <ShoppingCartOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Cart</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <AccountCircleOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>About Us</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <HelpOutlineOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Support</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                        <Box component="li" sx={navbarStyles.listItem}>
                            <Box sx={navbarStyles.iconTextContainer}>
                                <SettingsOutlinedIcon sx={navbarStyles.listItemIcon} />
                                <Typography sx={navbarStyles.listItemText}>Settings</Typography>
                            </Box>
                            <ChevronRightOutlinedIcon sx={navbarStyles.rightArrowIcon} />
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
}


export default Navbar