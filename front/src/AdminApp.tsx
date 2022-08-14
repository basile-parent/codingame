import {FC} from "react"
import ConnectedAppIcon from "./common/components/ConnectedAppIcon"
import Admin from "./pages/Admin/Admin"
import ModalConfirmDialog from "./common/components/ModalConfirm/ModalConfirmDialog"

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
    return (
        <>
            <ConnectedAppIcon />
            <ModalConfirmDialog />

            <Admin />
        </>
    )
};

export default AdminApp
