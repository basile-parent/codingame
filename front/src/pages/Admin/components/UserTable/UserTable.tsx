import {FC, SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react'
import {WSContext} from "../../../../common/context/WSContext"
import ConnectedIcon from "../../../../common/components/ConnectedIcon"
import {GamePlayer} from "../../../../types/Player"
import {Topic} from "../../../../types/Game"
import TopicStatus from "./TopicStatus"
import styles from "./UserTable.module.scss"
import TopicHeaderCell from "./TopicHeaderCell";
import DetailModal from "./DetailModal";
import PlayerTable from "./PlayerTable";
import AdminTable from "./AdminTable";

type UserTableProps = {}

const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const [ tab, setTab ] = useState<number>(0)

    return (
        <>
            <div role="tablist" aria-label="Sample Tabs" className={styles.tabList}>
                <TabButton currentTab={tab} targetTab={0} discriminant="player" onSetTab={setTab}>Joueurs</TabButton>
                <TabButton currentTab={tab} targetTab={1} discriminant="admin" onSetTab={setTab}>Admin</TabButton>
            </div>

            <TabContent currentTab={tab} targetTab={0} discriminant="player">
                <PlayerTable />
            </TabContent>

            <TabContent currentTab={tab} targetTab={1} discriminant="admin">
                <AdminTable />
            </TabContent>
        </>
    )
}

const TabButton = (props: { currentTab: number, targetTab: number, onSetTab: (tab: number) => void, discriminant: string, children: string}) => (
    <button role="tab"
            aria-selected={props.currentTab === props.targetTab}
            aria-controls={`panel-${ props.discriminant }`}
            id={`tab-${ props.discriminant }`}
            onClick={() => props.onSetTab(props.targetTab)}
            className={styles.tabButton}
    >
        { props.children }
    </button>
)

const TabContent = (props: { currentTab: number, targetTab: number, discriminant: string, children: any}) => (
    <div id={`panel-${ props.discriminant }`}
         role="tabpanel"
         tabIndex={0}
         aria-labelledby={`tab-${ props.discriminant }`}
         hidden={props.currentTab !== props.targetTab}
         className={styles.tabContent}
    >
        { props.children }
    </div>
)

export default UserTable