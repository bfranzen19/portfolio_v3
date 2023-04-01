import React, {useState, useMemo} from "react";
import {useLocation} from "react-router-dom";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Stack,
    Box,
    TextField
} from "@mui/material";
import axios from "axios";
import MuiBtn from "./MuiBtn";
import MuiSnackbar from "./MuiSnackbar";
const _ = require("lodash");

const configuration = require("../config.json");

const METHODS = configuration.methods;
const defaultStates = configuration.defaultStates;
let cloned;

const axiosGet = async () => {
    console.log("GET");
};
const axiosPut = () => {
    console.log("PUT");
};
const axiosPost = () => {
    console.log("POST");
};
const axiosDelete = () => {
    console.log("DELETE");
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
    const [toastOpen, setToastOpen] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setMethodType(event.target.value);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const firstRender = useMemo(() => true, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (methodType.includes("add")) axiosPost();
        else if (methodType.includes("get")) {
            if (!dataLoaded) {
                let dbData = await axios
                    .get(url)
                    .then((response) => response)
                    .catch((error) => error);

                if (dbData.status === 200) {
                    cloned = _.cloneDeep(dbData.data);
                    setData(data.push(dbData.data));
                    setDataLoaded(true);
                }
            }
            return data;
        } else if (methodType.includes("update")) axiosPut();
        else if (methodType.includes("delete")) axiosDelete();
        else setToastOpen(true);
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
            <Stack mt={2} justifyItems='center'>
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
                    {Object.entries(defaultState).map((entry) => {
                        const [field, value] = entry;
                        if (field !== "type") {
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
                    {!firstRender ?? (
                        <MuiSnackbar
                            isTransition
                            transitionDirection='down'
                            closeOnClickaway
                            severity='error'
                            autoHideDuration={6000}
                            setOpen={setToastOpen}
                            open={toastOpen}
                        >
                            {`Method type ${methodType} not found`}
                        </MuiSnackbar>
                    )}
                </Box>
            </Stack>
            <Stack mt={2} justifyItems='center'>
                Show:
                {cloned && (
                    <ul>
                        {cloned.map((d) => (
                            <li key={d._id}>
                                {Object.entries(defaultState).map((entry) => {
                                    const [field] = entry;
                                    return (
                                        <p key={field}>
                                            {field}: {_.get(d, field)}
                                        </p>
                                    );
                                })}
                            </li>
                        ))}
                    </ul>
                )}
            </Stack>
        </Stack>
    );
}
