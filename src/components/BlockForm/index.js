import React, {useState} from "react";
import './style.css'

const BlockForm = () => {
    const [blockName, setBlockName] = useState('')
    const [row, setRow] = useState('')
    const [column, setColumn] = useState('')
    const [seatType, setSeatType] = useState('')

    const createBlock = () => {
        window.dispatchEvent(new CustomEvent('renderSeatBlock', {detail: {blockName, row: parseInt(row), column: parseInt(column)}}))
    }

    return <div>
        <h2>Block Creation</h2>
        <div className="input-container">
            <label htmlFor="blockName">Name: </label>
            <input type={"text"} id="blockName" value={blockName} onChange={(e) => setBlockName(e.target.value)} />
        </div>
        <div className="input-container">
            <label htmlFor="row">Row: </label>
            <input type={"number"} id="row" value={row} onChange={(e) => setRow(e.target.value)} />
        </div>
        <div className="input-container">
            <label htmlFor="column">Column: </label>
            <input type={"number"} id="column" value={column} onChange={(e) => setColumn(e.target.value)} />
        </div>
        <div className="input-container">
            <label htmlFor="seatType">Seat Type: </label>
            <select id="seatType" value={seatType} onChange={(e) => setSeatType(e.target.value)}>
                <option value={""}>--Please Choose--</option>
                <option value={"normal"}>Normal</option>
                <option value={"premium"}>Premium</option>
            </select>
        </div>
        <div className="input-container">
            <button onClick={() => createBlock()}>Create</button>
        </div>
    </div>
}

export default BlockForm;