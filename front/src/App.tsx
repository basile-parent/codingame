import {FC, useState} from "react"
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import 'animate.css'
import {WSProvider} from "./common/context/WSContext";
import ConnectedIcon from "./common/ConnectedIcon";
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage";
import {Screen} from "./types/Screen";
import {DisplayMode} from "./types/DisplayMode";

type AppProps = {
    mode?: DisplayMode
}
const App: FC<AppProps> = ({ mode= DisplayMode.PLAYER }) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LANDING_PAGE)

    return (
        <WSProvider mode={mode}>
            <ConnectedIcon />
            <SwitchTransition mode="out-in">
                <CSSTransition key={currentScreen}
                               in={true}
                               classNames={{
                                   enterActive: 'animate__animated animate__slideInDown',
                                   exitActive: 'animate__animated animate__backOutRight'
                               }}
                               timeout={500}>
                    <CurrentPage currentScreen={currentScreen} mode={mode} />
                </CSSTransition>
            </SwitchTransition>
        </WSProvider>
    )
};

type CurrentPageProps = {
    currentScreen: Screen,
    mode: DisplayMode
}
const CurrentPage: FC<CurrentPageProps> = ({ currentScreen, mode }) => {
    if (currentScreen === Screen.GAME_EDITOR) {
        return <GameEditor />
    }

    return <LandingPage mode={mode} />
}

export default App
