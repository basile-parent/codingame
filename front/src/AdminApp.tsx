import {FC} from "react"
import ConnectedAppIcon from "./common/ConnectedAppIcon";
import Admin from "./pages/Admin/Admin";

type AdminAppProps = {}
const AdminApp: FC<AdminAppProps> = ({}) => {
    return (
        <>
            <ConnectedAppIcon />
            <Admin />
        </>
    )
};

export default AdminApp
