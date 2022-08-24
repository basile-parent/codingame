import {FC, ReactElement, useCallback, useEffect} from 'react'
import styles from "./Modal.module.scss";
import {ModalButton} from "./ModalButton";

type ModalProps = {
    open: boolean
    onClose: () => void,
    title?: string | ReactElement,
    actions?: ModalButton[],
    className?: string;
    children: string | ReactElement | (string | ReactElement)[],
}
const Modal: FC<ModalProps> = ({open, onClose, title, actions, className, children}: ModalProps) => {
    // Close modal via Escape
    const handleEscapeModal = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose()
        }
    }, [ onClose ])

    useEffect(() => {
        if (!open) {
            window.removeEventListener('keydown', handleEscapeModal)
            return
        }
        window.addEventListener('keydown', handleEscapeModal)

        return () => {
            window.removeEventListener('keydown', handleEscapeModal)
        }
    }, [ open ])

    return (
        <div className={`modal ${open && "is-active"} ${styles.container}`}>
            <div className="modal-background" onClick={onClose}/>
            <div className={`modal-card ${ className }`}>
                {
                    title &&
                    <header className="modal-card-head">
                      <p className="modal-card-title">{title}</p>
                    </header>
                }
                <section className="modal-card-body">
                    {children}
                </section>
                {
                    actions &&
                    <footer className={`modal-card-foot ${ styles.actions }`}>
                        {
                            actions.map((action, index) => (
                                <button className={`button ${ action.type === "primary" ? "is-primary" : "is-danger"} is-small`}
                                        onClick={action.onClick}
                                        key={`action-${index}`}
                                >
                                    { action.text }
                                </button>
                            ))
                        }
                    </footer>
                }
            </div>
        </div>
    )
}

export default Modal