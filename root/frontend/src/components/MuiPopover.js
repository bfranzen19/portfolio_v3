import {Popover} from "@mui/material";

export default function MuiPopover(props) {
    const {
        children,
        id,
        anchorOriginVerical = "bottom",
        anchorOriginHorizontal = "left",
        transformOriginVertical = "top",
        transformOriginHorizontal = "right",
        open,
        anchorEl,
        onClose
    } = props;

    return (
        <Popover
            id={id}
            sx={{
                pointerEvents: "none"
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: anchorOriginVerical,
                horizontal: anchorOriginHorizontal
            }}
            transformOrigin={{
                vertical: transformOriginVertical,
                horizontal: transformOriginHorizontal
            }}
            onClose={onClose}
            disableRestoreFocus
        >
            {children}
        </Popover>
    );
}
