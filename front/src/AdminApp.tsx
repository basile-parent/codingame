import {FC} from "react"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import Admin from "./pages/Admin/Admin"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"
import ConnectionOverlay from "./pages/Admin/components/ConnectionOverlay";

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
    return (
        <>
            <ConnectedAppIcon />
            <ConnectionOverlay />
            <ModalConfirmDialog />

            <Admin />
        </>
    )
};

export default AdminApp
