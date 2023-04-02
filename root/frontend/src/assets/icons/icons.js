import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faSquareGithub,
    faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

const icons = [
    {
        name: "envelope",
        icon: faEnvelope,
        style: {color: "#c71610"}
    },
    {
        name: "paperPlane",
        icon: faPaperPlane,
        style: {color: "#00cc8f"}
    },
    {
        name: "twitter",
        icon: faTwitter,
        style: {color: "#1da1f2"}
    },
    {
        name: "github",
        icon: faSquareGithub,
        style: {color: "000000"}
    },
    {
        name: "linkedin",
        icon: faLinkedinIn,
        style: {color: "#0072b1"}
    }
];

export const FaIcon = (props) => {
    const {size, iconName, style} = props;

    const selected = icons.find((i) => i.name === iconName);

    if (props.size) {
        return (
            <FontAwesomeIcon
                size={size}
                icon={selected.icon}
                style={selected.style}
                transform='shrink-7 grow-4'
            />
        );
    }

    return (
        <FontAwesomeIcon
            icon={selected.icon}
            style={style || selected?.style}
            transform='shrink-7 grow-4'
        />
    );
};
