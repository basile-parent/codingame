import {FC, useContext} from "react"
import {WSContext} from "./common/context/WSContext";
import ConnectedIcon from "./common/ConnectedIcon";
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage";
import {Screen} from "./types/Screen";

type AppProps = {}
const App: FC<AppProps> = ({}) => {
    return (
        <>
            <ConnectedIcon />
            <CurrentPage />
        </>
    )
};

type CurrentPageProps = {}
const CurrentPage: FC<CurrentPageProps> = () => {
    const { wsState } = useContext(WSContext)
    const { screen, mode } = wsState

    if (screen === Screen.GAME_EDITOR) {
        return <GameEditor />
    }

    return <LandingPage mode={mode} />
}

export default App
