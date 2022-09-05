import {ComponentProps, FC, useCallback, useContext} from 'react'
import {WSContext} from "../../../../common/context/WSContext"
import styles from "./UserTable.module.scss"
import ConnectedIcon from "../../../../common/components/ConnectedIcon";
import playerUtils from "../../../../utils/playerUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import ModalConfirm from "../../../../common/components/ModalConfirm/ModalConfirm";
import WebsocketManager from "../../../../common/components/WebsocketManager";

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
                    admins?.map(admin => (
                        <tr key={`admin-${admin.uuid}`}>
                            <td>
                                <span className={styles.connectedIcon}>
                                    <ConnectedIcon connected={admin.connected}/>
                                </span>
                                <span className={ admin.uuid === playerUtils.getPlayerUuid() ? styles.currentAdmin : "" }>
                                    {admin.uuid}
                                </span>
                            </td>
                            <td>
                                <IconButton icon={faTrash}
                                            onClick={() => handleDeleteAdmin(admin.uuid)}
                                            disabled={ admin.connected } />
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

const IconButton = (props: ComponentProps<'button'> & { icon: IconProp }) => {
    const { icon, ...buttonProps } = props
    return (
        <button className={styles.iconButton} { ...buttonProps }>
            <FontAwesomeIcon icon={icon}/>
        </button>
    );
}

export default AdminTable