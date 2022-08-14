import {EventEmitter} from 'events'

export type ConfirmInfo = {
    id?: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
}
class ModalConfirmManager extends EventEmitter {
    constructor() {
        super();
    }
    confirm(info: ConfirmInfo) {
        this.emit("change", info)
    }

    addConfirmListener(callback: (param: any) => void) {
        this.addListener("change", callback);
    }

    removeConfirmListener(callback: (param: any) => void) {
        this.removeListener("change", callback);
    }
}

export default new ModalConfirmManager()