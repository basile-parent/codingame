import {FC} from "react"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import Admin from "./pages/Admin/Admin"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"
import ConnectionOverlay from "./pages/Admin/components/ConnectionOverlay";
import WebsocketProvider from "./common/components/WebsocketManager/WebsocketProvider";

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
    return (
        <>
            <ConnectedAppIcon />
            <ConnectionOverlay />

            <ModalConfirmDialog />
            <WebsocketProvider />

            <Admin />
        </>
    )
};

export default AdminApp
