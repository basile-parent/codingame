import {FC} from 'react'
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import styles from "./TopicInstructions.module.scss"
import {RootState} from "../../../common/store"
import {GameMode, Topic} from "../../../types/Game"

type TopicInstructionsProps = {}
const TopicInstructions: FC<TopicInstructionsProps> = ({}) => {
    const game = useSelector((state: RootState) => state.game)

    const topic = game!.topic!

    if (topic.gameMode === GameMode.REVERSE) {
        return (
            <section className={styles.topic}>
                <div className={styles.details}>
                    <Examples topic={topic} />
                </div>
            </section>
        )
    }

    return (
        <section className={styles.topic}>
            <h2>
                <FontAwesomeIcon icon={faPaperPlane}/>
                Sujet
            </h2>
            <p dangerouslySetInnerHTML={{__html: topic.subject || ""}}/>
            <div className={styles.details}>
                <h3>Entrées:</h3>
                <pre dangerouslySetInnerHTML={{__html: topic.inputs || ""}} className={styles.text} />

                <hr/>
                <h3>Sortie:</h3>
                <pre dangerouslySetInnerHTML={{__html: topic.output || ""}} className={styles.text} />

                <hr/>

                {
                    topic.constraints?.length &&
                  <>
                    <h3>Contraintes:</h3>
                    <ul>
                        {
                            topic.constraints.map((constraint, index) => (
                                <li key={`constraint-${index}`}
                                    dangerouslySetInnerHTML={{__html: constraint}}
                                    className={styles.text}
                                />
                            ))
                        }
                    </ul>
                  </>
                }

                <hr/>

                <Examples topic={topic} />
            </div>
        </section>
    )
}

const Examples = (props: { topic: Topic }) => {
    const { topic } = props

    return (
        <>
            {
                topic.examples?.length &&
              <>
                <h3>Exemples:</h3>
                  {
                      topic.examples.map((example, index) => (
                          <div className={styles.example} key={`example-${index}`}>
                              <div className={styles.exampleInput}>
                                  <p className={styles.exampleTitle}>Entrée</p>
                                  <pre className={styles.exampleValue}>{JSON.stringify(example.inputs)}</pre>
                              </div>
                              <div className={styles.exampleOutput}>
                                  <p className={styles.exampleTitle}>Sortie</p>
                                  <pre className={styles.exampleValue}>{example.output}</pre>
                              </div>
                          </div>
                      ))
                  }
              </>
            }
        </>
    )
}

export default TopicInstructions