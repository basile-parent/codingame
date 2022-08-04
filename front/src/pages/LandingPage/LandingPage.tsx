import {FC, useCallback, useContext, useState} from 'react'
import playerUtils from "../../utils/playerUtils";
import UsernameDialog from "./components/UsernameDialog";
import {WSContext} from "../../common/context/WSContext";

type LandingPageProps = {}
const LandingPage: FC<LandingPageProps> = ({}: LandingPageProps) => {
    const [ userName, setUsername ] = useState<string | null>(playerUtils.getPlayerName())
    const { dispatch } = useContext(WSContext);

    const recordUsername = useCallback((newUserName: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!newUserName) {
                reject("Vous devez spécifier un nom")
                return
            }
            dispatch({ type: "setName", payload: newUserName })
            playerUtils.setPlayerName(newUserName)
            setUsername(newUserName)
        })
    }, [])

    if (!userName) {
        return <UsernameDialog onSetUsername={recordUsername} />
    }

    return (
        <>
            <h1>Landing page</h1>
        </>
    )
}

export default LandingPage