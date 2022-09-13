import {FC, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {RootState} from "../store"
import Timer, {TimerProps} from "./Timer"

type TopicTimerProps = Omit<TimerProps, "endTimer"> & {}
const TopicTimer: FC<TopicTimerProps> = ({ ...otherProps }: TopicTimerProps) => {
    const game = useSelector((state: RootState) => state.game)
    const [ endTimer, setEndTimer ] = useState<number>(game!.endTimer!)

    useEffect(() => {
        setEndTimer(game!.endTimer!)
    }, [ game!.endTimer ])

    return (
        <Timer { ...otherProps } endTimer={endTimer} />
    )
}

export default TopicTimer