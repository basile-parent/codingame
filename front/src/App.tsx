import {FC, useState} from "react"
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import 'animate.css'
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage";
import {Screen} from "./types/Screen";

const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LANDING_PAGE)

    return (
        <>
            <SwitchTransition mode="out-in">
                <CSSTransition key={currentScreen}
                               in={true}
                               classNames={{
                                   enterActive: 'animate__animated animate__slideInDown',
                                   exitActive: 'animate__animated animate__backOutRight'
                               }}
                               timeout={500}>
                    <CurrentPage currentScreen={currentScreen} />
                </CSSTransition>
            </SwitchTransition>
        </>
    )
};

type CurrentPageProps = {
    currentScreen: Screen
}
const CurrentPage: FC<CurrentPageProps> = ({ currentScreen }) => {
    if (currentScreen === Screen.GAME_EDITOR) {
        return <GameEditor />
    }

    return <LandingPage />
}

export default App
