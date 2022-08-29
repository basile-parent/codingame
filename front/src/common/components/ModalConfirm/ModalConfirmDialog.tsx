import {FC, useCallback, useEffect, useMemo, useState} from 'react'
import ModalConfirm, {ConfirmInfo} from "./ModalConfirm"
import Modal from "../Modal";
import {ModalButton} from "../Modal/ModalButton";

type ModalConfirmDialogProps = {}
const ModalConfirmDialog: FC<ModalConfirmDialogProps> = ({}: ModalConfirmDialogProps) => {
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

    const handleConfirm = useCallback(() => {
        confirmCallback && confirmCallback()
        setOpen(false)
    }, [ confirmCallback ])

    const handleClose = useCallback(() => {
        closeCallback && closeCallback()
        setOpen(false)
    }, [ closeCallback ])

    const actions = useMemo<ModalButton[]>(() => [
        { type: "cancel", text: "Annuler", onClick: handleClose },
        { type: "primary", text: "Confirmer", onClick: handleConfirm },
    ], [ handleConfirm, handleClose ])

    useEffect(() => {
        ModalConfirm.addConfirmListener(handleStoreChange)
        return () => ModalConfirm.removeConfirmListener(handleStoreChange)
    }, [])

    return (
        <Modal open={open}
               onClose={handleClose}
               actions={actions}
        >
            { message }
        </Modal>
    )
}

export default ModalConfirmDialog