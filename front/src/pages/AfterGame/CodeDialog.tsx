import {FC, useEffect} from 'react'
import CodeFlask from "codeflask"
import Modal from "../../common/components/Modal"
import styles from "./CodeDialog.module.scss"

let codeFlask: CodeFlask

type CodeDialogProps = {
    code: string,
    open: boolean,
    onClose: () => void
}
const CodeDialog: FC<CodeDialogProps> = ({code, open, onClose}: CodeDialogProps) => {

    useEffect(() => {
        const id = "shared-code"
        codeFlask = new CodeFlask(`#${id}`, {
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
            <div id="shared-code"/>
        </Modal>
    )
}

export default CodeDialog