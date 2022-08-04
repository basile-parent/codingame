import {FC, useContext} from 'react'
import {WSContext} from "./context/WSContext";

type ConnectedIconProps = {}
const ConnectedIcon: FC<ConnectedIconProps> = ({}: ConnectedIconProps) => {
    const { state } = useContext(WSContext);

    return (
        <>
            { state.connected ? "Connecté" : "NON connecté" }
        </>
    )
}

export default ConnectedIcon