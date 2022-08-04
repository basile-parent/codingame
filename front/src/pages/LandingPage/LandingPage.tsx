import {FC, useCallback, useState} from 'react'
import playerUtils from "../../utils/playerUtils";
import UsernameDialog from "./components/UsernameDialog";

type LandingPageProps = {}
const LandingPage: FC<LandingPageProps> = ({}: LandingPageProps) => {
    const [ userName, setUsername ] = useState<string | null>(playerUtils.getPlayerName())

    const recordUsername = useCallback((newUserName: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!newUserName) {
                reject("Vous devez spécifier un nom")
                return
            }
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