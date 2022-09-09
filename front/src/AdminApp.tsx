import {FC} from "react"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import Admin from "./pages/Admin/Admin"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"
import ConnectionOverlay from "./pages/Admin/components/ConnectionOverlay"
import WebsocketProvider from "./common/components/WebsocketManager/WebsocketProvider"
import {DisplayMode} from "./types/DisplayMode"

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
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
