import * as React from "react";
import {Stack, Snackbar, IconButton, Slide} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function MuiSnackbar(props) {
    const {
        children,
        closeOnClickaway,
        autoHideDuration,
        severity,
        width,
        open,
        setOpen,
        horizontalAnchorOrigin,
        verticalAnchorOrigin,
        isTransition,
        transitionDirection
    } = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway" && !closeOnClickaway) {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Stack spacing={2} sx={{width: width || "100%"}}>
            {isTransition ? (
                <Slide
                    direction={transitionDirection || "left"}
                    in={open}
                    mountOnEnter
                    unmountOnExit
                >
                    <Snackbar
                        open={open}
                        autoHideDuration={autoHideDuration || 6000}
                        onClose={handleClose}
                        action={action}
                        severity={severity}
                        anchorOrigin={{
                            horizontal: horizontalAnchorOrigin || "center",
                            vertical: verticalAnchorOrigin || "bottom"
                        }}
                    >
                        <Alert onClose={handleClose} severity={severity}>
                            {children}
                        </Alert>
                    </Snackbar>
                </Slide>
            ) : (
                <Snackbar
                    open={open}
                    autoHideDuration={autoHideDuration || 6000}
                    onClose={handleClose}
                    action={action}
                    severity={severity}
                    anchorOrigin={{
                        horizontal: horizontalAnchorOrigin || "center",
                        vertical: verticalAnchorOrigin || "bottom"
                    }}
                >
                    <Alert onClose={handleClose} severity={severity}>
                        {children}
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    );
}
