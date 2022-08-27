import {FC} from "react"
import styles from "./Podium.module.scss"
import Chart from "./components/Chart";

type PodiumProps = {}
const Podium: FC<PodiumProps> = ({}: PodiumProps) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Podium</h1>
            <Chart />
        </div>
    )
}

export default Podium