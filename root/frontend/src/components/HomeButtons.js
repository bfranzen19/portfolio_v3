import * as React from "react";
import {Typography, Box} from "@mui/material";
import MuiPopover from "../components/MuiPopover";
import MuiSnackbar from "./MuiSnackbar";
import MuiBtn from "./MuiBtn";
import {FaIcon} from "../assets/icons/icons";

export default function HomeButtons() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElcopy, setAnchorElcopy] = React.useState(null);
    const [toastOpen, setToastOpen] = React.useState(false);

    const copyText = (event) => {
        navigator.clipboard.writeText(event.currentTarget.id);
        setToastOpen(true);
    };

    const handlePopoverOpen = (event) => {
        event.currentTarget.id.includes("@")
            ? setAnchorElcopy(event.currentTarget)
            : setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = (event) => {
        event.currentTarget.id.includes("@")
            ? setAnchorElcopy(null)
            : setAnchorEl(null);
    };

    const openCopy = Boolean(anchorElcopy);
    const open = Boolean(anchorEl);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            <MuiSnackbar
                closeOnClickaway
                open={toastOpen}
                setOpen={setToastOpen}
                autoHideDuration={3000}
                severity='info'
                horizontalAnchorOrigin='center'
                verticalAnchorOrigin='bottom'
                isTransition={true}
                transitionDirection='left'
            >
                {"Email successfully copied!"}
            </MuiSnackbar>
            <MuiBtn
                size={"small"}
                disableFocusRipple
                btnType='isPopoverBtn'
                variant='text'
                id='franzenbt@gmail.com'
                onClick={copyText}
                open={openCopy}
                popoverId='copy-email-popover'
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <FaIcon size={"2xl"} iconName={"envelope"} />
                <MuiPopover
                    id='copy-email-popover'
                    anchorOriginVerical='bottom'
                    anchorOriginHorizontal='left'
                    transformOriginVertical='top'
                    transformOriginHorizontal='left'
                    open={openCopy}
                    anchorEl={anchorElcopy}
                    onClose={handlePopoverClose}
                >
                    <Typography sx={{p: 1}}>Copy Email Address</Typography>
                </MuiPopover>
            </MuiBtn>
            <MuiBtn
                disableFocusRipple
                btnType='isPopoverBtn openInNewTab'
                variant='text'
                id='email-link'
                href='mailto: franzenbt@gmail.com?subject=Hi, BT!'
                open={open}
                popoverId='send-email-popover'
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <FaIcon size={"2xl"} iconName={"paperPlane"} />
                <MuiPopover
                    id='send-email-popover'
                    anchorOriginVerical='bottom'
                    anchorOriginHorizontal='left'
                    transformOriginVertical='top'
                    transformOriginHorizontal='left'
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                >
                    <Typography sx={{p: 1}}>Send Email</Typography>
                </MuiPopover>
            </MuiBtn>

            <MuiBtn
                disableFocusRipple
                btnType='isExternal openInNewTab'
                href='https://twitter.com'
                variant='text'
            >
                <FaIcon size={"2xl"} iconName={"twitter"} />
            </MuiBtn>

            <MuiBtn
                disableFocusRipple
                btnType='isExternal openInNewTab'
                href='https://github.com'
                variant='text'
            >
                <FaIcon size={"2xl"} iconName={"github"} />
            </MuiBtn>

            <MuiBtn
                disableFocusRipple
                btnType='isExternal openInNewTab'
                href='https://linkedin.com'
                variant='text'
            >
                <FaIcon size={"2xl"} iconName={"linkedin"} />
            </MuiBtn>
        </Box>
    );
}
