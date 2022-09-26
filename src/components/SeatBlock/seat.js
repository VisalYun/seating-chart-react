import React, { useState } from "react";

const Seat = ({id, number, row, name}) => {
    const [select, setSelect] = useState(false)
    const selectSeat = () => {
        setSelect(!select)
        window.dispatchEvent(new CustomEvent('selectSeat', {detail: {row: row, seatNumber: number, blockName: name}}))
    }
    
    return <div key={id} className={`economy ${select ? 'select' : ''}`} onClick={() => selectSeat()}>{number}</div>
}

export default Seat;