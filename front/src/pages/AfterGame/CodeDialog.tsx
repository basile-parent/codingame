import {FC, useEffect} from 'react'
import CodeFlask from "codeflask"
import Modal from "../../common/components/Modal"
import styles from "./CodeDialog.module.scss"

let codeFlask: CodeFlask
const divId = "shared-code"

type CodeDialogProps = {
    code: string,
    open: boolean,
    onClose: () => void
}
const CodeDialog: FC<CodeDialogProps> = ({code, open, onClose}: CodeDialogProps) => {

    useEffect(() => {
        codeFlask = new CodeFlask(`#${divId}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false,
            readonly: true,
        })
    }, [])

    useEffect(() => {
        codeFlask?.updateCode(code || "")
    }, [ code ])

    return (
        <Modal open={open}
               onClose={onClose}
               className={styles.modal}
        >
            <button className={styles.backButton} onClick={onClose}>↼ Retour</button>
            <div id={divId} />
        </Modal>
    )
}

export default CodeDialog