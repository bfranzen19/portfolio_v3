import React, {useState, useEffect} from "react";
import {Stack, Skeleton, Box} from "@mui/material";
import axios from "axios";
import flatties from "../assets/img/flatties.jpg";
import MuiCard from "./MuiCard";
import MuiSnackbar from "./MuiSnackbar";

const env = process.env.NODE_ENV;
const config = require("../config.json")[env];

/*  */
const AlertDialog = (props) => {
    const {
        err,
        toastOpen,
        setToastOpen,
        severity,
        transitionDirection,
        horizontalAnchorOrigin,
        verticalAnchorOrigin,
        autoHideDuration
    } = props;

    return (
        <MuiSnackbar
            closeOnClickaway
            isTransition
            transitionDirection={transitionDirection}
            severity={severity}
            autoHideDuration={autoHideDuration || 6000}
            setOpen={setToastOpen}
            open={toastOpen}
            horizontalAnchorOrigin={horizontalAnchorOrigin || "center"}
            verticalAnchorOrigin={verticalAnchorOrigin || "top"}
        >
            {`ERROR: ${err}`}
        </MuiSnackbar>
    );
};

function Home() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [err, setErr] = useState("");
    const [toastOpen, setToastOpen] = useState(false);

    const triggerAlertDialog = () => {
        setToastOpen(true);
    };

    useEffect(() => {
        const url =
            env === "development"
                ? `${config.baseUrl}:${config.port}/contact/name/bt`
                : `${config.baseUrl}/contact/name/bt`;

        async function getData() {
            const dbData = await axios
                .get(url)
                .then((response) => response)
                .catch((error) => {
                    setErr(error.message);
                    triggerAlertDialog();
                });

            console.log("dbData: ", dbData.data.intro);

            if (!dataLoaded && dbData?.data) {
                setData(dbData.data.intro);
                setDataLoaded(true);
            }
        }

        getData();
        return;
    }, []);

    return (
        <Stack direction='column' alignItems='center' my={5}>
            {!dataLoaded ? (
                <Box
                    p={0}
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <Skeleton
                        variant='rectangular'
                        width={"80%"}
                        height={"40vh"}
                    />

                    <Skeleton width={"80%"} height={"5vh"} />
                    <Skeleton width={"80%"} height={"4vh"} />
                    <Skeleton width={"80%"} height={"3vh"} />
                    <Skeleton width={"80%"} height={"2vh"} />
                    <Skeleton width={"80%"} height={"2vh"} />
                </Box>
            ) : (
                <MuiCard
                    includeActionButtons
                    includeMedia
                    imgHeight='80vh'
                    imgSrc={flatties}
                    altText='Flatirons of Boulder, CO'
                    titleVariant={"h4"}
                    title="It's me, BT!"
                    bodyVariant='body1'
                    body={data}
                    bottomButtonType='home'
                    buttonJustification='center'
                    buttonDirection='row'
                />
            )}

            {toastOpen && (
                <AlertDialog
                    err={err}
                    toastOpen={toastOpen}
                    setToastOpen={setToastOpen}
                    severity='error'
                    transitionDirection='down'
                    autoHideDuration={3000}
                ></AlertDialog>
            )}
        </Stack>
    );
}

export default Home;
