import {FC} from "react"
import styles from "./ThankYou.module.scss"

type ThankYouProps = {}
const ThankYou: FC<ThankYouProps> = ({}: ThankYouProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.thankyou}>Merci d'avoir participer. Les résultats sont affichés sur le projecteur.</p>
            <p className={styles.punchline}>Vous pouvez éteindre votre ordinateur et reprendre une activité normale.</p>
        </div>
    )
}

export default ThankYou