import {FC, useContext, useMemo} from "react"
import styles from "./Aftergame.module.scss"
import {WSContext} from "../../common/context/WSContext"
import leaderboardUtils from "../../utils/leaderboardUtils"
import {GameMode} from "../../types/Game"
import AfterGameShortestItem from "./AfterGameShortestItem"
import AfterGameFastestItem from "./AfterGameFastestItem"

type AfterGameLeaderboardProps = {
    setCodeDialogContent: (code: string) => void,
    className?: string,
}
const AfterGameLeaderboard: FC<AfterGameLeaderboardProps> = ({ setCodeDialogContent, className }: AfterGameLeaderboardProps) => {
    const {wsState: {game, players}} = useContext(WSContext)
    const comparator = useMemo(() => leaderboardUtils.getTopicPlayerDisplayProps(game!.topic!), [ game!.topic! ])
    const ItemComponent = useMemo(() => game!.topic!.gameMode === GameMode.SHORTEST ? AfterGameShortestItem : AfterGameFastestItem, [ game!.topic! ])

    return (
        <ul className={`${styles.playerList} ${className}`}>
            {
                players
                    .sort(comparator)
                    .map((player, index) => (
                        <li className={styles.player} key={`player-${player.uuid}`}>
                            <span className={styles.position}>{index + 1}</span>
                            <ItemComponent player={player} game={game!} onOpenCodeDialog={setCodeDialogContent} />
                        </li>
                    ))
            }
        </ul>
    )
}

export default AfterGameLeaderboard