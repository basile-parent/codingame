import {FC} from 'react'
import UserTable from "./components/UserTable"
import styles from "./Admin.module.scss"
import GameStatus from "./components/GameStatus";
import PlayerCodeDisplay from "./components/PlayerCodeDisplay";

type AdminProps = {}
const Admin: FC<AdminProps> = ({}: AdminProps) => {
    return (
        <div className={styles.root}>
            <h1 className={`title ${styles.title} `}>Admin</h1>
            <h2>Joueurs</h2>
            <main className={styles.main}>
                <UserTable/>
            </main>

            <hr/>
            <h2>Game status</h2>
            <GameStatus/>

            <hr/>
            <PlayerCodeDisplay />
        </div>
    )
}

export default Admin