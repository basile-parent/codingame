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
import {IconButton} from "./UserTable";

type PresentationTableProps = {}
const PresentationTable: FC<PresentationTableProps> = ({}: PresentationTableProps) => {
    const {wsState: {presentations}} = useContext(WSContext)
    const handleDeletePresentation = useCallback((uuid: string) => {
            ModalConfirm.confirm({
                message: "Etes-vous sûr de vouloir supprimer cet utilisateur ? Toutes ses données seront effacées. Cette action est définitive.",
                onConfirm: () => WebsocketManager.deletePresentation(uuid)
            })
        }, []
    )

    return (
        <>
            <table className={`table ${styles.table} ${styles.presentationTable}`}>
                <thead>
                <tr>
                    <th>Presentation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    presentations?.map(presentation => (
                        <tr key={`presentation-${presentation.uuid}`}>
                            <td>
                                <span className={styles.connectedIcon}>
                                    <ConnectedIcon connected={presentation.connected}/>
                                </span>
                                {presentation.uuid}
                            </td>
                            <td>
                                <IconButton icon={faTrash}
                                            onClick={() => handleDeletePresentation(presentation.uuid)}
                                            disabled={ presentation.connected } />
                            </td>
                        </tr>
                    ))
                }
                {
                    !presentations?.length &&
                    <tr>
                        <td colSpan={2}>
                            Aucun utilisateur "présentation" enregistré
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </>
    )
}

export default PresentationTable