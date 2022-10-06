import {FC} from "react"
import styles from "./PodiumCommands.module.scss"
import WebsocketManager from "../../../common/components/WebsocketManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../common/store";

type PodiumCommandsProps = {}
const PodiumCommands: FC<PodiumCommandsProps> = ({}: PodiumCommandsProps) => {
    const additionalScreenProps = useSelector((state: RootState) => state.additionalScreenProps)

    return (
        <div className={styles.container}>
            <button className={`button is-small is-light ${ styles.button } ${ styles.bronzeMedal }`}
                    onClick={() => WebsocketManager.setAdditionalScreenProps(["podium-3-revealed"])}
                    disabled={additionalScreenProps.includes("podium-3-revealed")}
            >
                3ème
            </button>
            <button className={`button is-small is-light ${ styles.button } ${ styles.silverMedal }`}
                    onClick={() => WebsocketManager.setAdditionalScreenProps(["podium-3-revealed", "podium-2-revealed"])}
                    disabled={additionalScreenProps.includes("podium-2-revealed") || !additionalScreenProps.includes("podium-3-revealed")}
            >
                2ème
            </button>
            <button className={`button is-small is-light ${ styles.button } ${ styles.goldMedal }`}
                    onClick={() => WebsocketManager.setAdditionalScreenProps(["podium-3-revealed", "podium-2-revealed", "podium-1-revealed"])}
                    disabled={additionalScreenProps.includes("podium-1-revealed") || !additionalScreenProps.includes("podium-2-revealed")}
            >
                1er
            </button>
            <button className={`button is-small is-danger ${ styles.button }`}
                    onClick={() => WebsocketManager.setAdditionalScreenProps([])}
            >
                Reset
            </button>
        </div>
    )
}

export default PodiumCommands