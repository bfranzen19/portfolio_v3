import React from "react";
import {Stack} from "@mui/material";
import flatties from "../assets/img/flatties.jpg";
import MuiCard from "../components/MuiCard";

const bodyItems = [
    "I'm a colorado-based software engineer. I've been in the industry since 2017 after switching careers from managing a GIS (Geographic Information Systems) satellite imagery team for 4 years, allowing me to see the entire world from satellites, twice over.",
    "I came to GIS after 6 years in the army where I attained the rank of Sergeant and title of Vessel Master for a maritime test asset. Prior to my time in the US Army, I played NCAA Division 1 and Division 2 lacrosse in college.",
    "I have extensive experience in several languages, frameworks, and technologies. I love to learn new things and solve complex problems. Please take a look at my current resume or check out my about me page and some of my projects."
];

function Home(props) {
    return (
        <Stack direction='column' alignItems='center' my={5}>
            <MuiCard
                includeActionButtons
                includeMedia
                imgHeight='80vh'
                imgSrc={flatties}
                altText='Flatirons of Boulder, CO'
                titleVariant={"h4"}
                title="It's me, BT!"
                bodyVariant='body1'
                body={bodyItems}
                bottomButtonType='home'
                buttonJustification='center'
                buttonDirection='row'
            />
        </Stack>
    );
}

export default Home;
