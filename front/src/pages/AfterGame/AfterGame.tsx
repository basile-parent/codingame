import {FC, useContext, useEffect, useMemo, useState} from 'react'
import {WSContext} from "../../common/context/WSContext"
import styles from "./Aftergame.module.scss"
import {GameMode, TopicStatus} from "../../types/Game";
import leaderboardUtils from '../../utils/leaderboardUtils';
import AfterGameFastestItem from "./AfterGameFastestItem";
import AfterGameShortestItem from "./AfterGameShortestItem";
import Timer from "../../common/components/Timer";
import CodeDialog from "./CodeDialog";
import playerUtils from "../../utils/playerUtils";

type AfterGameProps = {}
const AfterGame: FC<AfterGameProps> = ({}: AfterGameProps) => {
    const {wsState: {game, players}} = useContext(WSContext)
    const isFinished = useMemo(() => [ TopicStatus.FINISHED, TopicStatus.SCORE_CALCULATED ].includes(game!.topic!.status), [ game!.topic!.status ])
    const comparator = useMemo(() => leaderboardUtils.getTopicPlayerDisplayProps(game!.topic!), [ game!.topic! ])
    const ItemComponent = useMemo(() => game!.topic!.gameMode === GameMode.SHORTEST ? AfterGameShortestItem : AfterGameFastestItem, [ game!.topic! ])

    const [ codeDialogContent, setCodeDialogContent ] = useState<string | null>(null)

    useEffect(() => {
        playerUtils.cleanSavedCode()
    }, [])

    return (
        <div className={styles.container}>
            {
                !isFinished &&
                <p className={styles.timer}>Temps restant: <Timer endTimer={game!.endTimer!} /></p>
            }
            <h1>{isFinished ? "Manche terminée" : "Vous avez validé votre code"}</h1>
            <h2>Résultats de la manche</h2>
            <ul className={styles.playerList}>
                {
                    players
                        .sort(comparator)
                        .map((player, index) => (
                        <li className={styles.player} key={`player-${player.name}`}>
                            <span className={styles.position}>{index + 1}</span>
                            <ItemComponent player={player} game={game!} onOpenCodeDialog={setCodeDialogContent} />
                        </li>
                    ))
                }
            </ul>

            <CodeDialog code={codeDialogContent!}
                        open={!!codeDialogContent}
                        onClose={() => setCodeDialogContent(null)} />
        </div>
    )
}

export default AfterGame