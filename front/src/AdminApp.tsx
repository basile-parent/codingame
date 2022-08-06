import {FC, useContext} from "react"
import {WSContext} from "./common/context/WSContext";
import ConnectedAppIcon from "./common/ConnectedAppIcon";
import GameEditor from "./pages/GameEditor"
import LandingPage from "./pages/LandingPage";
import {Screen} from "./types/Screen";
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
