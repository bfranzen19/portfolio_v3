import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Stack,
    Box,
    TextField,
    Divider
} from "@mui/material";
import axios from "axios";
import MuiBtn from "./MuiBtn";
import MuiSnackbar from "./MuiSnackbar";
const _ = require("lodash");
const configuration = require("../config.json");

const METHODS = configuration.methods;
const defaultStates = configuration.defaultStates;
let cloned = [""];

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

export default function CreateRecord() {
    const env = process.env.NODE_ENV;
    const config = configuration[env];
    const location = useLocation().pathname.split("/");
    const recordType = location[location.length - 1] || "default";
    const defaultState = defaultStates.find((st) => recordType === st.type);
    const url =
        env === "production"
            ? `${config.baseUrl}/${defaultState.type}`
            : `${config.baseUrl}:${config.port}/${defaultState.type}`;

    const [formValues, setFormValues] = useState(defaultState);
    const [methodType, setMethodType] = useState("getAll");
    const [toastOpen, setToastOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showFields, setShowFields] = useState(false); // add and update
    const [showSearch, setShowSearch] = useState(false); // get by name, id
    const [err, setErr] = useState("");
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState([]);
    let severity;

    const setFieldStates = (method) => {
        if (method.toLowerCase().includes("add")) {
            setShowFields(true);
        } else if (
            method.toLowerCase().includes("id") ||
            method.toLowerCase().includes("name")
        ) {
            if (
                method.toLowerCase().includes("get") ||
                method.toLowerCase().includes("delete")
            ) {
                setShowSearch(true);
            } else {
                setShowFields(true);
                setShowSearch(true);
            }
        } else {
            setShowFields(false);
            setShowSearch(false);
        }
    };

    const resetForm = (e?) => {
        cloned = [];
        setFormValues(defaultState);
        setDataLoaded(false);
        setData([]);

        if (e.target.value) {
            setFieldStates(e.target.value || "gitAll");
            setSearchData(e.target.value || "");
        }
    };

    const handleChange = (e) => {
        setMethodType(e.target.value);
        setFieldStates(e.target.value);
        resetForm(e);
    };

    const handleInputChange = (e) => {
        e.preventDefault();

        if (e.target.id === "search") {
            setSearchData(e.target.value);
        } else {
            const {name, value} = e.target;
            setFormValues({...formValues, [name]: value});
        }
    };

    const triggerAlertDialog = () => {
        setToastOpen(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!dataLoaded && cloned) resetForm(e);

        let searchType = methodType.toLowerCase().includes("id")
            ? "id"
            : "name";

        let reqUrl = url;
        let dbData;

        if (
            methodType.toLowerCase().includes("id") ||
            methodType.toLowerCase().includes("name")
        )
            reqUrl = `${reqUrl}/${searchType}/${searchData}`;

        if (methodType.includes("add")) {
            delete formValues._id;

            dbData = await axios
                .post(reqUrl, formValues)
                .then((response) => response)
                .catch((error) => {
                    setErr(error.message);
                    triggerAlertDialog();
                });
        } else if (methodType.toLowerCase().includes("get")) {
            dbData = await axios
                .get(reqUrl)
                .then((response) => response)
                .catch((error) => {
                    setErr(error.message);
                    triggerAlertDialog();
                });
        } else if (methodType.toLowerCase().includes("update")) {
            delete formValues._id;

            dbData = await axios
                .put(reqUrl, formValues)
                .then((response) => response)
                .catch((error) => {
                    setErr(error.message);
                    triggerAlertDialog();
                });
        } else if (methodType.toLowerCase().includes("delete")) {
            dbData = await axios
                .delete(reqUrl)
                .then((response) => response)
                .catch((error) => {
                    setErr(error.message);
                    triggerAlertDialog();
                });
        } else {
            const errMsg = `Method ${methodType} not found.`;
            setErr(errMsg);
            triggerAlertDialog();
        }

        if (!dataLoaded && dbData?.data) {
            cloned = Array.isArray(dbData.data)
                ? _.cloneDeep(dbData.data)
                : _.cloneDeep([dbData.data]);
            setData(data.push(dbData.data));
            setDataLoaded(true);

            console.log("data: ", data);
        }
    };

    return (
        <Stack m={2} p={2} justifyItems='center'>
            <Stack justifyItems='center'>
                <FormControl>
                    <FormLabel id='row-radio-buttons-group-label'>
                        Method Select
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby='row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                        value={methodType}
                        onChange={handleChange}
                    >
                        {METHODS.map((method) => (
                            <FormControlLabel
                                key={method}
                                value={method}
                                control={<Radio size='small' />}
                                label={method}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Divider flexItem />
            <Stack justifyItems='center'>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    minHeight='60vh'
                    component='form'
                    sx={{
                        "& .MuiTextField-root": {m: 1, width: "25ch"}
                    }}
                    autoComplete='off'
                    onSubmit={onSubmit}
                >
                    {showSearch && (
                        <TextField
                            type='input'
                            variant='outlined'
                            id='search'
                            label='search'
                            name='search'
                            onChange={handleInputChange}
                        />
                    )}
                    <Divider flexItem />
                    {showFields &&
                        Object.entries(defaultState).map((entry) => {
                            const [field, value] = entry;

                            if (field !== "type" && field !== "_id") {
                                if (typeof value === "object") {
                                    return (
                                        <TextField
                                            multiline
                                            type='textarea'
                                            variant='outlined'
                                            key={field}
                                            id={field}
                                            label={field}
                                            name={field}
                                            onChange={handleInputChange}
                                        />
                                    );
                                }
                                return (
                                    <TextField
                                        type='input'
                                        variant='outlined'
                                        key={field}
                                        id={field}
                                        label={field}
                                        name={field}
                                        onChange={handleInputChange}
                                    />
                                );
                            }
                            return "";
                        })}
                    <MuiBtn type='submit' styling={{margin: 3}}>
                        Submit
                    </MuiBtn>
                    {toastOpen && (
                        <AlertDialog
                            err={err}
                            toastOpen={toastOpen}
                            setToastOpen={setToastOpen}
                            severity={severity || "error"}
                            transitionDirection='down'
                            autoHideDuration={3000}
                        ></AlertDialog>
                    )}
                </Box>
            </Stack>
            <Divider flexItem />
            <Stack justifyItems='center'>
                {dataLoaded && (
                    <>
                        {Array.isArray(cloned) &&
                        !methodType.toLowerCase().includes("delete") ? (
                            <ul>
                                {cloned.map((d) => (
                                    <li key={d._id}>
                                        {Object.entries(defaultState).map(
                                            (entry) => {
                                                const [field] = entry;
                                                if (field !== "type") {
                                                    return (
                                                        <p key={field}>
                                                            <b>{field}</b>:
                                                            {"  "}
                                                            {JSON.stringify(
                                                                _.get(d, field)
                                                            )}
                                                        </p>
                                                    );
                                                }
                                                return "";
                                            }
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <p>{cloned[0].message}</p>
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </Stack>
        </Stack>
    );
}
