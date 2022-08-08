import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import styles from "./UserTable.module.scss"
import ConnectedIcon from "../../../common/ConnectedIcon";

type UserTableProps = {}
const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const {wsState} = useContext(WSContext)

    return (
        <table className={`table ${ styles.table }`}>
            <thead>
                <tr>
                    <th>Joueur</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                wsState.players.map((player) => (
                    <tr key={`player-${player.name}`}>
                        <td className={styles.player}>
                            <span className={styles.connectedIcon}>
                                <ConnectedIcon connected={player.connected} />
                            </span>
                            { player.name || player.uuid }
                        </td>
                        <td className={styles.score}>
                            { player.score }
                        </td>
                        <td>

                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default UserTable