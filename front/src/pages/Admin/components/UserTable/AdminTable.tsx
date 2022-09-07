import {FC, useCallback, useContext} from 'react'
import {WSContext} from "../../../../common/context/WSContext"
import styles from "./UserTable.module.scss"
import ConnectedIcon from "../../../../common/components/ConnectedIcon";
import playerUtils from "../../../../utils/playerUtils";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "../../../../common/components/ModalConfirm/ModalConfirm";
import WebsocketManager from "../../../../common/components/WebsocketManager";
import {IconButton} from "./UserTable";
import {GamePlayer} from "../../../../types/Player";

type AdminTableProps = {}
const AdminTable: FC<AdminTableProps> = ({}: AdminTableProps) => {
    const {wsState: {admins}} = useContext(WSContext)
    const handleDeleteAdmin = useCallback((uuid: string) => {
            ModalConfirm.confirm({
                message: "Etes-vous sûr de vouloir supprimer cet utilisateur ? Toutes ses données seront effacées. Cette action est définitive.",
                onConfirm: () => WebsocketManager.deleteAdmin(uuid)
            })
        }, []
    )

    return (
        <>
            <table className={`table ${styles.table} ${styles.adminTable}`}>
                <thead>
                <tr>
                    <th>Admin</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    admins
                        ?.sort(uuidComparator)
                        .map(admin => (
                            <tr key={`admin-${admin.uuid}`}>
                                <td>
                                <span className={styles.connectedIcon}>
                                    <ConnectedIcon connected={admin.connected}/>
                                </span>
                                    <span
                                        className={admin.uuid === playerUtils.getPlayerUuid() ? styles.currentAdmin : ""}>
                                    {admin.uuid}
                                </span>
                                </td>
                                <td>
                                    <IconButton icon={faTrash}
                                                onClick={() => handleDeleteAdmin(admin.uuid)}
                                                disabled={admin.connected}/>
                                </td>
                            </tr>
                        ))
                }
                {
                    !admins?.length &&
                    <tr>
                        <td colSpan={2}>
                            Aucun utilisateur "admin" enregistré
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </>
    )
}

export const uuidComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p1.uuid.localeCompare(p2.uuid)
}

export default AdminTable