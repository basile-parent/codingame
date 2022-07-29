import {FC} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styles from "./Topic.module.scss"

type TopicProps = {}
const Topic: FC<TopicProps> = ({}: TopicProps) => {
    return (
        <section className={styles.topic}>
            <h2>
                <FontAwesomeIcon icon={faPaperPlane} />
                Problème
            </h2>
            <p>
                Vous recevez 2 entiers <strong>A</strong> et <strong>B</strong> en entrée. Le résultat doit
                être la somme des 2 entiers.
            </p>
            <div className={styles.details}>
                <h3>Entrées:</h3>
                <p>input = [ A, B ]</p>

                <hr/>
                <h3>Sortie:</h3>
                <p>Retourne un entier qui est la somme de <strong>A</strong> et <strong>B</strong></p>

                <hr/>
                <h3>Contraintes:</h3>
                <ul>
                    <li>-500 000 &#8804; <strong>A</strong> &#8804; 500 000</li>
                    <li>-500 000 &#8804; <strong>B</strong> &#8804; 500 000</li>
                </ul>

                <hr/>
                <h3>Exemples:</h3>
                <div className={styles.example}>
                    <div className={styles.exampleInput}>
                        <p className={styles.exampleTitle}>Entrée</p>
                        <p className={styles.exampleValue}>3 0</p>
                    </div>
                    <div className={styles.exampleOutput}>
                        <p className={styles.exampleTitle}>Sortie</p>
                        <p className={styles.exampleValue}>3</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Topic