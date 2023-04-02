import * as React from "react";
import HomeButtons from "../components/HomeButtons";
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    Stack,
    Divider,
    Box
} from "@mui/material";

const DynamicButtons = (props) => {
    if (props.buttonType === "home") {
        return <HomeButtons />;
    }
};

const cardMins = {
    minWidth: {
        xxs: "40vw",
        xs: "50vw"
    },
    minHeight: {
        xxs: "30vw",
        xs: "35vh"
    }
};

export default function MuiCard(props) {
    const {
        includeMedia,
        maxWidth,
        maxHeight,
        imgHeight,
        imgSrc,
        altText,
        titleVariant,
        titleColor,
        title,
        bodyVariant,
        bodyColor,
        body,
        includeActionButtons,
        bottomButtonType,
        buttonJustification,
        buttonDirection
    } = props;

    return (
        <Card
            raised
            sx={{
                maxWidth: maxWidth || "80vw",
                maxHeight: maxHeight || "85vh",
                borderRadius: "10px",
                overflowY: "scroll"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {includeMedia && (
                    <CardMedia
                        component='img'
                        height={imgHeight || "60vh"}
                        image={imgSrc}
                        alt={altText}
                        p={2}
                        sx={cardMins}
                    />
                )}
                <CardContent sx={cardMins}>
                    <Stack spacing={{xxs: 0, xs: 1}} alignItems='center'>
                        <Typography
                            variant={titleVariant || "h5"}
                            component='div'
                            color={titleColor || "text.primary"}
                        >
                            {title}
                        </Typography>
                        <Divider flexItem />
                        {typeof body === "object" ? (
                            body.map((b, i) => (
                                <Typography
                                    key={i}
                                    variant={bodyVariant || "body2"}
                                    color={bodyColor || "text.secondary"}
                                >
                                    {b}
                                </Typography>
                            ))
                        ) : (
                            <Typography
                                variant={bodyVariant || "body2"}
                                color={bodyColor || "text.secondary"}
                            >
                                {body}
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
                {includeActionButtons && (
                    <>
                        <Divider flexItem />
                        <CardActions
                            disableSpacing
                            spacing={{xs: 0}}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            <DynamicButtons
                                buttonType={bottomButtonType}
                                buttonJustification={
                                    buttonJustification || "center"
                                }
                                buttonDirection={buttonDirection || "row"}
                            />
                        </CardActions>
                    </>
                )}
            </Box>
        </Card>
    );
}
