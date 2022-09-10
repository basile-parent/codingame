import {FC, useMemo} from "react"
import {useSelector} from "react-redux"
import styles from "./Aftergame.module.scss"
import leaderboardUtils from "../../utils/leaderboardUtils"
import {GameMode} from "../../types/Game"
import AfterGameShortestItem from "./AfterGameShortestItem"
import AfterGameFastestItem from "./AfterGameFastestItem"
import {RootState} from "../../common/store"

type AfterGameLeaderboardProps = {
    setCodeDialogContent: (code: string) => void,
    className?: string,
}
const AfterGameLeaderboard: FC<AfterGameLeaderboardProps> = ({ setCodeDialogContent, className }: AfterGameLeaderboardProps) => {
    const game = useSelector((state: RootState) => state.game)
    const players = useSelector((state: RootState) => state.players)
    const comparator = useMemo(() => leaderboardUtils.getTopicPlayerDisplayProps(game!.topic!), [ game!.topic! ])
    const ItemComponent = useMemo(() => game!.topic!.gameMode === GameMode.SHORTEST ? AfterGameShortestItem : AfterGameFastestItem, [ game!.topic! ])

    return (
        <ul className={`${styles.playerList} ${className}`}>
            {
                players
                    .sort(comparator)
                    .map((player) => (
                        <li className={styles.player} key={`player-${player.uuid}`}>
                            <ItemComponent player={player} onOpenCodeDialog={setCodeDialogContent} />
                        </li>
                    ))
            }
        </ul>
    )
}

export default AfterGameLeaderboard