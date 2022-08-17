import {FC, ReactElement, useContext} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPen, faSpinner} from "@fortawesome/free-solid-svg-icons"
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../../../../types/Player"
import {Topic} from "../../../../types/Game"
import styles from "./TopicStatus.module.scss"
import tableStyles from "./UserTable.module.scss"
import {AdminContext} from "../../../../common/context/AdminContext"

type TopicStatusProps = {
    player: GamePlayer,
    topic: Topic
}
const TopicStatus: FC<TopicStatusProps> = ({ player, topic }) => {
    const playerTopic = player.topics?.find(t => t.topicId === topic.id)
    if (!playerTopic) {
        return (
            <td className={tableStyles.scoreTopic}>
                -
            </td>
        )
    }
    return (
        <td className={tableStyles.scoreTopic}>
            {
                playerTopic.status === GamePlayerStatus.IN_PROGRESS ?
                    <SelectTopicButton playerTopic={playerTopic} hasScore={false}>
                        <FontAwesomeIcon icon={faPen}/>
                    </SelectTopicButton> :
                    playerTopic.status === GamePlayerStatus.FINISHED ?
                      <SelectTopicButton playerTopic={playerTopic} hasScore={playerTopic.score !== undefined}>
                          <>
                              {
                                  playerTopic.score ??
                                  (
                                      playerTopic.completion !== undefined && playerTopic.completion !== null ?
                                          `${Math.round(playerTopic.completion * 100)}%` :
                                          <FontAwesomeIcon icon={faSpinner}/>
                                  )
                              }
                          </>
                      </SelectTopicButton> :
                        "/"
            }
        </td>
    )
}

type SelectTopicButtonProps = {
    playerTopic: PlayerTopic
    hasScore: boolean
    children: ReactElement
}
const SelectTopicButton: FC<SelectTopicButtonProps> = ({ playerTopic, hasScore, children }) => {
    const { dispatch } = useContext(AdminContext)
    return (
        <button className={`${styles.selectButton} ${ hasScore ? styles.score : "" }`}
                onClick={() => dispatch({ type: "setSelectedPlayerTopic", payload: playerTopic })}
        >
            { children }
        </button>
    )
}

export default TopicStatus