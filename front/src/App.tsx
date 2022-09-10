import {FC, useEffect} from "react"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage"
import {Screen} from "./types/Screen"
import AfterGame from "./pages/AfterGame/AfterGame"
import TransitionTimer from "./common/components/TransitionTimer"
import Leaderboard from "./pages/Leaderboard/Leaderboard"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"
import Podium from "./pages/Podium/Podium"
import {DisplayMode} from "./types/DisplayMode"
import PresentationTopic from "./pages/PresentationTopic/PresentationTopic"
import ThankYou from "./pages/ThankYou/ThankYou"
import WebsocketProvider from "./common/components/WebsocketManager/WebsocketProvider"
import {useDispatch, useSelector} from "react-redux"
import {ReduxActions, RootState} from "./common/store"

type AppProps = {
    mode: DisplayMode
}
const App: FC<AppProps> = ({ mode }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ReduxActions.mode.setMode(mode))
    })

    return (
        <>
            <ModalConfirmDialog />
            <WebsocketProvider mode={mode} />

            <aside><ConnectedAppIcon /></aside>
            <aside><TransitionTimer /></aside>
            
            <CurrentPage />
        </>
    )
}

type CurrentPageProps = {}
const CurrentPage: FC<CurrentPageProps> = () => {
    const screen = useSelector((state: RootState) => state.screen)
    const mode = useSelector((state: RootState) => state.mode)

    if (screen === Screen.GAME_EDITOR) {
        if (mode === DisplayMode.PRESENTATION) {
            return <PresentationTopic />
        }
        return <GameEditor />
    }

    if (screen === Screen.AFTER_GAME) {
        return <AfterGame />
    }

    if (screen === Screen.LEADERBOARD) {
        return <Leaderboard />
    }

    if (screen === Screen.PODIUM) {
        if (mode === DisplayMode.PRESENTATION) {
            return <Podium />
        }
        return <ThankYou />
    }

    return <LandingPage mode={mode} />
}

export default App
