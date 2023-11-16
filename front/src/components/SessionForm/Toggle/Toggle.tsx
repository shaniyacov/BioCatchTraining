import React, {FC} from 'react'
import { useState } from 'react'
import "./Toggle.css"

interface ToggleProps {
    toggled: boolean | undefined;
    onClick: (isToggled: boolean) => void;
}


export const Toggle: FC<ToggleProps> = ({toggled, onClick}) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className={"toggleLabel"}>
            <input className={"toggleInput"} type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className={"toggleSpan"}/>
        </label>
    )
}