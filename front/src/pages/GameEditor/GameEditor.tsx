import {FC} from 'react';
import { Header } from "./components";

type GameEditorProps = {}
const GameEditor: FC<GameEditorProps> = ({}: GameEditorProps) => {
    return (
        <article id="game-page">
            <Header />

            <section id="upper-section">
            </section>
        </article>
    )
};

export default GameEditor;