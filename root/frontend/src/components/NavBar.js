import * as React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    // useTheme,
    FormControlLabel,
    Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiSwitch from "./MuiSwitch";
import homer from "../assets/img/homer.jpg";

const drawerWidth = 180;
const navItems = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Projects",
        link: "/projects"
    },
    {
        name: "Contact",
        link: "/contact"
    },
    {
        name: "Resume",
        link: "https://drive.google.com/file/d/1QWUrjWB5jADBEjgivflG549vM86FkN2j/view?usp=sharing",
        newTab: true
    }
];

const getRoute = (routeName) => {
    const route = navItems.find((item) => item.name === routeName);
    return route?.link;
};

function NavBar(props) {
    // const theme = useTheme();

    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleModeToggle = (prevState) => {
        props.setMode(prevState.target.checked === true ? "dark" : "light");
        setChecked((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
            <Typography variant='h6' sx={{my: 1}}>
                BT Franzen
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{textAlign: "center"}}>
                            {item.newTab ? (
                                <a
                                    key={item.name}
                                    href={item.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <ListItemText
                                        key={item.name}
                                        primary={item.name}
                                    />
                                </a>
                            ) : (
                                <a key={item.name} href={item.link}>
                                    <ListItemText
                                        key={item.name}
                                        primary={item.name}
                                    />
                                </a>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline />
            <AppBar component='nav'>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: "none"}}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: {xs: "none", sm: "block"}
                        }}
                    >
                        <a href={getRoute("Home")}>
                            <Avatar
                                alt='Homer Bacon'
                                src={homer}
                                sx={{width: 75, height: 65}}
                            />
                        </a>
                    </Typography>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >
                        {navItems.map((item) =>
                            item.newTab ? (
                                <a
                                    key={item.name}
                                    href={item.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <Button
                                        key={item.name}
                                        sx={{color: "#fff"}}
                                    >
                                        {item.name}
                                    </Button>
                                </a>
                            ) : (
                                <a key={item.name} href={item.link}>
                                    <Button
                                        key={item.name}
                                        sx={{color: "#fff"}}
                                    >
                                        {item.name}
                                    </Button>
                                </a>
                            )
                        )}
                    </Box>
                    <Box
                        ml={2}
                        pl={2}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <FormControlLabel
                            value={checked}
                            control={
                                <MuiSwitch
                                    checked={checked}
                                    onChange={handleModeToggle}
                                    aria-label='dark-mode switch'
                                />
                            }
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box component='nav'>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {xs: "block", sm: "none"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default NavBar;
