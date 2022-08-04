import {GameMode} from "../types/Game";

type GameModeInformation = {
    title: string,
    instructions: string
}
type GameModeInformationMap = {
    [ key: string ]: GameModeInformation
}
const informations: GameModeInformationMap = {
    [GameMode.FASTEST]: { title: "Le + rapide", instructions: "Résolvez le problème le plus rapidement possible. Plus vous allez vite, plus vous aurez de points mais attention, une résolution partielle vous fera perdre BEAUCOUP de points." },
    [GameMode.SHORTEST]: { title: "Le + court", instructions: "Résolvez le problème avec l'algorithme le plus petit possible. Tous les caractères comptent (y compris les espaces et les commentaires). Le temps n'influera pas sur le score." },
}

const gameModeUtils = {
    informations
}

export default gameModeUtils