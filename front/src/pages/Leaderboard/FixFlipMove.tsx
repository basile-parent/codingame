import {FC, ReactNode} from 'react'
import FlipMove from "react-flip-move"

type FixFlipMoveProps = FlipMove.FlipMoveProps & {
    children: ReactNode
}
// children are not mapped in FlipMove props so IK had to set a ts-ignore
const FixFlipMove: FC<FixFlipMoveProps> = ({children, ...otherProps}: FixFlipMoveProps) => (
    // @ts-ignore
    <FlipMove {...otherProps}>
        {children}
    </FlipMove>
)

export default FixFlipMove