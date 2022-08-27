import {FC, useContext} from "react"
import {WSContext} from "./common/context/WSContext"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage"
import {Screen} from "./types/Screen"
import AfterGame from "./pages/AfterGame/AfterGame"
import TransitionTimer from "./common/components/TransitionTimer"
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog";
import Podium from "./pages/Podium/Podium";

type AppProps = {}
const App: FC<AppProps> = ({}) => {
    return (
        <>
            <ModalConfirmDialog />

            <aside><ConnectedAppIcon /></aside>
            <aside><TransitionTimer /></aside>
            
            <CurrentPage />
        </>
    )
}

type CurrentPageProps = {}
const CurrentPage: FC<CurrentPageProps> = () => {
    const { wsState: { screen, mode } } = useContext(WSContext)

    if (screen === Screen.GAME_EDITOR) {
        return <GameEditor />
    }

    if (screen === Screen.AFTER_GAME) {
        return <AfterGame />
    }

    if (screen === Screen.LEADERBOARD) {
        return <Leaderboard />
    }

    if (screen === Screen.PODIUM) {
        return <Podium />
    }

    return <LandingPage mode={mode} />
}

export default App
