import {FC} from 'react'
import UserTable from "./components/UserTable"
import GameActions from "./components/GameActions"
import styles from "./Admin.module.scss"

type AdminProps = {}
const Admin: FC<AdminProps> = ({}: AdminProps) => {
    return (
        <div className={styles.root}>
            <h1 className={`title ${ styles.title } `}>Admin</h1>
            <aside className={styles.actions}>
                <GameActions />
            </aside>
            <main className={styles.main}>
                <UserTable />
            </main>
        </div>
    )
}

export default Admin