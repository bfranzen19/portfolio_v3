import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";
import "./App.css";
import {theme} from "./theme";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CreateRecord from "./components/CreateRecord";

const ColorModeContext = React.createContext({toggleColorMode: () => {}});

function App() {
    const [mode, setMode] = React.useState("light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            }
        }),
        []
    );

    const customTheme = React.useMemo(() => createTheme(theme[mode]), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={customTheme}>
                <CssBaseline enableColorScheme />
                <NavBar mode={mode} setMode={setMode}></NavBar>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/home' element={<Home />} />
                        <Route exact path='/about' element={<About />} />
                        <Route exact path='/projects' element={<Projects />} />
                        <Route exact path='/contact' element={<Contact />} />
                        <Route
                            exact
                            path='/create/:type'
                            element={<CreateRecord />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
