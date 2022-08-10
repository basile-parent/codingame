import {createContext, Dispatch, FC, ReactElement, useReducer} from "react"
import {PlayerTopic} from "../../types/Player";

type AdminState = {
    selectedPlayerTopic: PlayerTopic | null,
}
type AdminStateAction = {
    type: string,
    payload?: any
}

const INTIAL_STATE: AdminState = {
    selectedPlayerTopic: null,
}
const AdminContext = createContext<{ adminState: AdminState, dispatch: Dispatch<any> }>({ adminState: INTIAL_STATE, dispatch: () => null })

const logAdminStateReducer = (state: AdminState, action: AdminStateAction): AdminState => {
    console.groupCollapsed("ADMIN STATE Reducer action", action)
    console.debug("State before", state)
    const stateAfter = AdminStateReducer(state, action)
    console.debug("State after", stateAfter)
    console.groupEnd()
    return stateAfter
}
const AdminStateReducer = (state: AdminState, action: AdminStateAction): AdminState => {
    switch (action.type) {
        case 'setSelectedPlayerTopic': {
            return { ...state, selectedPlayerTopic: action.payload }
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`, action.payload)
            return state
        }
    }
}

type AdminContextProviderProps = {
    children: ReactElement,
}
const AdminContextProvider: FC<AdminContextProviderProps> = ({ children }) => {
    const [adminState, dispatch] = useReducer(logAdminStateReducer, { ...INTIAL_STATE })

    const value = {adminState, dispatch}

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}


export {AdminContextProvider, AdminContext}