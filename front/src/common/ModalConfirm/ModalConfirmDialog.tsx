import {FC, SyntheticEvent, useCallback, useEffect, useState} from 'react'
import ModalConfirm, {ConfirmInfo} from "./ModalConfirm"
import styles from "./ModalConfirmDialog.module.scss"

type ModalConfirmDialogProps = {
}
const ModalConfirmDialog: FC<ModalConfirmDialogProps> = ({ }: ModalConfirmDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [confirmCallback, setConfirmCallback] = useState<Function | null>(null)
    const [closeCallback, setCloseCallback] = useState<Function | null | undefined>(null)

    const handleStoreChange = useCallback((info: ConfirmInfo) => {
        setMessage(info.message)
        setConfirmCallback(() => info.onConfirm)
        setCloseCallback(info.onCancel ? () => info.onCancel : null)
        setOpen(true)
    }, [])

    const handleConfirm = useCallback((_: SyntheticEvent) => {
        confirmCallback && confirmCallback()
        setOpen(false)
    }, [ confirmCallback ])

    const handleClose = useCallback((_: SyntheticEvent) => {
        closeCallback && closeCallback()
        setOpen(false)
    }, [ closeCallback ])

    useEffect(() => {
        ModalConfirm.addConfirmListener(handleStoreChange)
        return () => ModalConfirm.removeConfirmListener(handleStoreChange)
    }, [])

    return (
        <div className={`modal ${ open ? "is-active" : false }`}>
            <div className="modal-background" />
            <div className={`modal-content ${ styles.content }`}>
                { message }
                <div className={styles.actions}>
                    <button className="button is-danger is-small" onClick={handleClose}>Annuler</button>
                    <button className="button is-primary is-small" onClick={handleConfirm}>Confirmer</button>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" />
        </div>
    )
}

export default ModalConfirmDialog