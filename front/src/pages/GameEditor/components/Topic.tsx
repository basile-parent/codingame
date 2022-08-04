import {FC, useContext} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styles from "./Topic.module.scss"
import {WSContext} from "../../../common/context/WSContext";

type TopicProps = {}
const Topic: FC<TopicProps> = ({}: TopicProps) => {
    const {wsState: {game}} = useContext(WSContext)

    return (
        <section className={styles.topic}>
            <h2>
                <FontAwesomeIcon icon={faPaperPlane}/>
                Sujet
            </h2>
            <p dangerouslySetInnerHTML={{__html: game?.topic.subject || ""}}/>
            <div className={styles.details}>
                <h3>Entrées:</h3>
                <p dangerouslySetInnerHTML={{__html: game?.topic.inputs || ""}}/>

                <hr/>
                <h3>Sortie:</h3>
                <p dangerouslySetInnerHTML={{__html: game?.topic.output || ""}}/>

                <hr/>

                {
                    game?.topic.constraints?.length &&
                    <>
                      <h3>Contraintes:</h3>
                      <ul>
                          {
                              game.topic.constraints.map((constraint, index) => (
                                  <li key={`constraint-${index}`}
                                      dangerouslySetInnerHTML={{__html: constraint}}
                                  />
                              ))
                          }
                      </ul>
                    </>
                }

                <hr/>

                {
                    game?.topic.examples?.length &&
                    <>
                      <h3>Exemples:</h3>
                        {
                            game.topic.examples.map((example, index) => (
                                <div className={styles.example} key={`example-${index}`}>
                                    <div className={styles.exampleInput}>
                                        <p className={styles.exampleTitle}>Entrée</p>
                                        <p className={styles.exampleValue}>[{example.inputs.join(", ")}]</p>
                                    </div>
                                    <div className={styles.exampleOutput}>
                                        <p className={styles.exampleTitle}>Sortie</p>
                                        <p className={styles.exampleValue}>{example.output}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
            </div>
        </section>

    )
}

export default Topic