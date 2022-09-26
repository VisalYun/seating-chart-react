import React, { useState, useEffect } from 'react';
import { SeatBlock } from '../../components';
import * as SeatBlockStore from '../../store';
import '../../App.css';

const Client = () => {
    const [seatData, setSeatData] = useState([])
    const [seatBlock, setSeatBlock] = useState([])
    const [selectedSeat, setSelectedSeat] = useState([])

    const chooseSeat = (e) => {
        const temp = selectedSeat
        let i = -1
        temp.forEach((seat, index) => {
            if(seat.row === e.detail.row && seat.seatNumber === e.detail.seatNumber && seat.block === e.detail.blockName){
                i = index
            }
        })

        if(i == -1){
            temp.push({
                row: e.detail.row,
                seatNumber: e.detail.seatNumber,
                block: e.detail.blockName
            })
        }
        else {
            temp.splice(i, 1)
        }
        setSelectedSeat([...temp])
    }

    useEffect(() => {
        if (seatData || seatData.length === 0) {
            const temp = seatBlock
            for (let block of seatData) {
                let row = []
                let i = 0
                while (i < block.row) {
                    row.push(i)
                    i += 1
                }

                let column = []
                i = 0
                while (i < block.column) {
                    column.push(i)
                    i += 1
                }

                temp.push(<SeatBlock id={temp.length + 1} name={block.name} row={row} column={column} styleValue={block.transform} />)
            }
            setSeatBlock([...temp])
        }
    }, [seatData])

    useEffect(() => {
        const seats = SeatBlockStore.getBlock()
        setSeatData(seats)

        window.addEventListener('selectSeat', chooseSeat)

        return () => {
            window.removeEventListener('selectSeat', chooseSeat)
        }
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '80%' }}>
                {seatBlock}
            </div>
            <div style={{ width: '20%' }}>
                {selectedSeat.map(seat => {
                    return <div style={{margin: '10px 0'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Block</p>
                            <p>Row</p>
                            <p>Number</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>{seat.block}</p>
                            <p>{seat.row}</p>
                            <p>{seat.seatNumber}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Client;
