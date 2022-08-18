import {GameMode} from "../types/Game";
import {faBackward, faDownLeftAndUpRightToCenter, faTruckFast} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type GameModeInformation = {
    title: string,
    instructions: string,
    icon: IconDefinition
}
type GameModeInformationMap = {
    [ key: string ]: GameModeInformation
}
const informations: GameModeInformationMap = {
    [GameMode.FASTEST]: { title: "Le + rapide", instructions: "Résolvez le problème le plus rapidement possible. Plus vous allez vite, plus vous aurez de points mais attention, une résolution partielle vous fera perdre BEAUCOUP de points.", icon: faTruckFast },
    [GameMode.SHORTEST]: { title: "Le + court", instructions: "Résolvez le problème avec l'algorithme le plus petit possible. Tous les caractères comptent (y compris les espaces et les commentaires). Le temps n'influera pas sur le score.", icon: faDownLeftAndUpRightToCenter },
    [GameMode.REVERSE]: { title: "Reverse", instructions: "Vous n'avez pas l'énoncé, juste les tests. A vous de comprendre le problème et de le résoudre le plus rapidement possible. Attention: une résolution partielle vous fera perdre BEAUCOUP de points.", icon: faBackward },
}

const gameModeUtils = {
    informations
}

export default gameModeUtils