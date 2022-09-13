import {FC, useEffect} from "react"
import {useDispatch} from "react-redux"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import Admin from "./pages/Admin/Admin"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"
import ConnectionOverlay from "./pages/Admin/components/ConnectionOverlay"
import WebsocketProvider from "./common/components/WebsocketManager/WebsocketProvider"
import {DisplayMode} from "./types/DisplayMode"
import {ReduxActions} from "./common/store"

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ReduxActions.mode.set(DisplayMode.ADMIN))
    })

    return (
        <>
            <ConnectedAppIcon />
            <ConnectionOverlay />

            <ModalConfirmDialog />
            <WebsocketProvider mode={ DisplayMode.ADMIN } />

            <Admin />
        </>
    )
}

export default AdminApp
