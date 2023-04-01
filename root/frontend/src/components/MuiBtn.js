import {Button} from "@mui/material";

const minBySize = {
    minWidth: {
        xxs: 0
    },
    minHeight: {
        xxs: 0
    }
};

export default function MuiBtn(props) {
    const {
        children,
        popoverId,
        onClick,
        open,
        id,
        onMouseEnter,
        onMouseLeave,
        variant,
        size,
        hasAriaPopup,
        disableFocusRipple,
        href,
        btnType,
        p,
        m,
        type,
        fullWidth,
        styling
    } = props;

    switch (btnType) {
        case "isPopoverBtn openInNewTab":
            return (
                <Button
                    sx={minBySize}
                    p={p || 1}
                    m={m || 1}
                    disableFocusRipple={disableFocusRipple || false}
                    variant={variant || "contained"}
                    size={size || "large"}
                    id={id}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-owns={open ? popoverId : undefined}
                    aria-haspopup={hasAriaPopup || true}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {children}
                </Button>
            );

        case "isPopoverBtn":
            return (
                <Button
                    sx={minBySize}
                    p={p || 1}
                    m={m || 1}
                    disableFocusRipple={disableFocusRipple || false}
                    variant={variant || "contained"}
                    size={size || "large"}
                    id={id}
                    href={href}
                    onClick={onClick}
                    aria-owns={open ? popoverId : undefined}
                    aria-haspopup={hasAriaPopup || true}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {children}
                </Button>
            );

        case "openInNewTab":
            return (
                <Button
                    sx={minBySize}
                    p={p || 1}
                    m={m || 1}
                    disableFocusRipple={disableFocusRipple || false}
                    variant={variant || "contained"}
                    size={size || "large"}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {children}
                </Button>
            );

        case "isExternal openInNewTab":
            return (
                <a href={href} target='_blank' rel='noopener noreferrer'>
                    <Button
                        sx={minBySize}
                        p={p || 1}
                        m={m || 1}
                        disableFocusRipple={disableFocusRipple || false}
                        variant={variant || "contained"}
                        size={size || "large"}
                    >
                        {children}
                    </Button>
                </a>
            );

        default:
            return (
                <Button
                    sx={(minBySize, styling)}
                    p={p || 1}
                    m={m || 1}
                    disableFocusRipple={disableFocusRipple || false}
                    variant={variant || "contained"}
                    size={size || "large"}
                    href={href}
                    onClick={onClick}
                    type={type}
                    fullWidth={fullWidth}
                >
                    {children}
                </Button>
            );
    }
}
